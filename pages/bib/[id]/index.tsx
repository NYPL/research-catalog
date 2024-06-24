import Head from "next/head"
import type { SyntheticEvent } from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Pagination,
  SkeletonLoader,
  Box,
  Banner,
  Icon,
  Label,
  ProgressIndicator,
} from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import {
  PATHS,
  ITEM_PAGINATION_BATCH_SIZE,
  SITE_NAME,
  BASE_URL,
  FOCUS_TIMEOUT,
} from "../../../src/config/constants"
import { appConfig } from "../../../src/config/config"
import { fetchBib } from "../../../src/server/api/bib"
import {
  getBibQueryString,
  buildItemTableDisplayingString,
  isNyplBibID,
} from "../../../src/utils/bibUtils"
import BibDetailsModel from "../../../src/models/BibDetails"
import ItemTableData from "../../../src/models/ItemTableData"
import BibDetails from "../../../src/components/BibPage/BibDetail"
import ItemTable from "../../../src/components/ItemTable/ItemTable"
import ElectronicResourcesLink from "../../../src/components/SearchResults/ElectronicResourcesLink"
import ExternalLink from "../../../src/components/Links/ExternalLink/ExternalLink"
import type {
  DiscoveryBibResult,
  BibQueryParams,
} from "../../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../../src/types/bibDetailsTypes"
import Bib from "../../../src/models/Bib"
import initializePatronTokenAuth from "../../../src/server/auth"
import Item from "../../../src/models/Item"
import type { DiscoveryItemResult } from "../../../src/types/itemTypes"
import RCLink from "../../../src/components/Links/RCLink/RCLink"
import type { ParsedUrlQueryInput } from "querystring"

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
  const { push, query } = useRouter()
  const metadataTitle = `Item Details | ${SITE_NAME}`
  const bib = new Bib(discoveryBibResult)
  const displayLegacyCatalogLink = isNyplBibID(bib.id)

  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemFetchError, setItemFetchError] = useState(bib.showItemTableError)
  const [viewAllEnabled, setViewAllEnabled] = useState(viewAllItems)
  const [bibItems, setBibItems] = useState(bib.items)
  const [itemTablePage, setItemTablePage] = useState(itemPage)

  const itemTableScrollRef = useRef<HTMLDivElement>(null)
  const itemTableHeadingRef = useRef<HTMLDivElement>(null)
  const viewAllLoadingTextRef = useRef<HTMLDivElement & HTMLLabelElement>(null)
  const controllerRef = useRef<AbortController>()

  const { topDetails, bottomDetails, holdingsDetails } = new BibDetailsModel(
    discoveryBibResult,
    annotatedMarc
  )

  const itemTableData = new ItemTableData(bibItems, {
    isArchiveCollection: bib.isArchiveCollection,
  })

  // Load all items via client-side fetch if page is first loaded with viewAllItems prop passed in
  // Namely, when the page is accessed with the /all route
  useEffect(() => {
    if (viewAllItems) refreshItemTable(query, true)
  }, [])

  const refreshItemTable = async (
    newQuery: BibQueryParams,
    viewAllItems = false
  ) => {
    setItemsLoading(true)
    setItemFetchError(false)

    // By default, the Next router query includes the bib id
    // This prevents it from being added redundantly to the query string
    delete newQuery.id

    await push(
      {
        pathname: `${PATHS.BIB}/${bib.id}${viewAllItems ? "/all" : ""}`,
        query: newQuery as ParsedUrlQueryInput,
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    )
    const bibQueryString = getBibQueryString(newQuery, false, viewAllItems)

    // Cancel any active fetches on new ItemTable refreshes
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal

    const response = await fetch(
      `${BASE_URL}/api/bib/${bib.id}/items${bibQueryString}`,
      {
        method: "get",
        signal,
      }
    )
    if (response?.ok) {
      const { items } = await response.json()
      setBibItems(items.map((item: DiscoveryItemResult) => new Item(item, bib)))
      setItemsLoading(false)
      itemTableScrollRef.current?.scrollIntoView({
        behavior: "smooth",
      })
      setTimeout(() => {
        itemTableHeadingRef.current?.focus()
      }, FOCUS_TIMEOUT)
    } else {
      setItemFetchError(true)
      setItemsLoading(false)
    }
  }

  const handlePageChange = async (page: number) => {
    setItemTablePage(page)
    const newQuery = { ...query, item_page: page }
    if (page === 1) delete newQuery.item_page
    await refreshItemTable(newQuery)
  }

  const handleViewAllClick = async (e: SyntheticEvent) => {
    e.preventDefault()
    setViewAllEnabled((viewAllEnabled) => !viewAllEnabled)
    setTimeout(() => {
      viewAllLoadingTextRef.current?.focus()
    }, FOCUS_TIMEOUT)
    if (viewAllEnabled) {
      await refreshItemTable(query, false)
    } else {
      delete query.item_page
      await refreshItemTable(query, true)
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
        <Heading level="h2" size="heading3" mb="l">
          {bib.title}
        </Heading>
        <BibDetails key="top-details" details={topDetails} />
        <ElectronicResourcesLink
          bibUrl={bib.url}
          electronicResources={bib.electronicResources}
          inSearchResults={false}
        />
        {bib.showItemTable ? (
          <>
            <Heading
              data-testid="item-table-heading"
              level="h3"
              size="heading4"
              mt="l"
              mb="s"
            >
              Items in the library and off-site
            </Heading>
            <Banner
              content={
                <ExternalLink href="https://www.nypl.org/help/request-research-materials">
                  How do I request and pick up research materials for on-site
                  use?
                </ExternalLink>
              }
              isDismissible
              mb="s"
            />
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
                    ref={itemTableHeadingRef}
                    level="h4"
                    size="heading6"
                    mb="s"
                    tabIndex={-1}
                  >
                    {buildItemTableDisplayingString(
                      itemTablePage,
                      bib.numPhysicalItems,
                      viewAllEnabled
                    )}
                  </Heading>
                  <ItemTable itemTableData={itemTableData} />
                </>
              )}
              <Box display="flex" my="xl" justifyContent="space-between">
                {!viewAllEnabled ? (
                  <Pagination
                    id="bib-items-pagination"
                    initialPage={itemTablePage}
                    currentPage={itemTablePage}
                    pageCount={Math.ceil(
                      bib.numPhysicalItems / ITEM_PAGINATION_BATCH_SIZE
                    )}
                    onPageChange={handlePageChange}
                    width="auto"
                  />
                ) : null}
                {bib.showViewAllItemsLink &&
                  (itemsLoading && viewAllEnabled ? (
                    <Box
                      ml="auto"
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <ProgressIndicator
                        id="bib-all-items-loading"
                        labelText={bib.itemsViewAllLoadingMessage}
                        size="small"
                        indicatorType="circular"
                        mr="xs"
                        isIndeterminate
                      />
                      <Label
                        htmlFor="bib-all-items-loading"
                        ref={viewAllLoadingTextRef}
                        fontSize={{
                          base: "mobile.body.body1",
                          md: "desktop.body.body1",
                        }}
                        fontWeight="medium"
                        mb={0}
                        // Label component does not expect tabIndex prop, so we are ignoring the typescript error that pops up.
                        // Add any additional props above this for typescript validation.
                        // @ts-expect-error
                        tabIndex={-1}
                      >
                        {bib.itemsViewAllLoadingMessage}
                      </Label>
                    </Box>
                  ) : !itemsLoading ? (
                    <RCLink
                      href={`${bib.url}${!viewAllEnabled ? "/all" : ""}`}
                      onClick={handleViewAllClick}
                      fontSize={{
                        base: "mobile.body.body1",
                        md: "desktop.body.body1",
                      }}
                      fontWeight="medium"
                      display="flex"
                      alignItems="center"
                      ml="auto"
                      isUnderlined={false}
                    >
                      <Box as="span" mr="xxs">
                        {viewAllEnabled
                          ? "View fewer items"
                          : `View All ${bib.itemMessage}`}
                      </Box>
                      <Icon
                        iconRotation={viewAllEnabled ? "rotate180" : "rotate0"}
                        name="arrow"
                        size="small"
                        align="right"
                        color="ui.link.primary"
                      />
                    </RCLink>
                  ) : null)}
              </Box>
            </Box>
          </>
        ) : null}
        <Box mb="xl">
          <BibDetails
            heading="Holdings"
            key="holdings-details"
            details={holdingsDetails}
          />
          <BibDetails
            heading="Details"
            key="bottom-details"
            details={bottomDetails}
          />
          {displayLegacyCatalogLink ? (
            <ExternalLink
              id="legacy-catalog-link"
              href={`${appConfig.urls.legacyCatalog}/record=${bib.id}`}
              type="standalone"
              mt="s"
            >
              View in legacy catalog
            </ExternalLink>
          ) : null}
        </Box>
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
          itemPage: query.item_page ? parseInt(query.item_page) : 1,
        },
      }
  }
}