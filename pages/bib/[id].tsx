import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Pagination,
  SkeletonLoader,
  Box,
  Notification,
} from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import {
  PATHS,
  ITEM_BATCH_SIZE,
  SITE_NAME,
  BASE_URL,
} from "../../src/config/constants"
import { fetchBib } from "../../src/server/api/bib"
import { getBibQueryString } from "../../src/utils/bibUtils"
import { buildItemTableDisplayingString } from "../../src/utils/bibUtils"
import BibDetailsModel from "../../src/models/BibDetails"
import ItemTableData from "../../src/models/ItemTableData"
import BibDetails from "../../src/components/BibPage/BibDetail"
import ItemTable from "../../src/components/ItemTable/ItemTable"
import type {
  DiscoveryBibResult,
  BibQueryParams,
} from "../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../src/types/bibDetailsTypes"
import Bib from "../../src/models/Bib"
import initializePatronTokenAuth from "../../src/server/auth"
import Item from "../../src/models/Item"
import type { SearchResultsItem } from "../../src/types/itemTypes"

interface BibPropsType {
  discoveryBibResult: DiscoveryBibResult
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
  itemPage?: number
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  discoveryBibResult,
  annotatedMarc,
  isAuthenticated,
  itemPage = 1,
}: BibPropsType) {
  const { pathname, push, query } = useRouter()
  const metadataTitle = `Item Details | ${SITE_NAME}`
  const bib = new Bib(discoveryBibResult)

  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemFetchError, setItemFetchError] = useState(bib.showItemTableError)
  const [bibItems, setBibItems] = useState(bib.items)

  const { topDetails, bottomDetails, holdingsDetails } = new BibDetailsModel(
    discoveryBibResult,
    annotatedMarc
  )

  const itemTableData = new ItemTableData(bibItems, {
    isArchiveCollection: bib.isArchiveCollection,
  })

  const refreshItemTable = async (newQuery: BibQueryParams) => {
    setItemsLoading(true)
    setItemFetchError(false)
    await push({ pathname, query: { ...newQuery } }, undefined, {
      shallow: true,
    })
    const bibQueryString = getBibQueryString(newQuery)
    const response = await fetch(
      `${BASE_URL}/api/bib/${bib.id}/items?${bibQueryString}`
    )
    if (response.ok) {
      const { items } = await response.json()
      setBibItems(items.map((item: SearchResultsItem) => new Item(item, bib)))
      setItemsLoading(false)
      document.getElementById("item-table")?.scrollIntoView({
        behavior: "smooth",
      })
    } else {
      setItemFetchError(true)
    }
  }

  const handlePageChange = async (page: number) => {
    const newQuery = { ...query, item_page: page }
    if (page === 1) delete newQuery.item_page
    await refreshItemTable(newQuery)
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={metadataTitle} key="og-title" />
        <meta
          property="og:site_name"
          content={metadataTitle}
          key="og-site-name"
        />
        <meta name="twitter:title" content={metadataTitle} key="tw-title" />
        <title key="main-title">{metadataTitle}</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="bib">
        <Heading level="h2">{bib.title}</Heading>
        <BibDetails key="top-details" details={topDetails} />
        {bib.showItemTable ? (
          <Box id="item-table">
            <Heading
              data-testid="item-table-heading"
              level="h3"
              size="heading4"
              mb={{ base: "s", md: "m" }}
            >
              Items in the library and off-site
            </Heading>
            {itemsLoading ? (
              <SkeletonLoader showImage={false} />
            ) : itemFetchError ? (
              <Notification
                data-testid="itemFetchErrorNotification"
                notificationType="warning"
                notificationContent="There was an error fetching items. Please try again with a different query."
                noMargin
              />
            ) : (
              <>
                <Heading
                  data-testid="item-table-displaying-text"
                  level="h4"
                  size="heading5"
                  mb={{ base: "s", md: "m" }}
                >
                  {buildItemTableDisplayingString(
                    itemPage,
                    bib.numPhysicalItems
                  )}
                </Heading>
                <ItemTable itemTableData={itemTableData} />
              </>
            )}
            <Pagination
              id="bib-items-pagination"
              initialPage={itemPage}
              currentPage={itemPage}
              pageCount={Math.ceil(bib.numPhysicalItems / ITEM_BATCH_SIZE)}
              onPageChange={handlePageChange}
              my="xl"
            />
          </Box>
        ) : null}
        <BibDetails
          heading="Details"
          key="bottom-details"
          details={bottomDetails}
        />
        <BibDetails
          heading="Holdings"
          key="holdings-details"
          details={holdingsDetails}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, query, req }) {
  const { id } = params
  const { discoveryBibResult, annotatedMarc, status, redirectUrl } =
    await fetchBib(id, query)
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  switch (status) {
    case 307:
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false,
        },
      }
    case 404:
      return {
        redirect: {
          destination: PATHS["404"],
          permanent: false,
        },
      }
    default:
      return {
        props: {
          discoveryBibResult,
          annotatedMarc,
          isAuthenticated,
          itemPage: query.item_page || null,
        },
      }
  }
}
