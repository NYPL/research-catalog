import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Pagination,
  SkeletonLoader,
  Box,
} from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import {
  PATHS,
  ITEM_BATCH_SIZE,
  SITE_NAME,
  BASE_URL,
} from "../../src/config/constants"
import { fetchBib } from "../../src/server/api/bib"
import { getBibQuery, mapQueryToBibParams } from "../../src/utils/bibUtils"
import BibDetailsModel from "../../src/models/BibDetails"
import ItemTableData from "../../src/models/ItemTableData"
import BibDetails from "../../src/components/BibPage/BibDetail"
import ItemTable from "../../src/components/ItemTable/ItemTable"
import type { DiscoveryBibResult } from "../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../src/types/bibDetailsTypes"
import Bib from "../../src/models/Bib"
import initializePatronTokenAuth from "../../src/server/auth"
import type { ParsedUrlQueryInput } from "querystring"
import Item from "../../src/models/Item"

interface BibPropsType {
  discoveryBibResult: DiscoveryBibResult
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  discoveryBibResult,
  annotatedMarc,
  isAuthenticated,
}: BibPropsType) {
  const { pathname, push, query } = useRouter()
  const metadataTitle = `Item Details | ${SITE_NAME}`
  const bib = new Bib(discoveryBibResult)

  const [itemsLoading, setItemsLoading] = useState(false)
  const [bibItems, setBibItems] = useState(bib.items)

  const { topDetails, bottomDetails, holdingsDetails } = new BibDetailsModel(
    discoveryBibResult,
    annotatedMarc
  )

  const itemTableData = new ItemTableData(bibItems, {
    isArchiveCollection: bib.isArchiveCollection,
  })

  const refreshItemTable = async (newQuery: ParsedUrlQueryInput) => {
    setItemsLoading(true)
    await push({ pathname, query: { ...newQuery } }, undefined, {
      shallow: true,
    })
    const queryString = getBibQuery(bib.id, mapQueryToBibParams(newQuery))
    const response = await fetch(
      `${BASE_URL}/api/bib/${bib.id}/items?${queryString}`
    )
    const { items } = await response.json()
    console.log(items)
    setBibItems(items.map((item) => new Item(item, bib)))
    setItemsLoading(false)
    document.getElementById("item-table")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const handlePageChange = async (page) => {
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
            {itemsLoading ? (
              <SkeletonLoader showImage={false} />
            ) : (
              <ItemTable itemTableData={itemTableData} />
            )}
            <Pagination
              id="bib-items-pagination"
              initialPage={1}
              currentPage={1}
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

export async function getServerSideProps({ params, resolvedUrl, req }) {
  const { id } = params
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const bibParams = mapQueryToBibParams(queryString)
  const { discoveryBibResult, annotatedMarc, status, redirectUrl } =
    await fetchBib(id, bibParams)
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
        },
      }
  }
}
