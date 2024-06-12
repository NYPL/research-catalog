import Head from "next/head"
import type { SyntheticEvent } from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Pagination,
  SkeletonLoader,
  Box,
  Banner,
} from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import {
  PATHS,
  ITEM_PAGINATION_BATCH_SIZE,
  SITE_NAME,
  BASE_URL,
} from "../../../src/config/constants"
import { fetchBib } from "../../../src/server/api/bib"
import { getBibQueryString } from "../../../src/utils/bibUtils"
import { buildItemTableDisplayingString } from "../../../src/utils/bibUtils"
import BibDetailsModel from "../../../src/models/BibDetails"
import ItemTableData from "../../../src/models/ItemTableData"
import BibDetails from "../../../src/components/BibPage/BibDetail"
import ItemTable from "../../../src/components/ItemTable/ItemTable"
import type {
  DiscoveryBibResult,
  BibQueryParams,
} from "../../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../../src/types/bibDetailsTypes"
import Bib from "../../../src/models/Bib"
import initializePatronTokenAuth from "../../../src/server/auth"
import Item from "../../../src/models/Item"
import type { SearchResultsItem } from "../../../src/types/itemTypes"
import RCLink from "../../../src/components/Links/RCLink/RCLink"
import { ParsedUrlQueryInput } from "querystring"

interface BibPropsType {
  discoveryBibResult: DiscoveryBibResult
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
  itemPage?: number
  viewAllItems?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  discoveryBibResult,
  annotatedMarc,
  isAuthenticated,
  itemPage = 1,
  viewAllItems = false,
}: BibPropsType) {
  const { pathname, push, query } = useRouter()
  const metadataTitle = `Item Details | ${SITE_NAME}`
  const bib = new Bib(discoveryBibResult)

  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemFetchError, setItemFetchError] = useState(bib.showItemTableError)
  const [viewAllEnabled, setViewAllEnabled] = useState(viewAllItems)
  const [bibItems, setBibItems] = useState(bib.items)
  const itemTableScrollRef = useRef<HTMLDivElement>(null)

  const { topDetails, bottomDetails, holdingsDetails } = new BibDetailsModel(
    discoveryBibResult,
    annotatedMarc
  )

  const itemTableData = new ItemTableData(bibItems, {
    isArchiveCollection: bib.isArchiveCollection,
  })

  const refreshItemTable = async (
    newQuery: BibQueryParams,
    viewAllItems = false
  ) => {
    setItemsLoading(true)
    setItemFetchError(false)
    await push(
      {
        pathname: `${pathname}${viewAllItems ? "/all" : ""}`,
        query: { ...newQuery },
      },
      undefined,
      {
        shallow: true,
      }
    )
    const bibQueryString = getBibQueryString(newQuery, false, viewAllItems)
    const response = await fetch(
      `${BASE_URL}/api/bib/${bib.id}/items${bibQueryString}`
    )
    if (response.ok) {
      const { items } = await response.json()
      setBibItems(items.map((item: SearchResultsItem) => new Item(item, bib)))
      setItemsLoading(false)
      itemTableScrollRef.current?.scrollIntoView({
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

  const handleViewAll = async (e: SyntheticEvent) => {
    e.preventDefault()
    let newQuery: BibQueryParams
    setViewAllEnabled((viewAllEnabled) => !viewAllEnabled)
    if (viewAllEnabled) {
      newQuery = query
      await refreshItemTable(newQuery)
    } else {
      newQuery = query
      delete newQuery.item_page
      await refreshItemTable(newQuery, true)
    }
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
          <>
            <Heading
              data-testid="item-table-heading"
              level="h3"
              size="heading4"
              mb={{ base: "s", md: "m" }}
            >
              Items in the library and off-site
            </Heading>
            <Box id="item-table" ref={itemTableScrollRef}>
              {itemsLoading ? (
                <SkeletonLoader showImage={false} />
              ) : itemFetchError ? (
                <Banner
                  type="negative"
                  content="There was an error fetching items. Please try again with a different query."
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
              <Box>
                {!viewAllEnabled ? (
                  <Pagination
                    id="bib-items-pagination"
                    initialPage={itemPage}
                    currentPage={itemPage}
                    pageCount={Math.ceil(
                      bib.numPhysicalItems / ITEM_PAGINATION_BATCH_SIZE
                    )}
                    onPageChange={handlePageChange}
                    my="xl"
                  />
                ) : null}
                {bib.showViewAllItemsLink && (
                  <RCLink
                    href={`${bib.url}${!viewAllEnabled ? "/all" : ""}`}
                    onClick={handleViewAll}
                    fontSize={{
                      base: "mobile.body.body2",
                      md: "desktop.body.body2",
                    }}
                    fontWeight="medium"
                    type="standalone"
                  >
                    {viewAllEnabled
                      ? "View Less"
                      : `View All ${bib.itemMessage} `}
                  </RCLink>
                )}
              </Box>
            </Box>
          </>
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
          itemPage: query.item_page || 1,
        },
      }
  }
}
