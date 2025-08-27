import type { SyntheticEvent } from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  SkeletonLoader,
  Box,
  Banner,
  StatusBadge,
} from "@nypl/design-system-react-components"
import Layout from "../../../src/components/Layout/Layout"
import {
  PATHS,
  BASE_URL,
  FOCUS_TIMEOUT,
  ERROR_MESSAGES,
} from "../../../src/config/constants"
import { appConfig } from "../../../src/config/config"
import { fetchBib } from "../../../src/server/api/bib"
import {
  getBibQueryString,
  buildItemTableDisplayingString,
  isNyplBibID,
  buildBibMetadataTitle,
} from "../../../src/utils/bibUtils"
import BibDetailsModel from "../../../src/models/BibDetails"
import BibDetails from "../../../src/components/BibPage/BibDetail"
import ElectronicResources from "../../../src/components/BibPage/ElectronicResources"
import ItemTable from "../../../src/components/ItemTable/ItemTable"
import ItemTableControls from "../../../src/components/ItemTable/ItemTableControls"
import ExternalLink from "../../../src/components/Links/ExternalLink/ExternalLink"
import ItemFilters from "../../../src/components/ItemFilters/ItemFilters"
import type {
  DiscoveryBibResult,
  BibQueryParams,
} from "../../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../../src/types/bibDetailsTypes"
import Bib from "../../../src/models/Bib"
import initializePatronTokenAuth from "../../../src/server/auth"
import type { ItemFilterQueryParams } from "../../../src/types/filterTypes"
import type { ParsedUrlQueryInput } from "querystring"
import {
  parseItemFilterQueryParams,
  areFiltersApplied,
} from "../../../src/utils/itemFilterUtils"
import RCHead from "../../../src/components/Head/RCHead"
import FindingAid from "../../../src/components/BibPage/FindingAid"
import Custom404 from "../../404"
import { tryInstantiate } from "../../../src/utils/appUtils"

interface BibPropsType {
  discoveryBibResult: DiscoveryBibResult
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
  itemPage?: number
  viewAllItems?: boolean
  notFound?: boolean
  prebuiltBibDetails?: BibDetailsModel
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  discoveryBibResult,
  annotatedMarc,
  prebuiltBibDetails,
  isAuthenticated,
  itemPage = 1,
  viewAllItems = false,
  notFound = false,
}: BibPropsType) {
  const { push, query } = useRouter()
  const [bib, setBib] = useState(
    tryInstantiate({
      constructor: Bib,
      args: [discoveryBibResult],
      ignoreError: notFound,
      errorMessage: "Bib undefined",
    })
  )

  const metadataTitle = buildBibMetadataTitle(bib?.title)
  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemFetchError, setItemFetchError] = useState(false)

  const [viewAllExpanded, setViewAllExpanded] = useState(viewAllItems)
  const [appliedFilters, setAppliedFilters] = useState(
    parseItemFilterQueryParams(query)
  )
  const [itemTablePage, setItemTablePage] = useState(itemPage)

  const itemTableHeadingRef = useRef<HTMLDivElement>(null)
  const viewAllLoadingTextRef = useRef<HTMLDivElement & HTMLLabelElement>(null)
  const controllerRef = useRef<AbortController>()

  if (notFound) {
    return <Custom404 activePage="bib" />
  }

  const { topDetails, bottomDetails, holdingsDetails, findingAid } =
    prebuiltBibDetails || new BibDetailsModel(discoveryBibResult, annotatedMarc)
  const displayLegacyCatalogLink = isNyplBibID(bib.id)

  const filtersAreApplied = areFiltersApplied(appliedFilters)

  const refreshItemTable = async (
    newQuery: BibQueryParams,
    viewAllItems = false,
    updateFocusOnItemTableHeading = false
  ) => {
    setItemsLoading(true)
    setItemFetchError(false)

    // By default, the Next router query includes the bib id
    // This prevents it from being added redundantly to the query string
    delete newQuery.id

    // If viewAllItems is enabled, remove pagination queries
    if (viewAllItems) {
      delete newQuery.items_from
      delete newQuery.item_page
      delete newQuery.items_size
    }

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
    const bibQueryString = getBibQueryString(
      { ...newQuery, all_items: viewAllItems },
      false
    )

    try {
      // Cancel any active fetches on new ItemTable refreshes
      if (controllerRef.current) {
        controllerRef.current.abort(ERROR_MESSAGES.ITEM_REFETCH_ABORT_REASON)
      }
      controllerRef.current = new AbortController()
      const signal = controllerRef.current.signal
      const response = await fetch(
        `${BASE_URL}/api/bib/${bib.id}${bibQueryString}`,
        {
          method: "get",
          signal,
        }
      )
      if (response?.ok) {
        const { discoveryBibResult } = await response.json()
        setBib(new Bib(discoveryBibResult))

        setItemsLoading(false)

        // TODO: This is a workaround to prevent the Displaying text from receiving focus when filters are controlled via a checkbox
        // This is an accessibility issue that should be addressed when the dynamic refresh is replaced with a form and apply button
        if (!updateFocusOnItemTableHeading)
          setTimeout(() => {
            itemTableHeadingRef.current?.focus()
          }, FOCUS_TIMEOUT)
      } else {
        handleItemFetchError()
      }
    } catch (error) {
      console.log(error)
      if (error !== ERROR_MESSAGES.ITEM_REFETCH_ABORT_REASON)
        handleItemFetchError()
    }
  }

  const handleItemFetchError = () => {
    setItemsLoading(false)
    setItemFetchError(true)
  }

  const handleFiltersChange = async (
    newAppliedFilterQuery: ItemFilterQueryParams,
    updateFocusOnItemTableHeading = false
  ) => {
    const newQuery = {
      ...newAppliedFilterQuery,
    } as BibQueryParams
    if (newQuery.item_page) delete newQuery.item_page
    setItemTablePage(1)
    setAppliedFilters(parseItemFilterQueryParams(newAppliedFilterQuery))
    await refreshItemTable(
      newQuery,
      viewAllExpanded,
      updateFocusOnItemTableHeading
    )
  }

  const handlePageChange = async (page: number) => {
    setItemTablePage(page)
    const newQuery = { ...query, item_page: page }
    if (page === 1) delete newQuery.item_page
    await refreshItemTable(newQuery)
  }

  const handleViewAllClick = async (e: SyntheticEvent) => {
    e.preventDefault()
    setViewAllExpanded((viewAllExpanded) => {
      refreshItemTable(query, !viewAllExpanded)
      return !viewAllExpanded
    })
    setTimeout(() => {
      viewAllLoadingTextRef.current?.focus()
    }, FOCUS_TIMEOUT)
  }

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="bib">
        {findingAid && (
          <StatusBadge mb="s" type="informative">
            FINDING AID AVAILABLE
          </StatusBadge>
        )}
        <Heading level="h2" size="heading3" mb="l">
          {bib.title}
        </Heading>
        <BibDetails key="top-details" details={topDetails} />
        <Box mt="s">
          {findingAid && (
            <FindingAid
              findingAidURL={findingAid}
              hasElectronicResources={bib.hasElectronicResources}
            />
          )}
          {bib.hasElectronicResources && (
            <ElectronicResources
              electronicResources={bib.electronicResources}
            />
          )}
        </Box>
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
              className="no-print"
            />
            <ItemFilters
              itemAggregations={bib.itemAggregations}
              handleFiltersChange={handleFiltersChange}
              appliedFilters={appliedFilters}
              filtersAreApplied={filtersAreApplied}
              showDateFilter={bib.hasItemDates}
            />
            <Box id="item-table">
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
                      bib.numItems(filtersAreApplied),
                      viewAllExpanded,
                      filtersAreApplied
                    )}
                  </Heading>
                  {bib.itemTableData ? (
                    <ItemTable itemTableData={bib.itemTableData} />
                  ) : null}
                </>
              )}
              {bib.itemTableData ? (
                <ItemTableControls
                  bib={bib}
                  viewAllExpanded={viewAllExpanded}
                  itemsLoading={itemsLoading}
                  itemTablePage={itemTablePage}
                  handlePageChange={handlePageChange}
                  handleViewAllClick={handleViewAllClick}
                  viewAllLoadingTextRef={viewAllLoadingTextRef}
                  numItemsTotal={bib.numItems(filtersAreApplied)}
                  filtersAreApplied={filtersAreApplied}
                />
              ) : null}
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
        redirect: { destination: redirectUrl, permanent: false },
      }
    case 404:
      return { props: { notFound: true } }
    default: {
      // Build bib details serverside, allows us to log our kept annotated MARC fields.
      const bibDetails = new BibDetailsModel(discoveryBibResult, annotatedMarc)
      return {
        props: {
          discoveryBibResult,
          annotatedMarc,
          isAuthenticated,
          itemPage: query.item_page ? parseInt(query.item_page) : 1,
          prebuiltBibDetails: {
            topDetails: bibDetails.topDetails,
            bottomDetails: bibDetails.bottomDetails,
            holdingsDetails: bibDetails.holdingsDetails,
            findingAid: bibDetails.findingAid,
          },
        },
      }
    }
  }
}
