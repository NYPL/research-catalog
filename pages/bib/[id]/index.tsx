import type { SyntheticEvent } from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  SkeletonLoader,
  Box,
  Banner,
  StatusBadge,
  Flex,
} from "@nypl/design-system-react-components"
import Layout from "../../../src/components/Layout/Layout"
import {
  PATHS,
  BASE_URL,
  FOCUS_TIMEOUT,
  ERROR_MESSAGES,
} from "../../../src/config/constants"
import { fetchBib } from "../../../src/server/api/bib"
import {
  getBibQueryString,
  buildItemTableDisplayingString,
  buildBibMetadataTitle,
  isNyplBibID,
} from "../../../src/utils/bibUtils"
import BibDetailsModel from "../../../src/models/BibDetails"
import BibDetails from "../../../src/components/BibPage/BibDetail"
import ElectronicResources from "../../../src/components/BibPage/ElectronicResources"
import ItemTable from "../../../src/components/ItemTable/ItemTable"
import ItemTableControls from "../../../src/components/ItemTable/ItemTableControls"
import ItemFilters from "../../../src/components/ItemFilters/ItemFilters"
import type {
  DiscoveryBibResult,
  BibQueryParams,
} from "../../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../../src/types/marcTypes"
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
import { tryInstantiate } from "../../../src/utils/appUtils"
import Link from "../../../src/components/Link/Link"
import type { HTTPStatusCode } from "../../../src/types/appTypes"
import PageError from "../../../src/components/Error/PageError"
import { ManageBibInList } from "../../../src/components/List/ManageBibInList"
import { PatronDataProvider } from "../../../src/context/PatronDataContext"
import MyAccount from "../../../src/models/MyAccount"
import { StatusBanner } from "../../../src/components/MyAccount/Settings/StatusBanner"
import type { StatusBannerState } from "../../../src/components/MyAccount/Settings/StatusBanner"
import { idConstants } from "../../../src/context/FocusContext"

interface BibPropsType {
  discoveryBibResult: DiscoveryBibResult
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
  itemPage?: number
  viewAllItems?: boolean
  errorStatus?: HTTPStatusCode | null
  accountData?: any
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
  errorStatus = null,
  accountData,
}: BibPropsType) {
  const { push, query } = useRouter()
  const [bib, setBib] = useState(
    tryInstantiate({
      constructor: Bib,
      args: [discoveryBibResult],
      ignoreError: !!errorStatus,
      errorMessage: "Bib undefined",
    })
  )

  const metadataTitle = buildBibMetadataTitle({ bibTitle: bib?.title })
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

  // Manage status banner display for list actions
  const [status, setStatus] = useState<StatusBannerState | null>(null)

  if (errorStatus || !discoveryBibResult) {
    return (
      <PageError
        page="bib"
        errorStatus={
          // 422 = invalid bnum, which we also display as "Not found"
          errorStatus === 404 || errorStatus === 422 ? 404 : errorStatus || 500
        }
      />
    )
  }

  const { topDetails, bottomDetails, holdingsDetails, findingAid } =
    new BibDetailsModel(discoveryBibResult, annotatedMarc)

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
    <PatronDataProvider value={accountData || null}>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="bib">
        <div
          tabIndex={-1}
          id={`${idConstants.listStatusBanner}-${bib.id}`}
          style={{ marginTop: "-16px", marginBottom: "32px" }}
        >
          {status && (
            <StatusBanner type={status.type} message={status.message} />
          )}
        </div>
        {findingAid && (
          <StatusBadge mb="s" variant="informative" translate="no">
            Finding aid available
          </StatusBadge>
        )}
        <Flex flexDir="row" justifyContent="space-between" alignItems="center">
          <Heading level="h2" size="heading3" mr="l" translate="no">
            {bib.title}
          </Heading>
          <ManageBibInList
            setStatus={setStatus}
            recordId={bib.id}
            isAuthenticated={isAuthenticated}
          />
        </Flex>
        <BibDetails key="top-details" details={topDetails} />
        <Box mt="s">
          {findingAid && (
            <FindingAid
              findingAidURL={findingAid}
              isNyplBib={isNyplBibID(bib.id)}
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
              Items in the library and offsite
            </Heading>
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
                  variant="negative"
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
          <Flex flexDirection="column">
            <Link
              id="marc-link"
              href={`/bib/${bib.id}/marc`}
              variant="standalone"
              width="max-content"
              mt="s"
            >
              View MARC record
            </Link>
          </Flex>
        </Box>
      </Layout>
    </PatronDataProvider>
  )
}

export async function getServerSideProps({ params, query, req }) {
  const { id } = params
  const results = await fetchBib(id, query)
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  // Direct to error display according to status
  if (!("discoveryBibResult" in results)) {
    if (results.status === 307)
      return {
        redirect: {
          destination: results.redirectUrl,
          permanent: false,
        },
      }
    else
      return {
        props: {
          errorStatus: results.status,
        },
      }
  }

  // Get just patron and lists data
  let accountData = null
  if (isAuthenticated) {
    const patronId = patronTokenResponse.decodedPatron.sub
    const accountModel = new MyAccount(null, patronId)
    const lists = await accountModel.getLists(patronId)

    accountData = { patron: { id: patronId }, lists }
  }

  return {
    props: {
      discoveryBibResult: {
        ...results.discoveryBibResult,
        ...{
          bibId: "b11811123",
          linkingEntry: [
            {
              parallelDisplay: null,
              label: "Supplemental/special Issue Entry",
              display: "B.A.S.I.C. 0521-9450 (DLC)sf 82007016 (OCoLC)2258187",
              marcTag: "770",
              issn: "0521-9450",
              isbn: null,
              language: null,
              oclc: "(OCoLC)2258187",
              lccn: "(DLC)sf 82007016",
              hash: 3534991393,
              marcTagIndex: 0,
            },
            {
              parallelDisplay: null,
              label: "Other Edition Entry",
              display:
                "Biological abstracts on compact disc 1058-4129 (DLC)sn 91000409",
              marcTag: "775",
              issn: "1058-4129",
              isbn: null,
              language: null,
              oclc: "",
              lccn: "(DLC)sn 91000409",
              hash: 2461551885,
              marcTagIndex: 0,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display:
                "Biological abstracts.  Section A, General biology 1049-0663 (DLC)sn 90004462",
              marcTag: "787",
              issn: "1049-0663",
              isbn: null,
              language: null,
              oclc: "",
              lccn: "(DLC)sn 90004462",
              hash: 3123567132,
              marcTagIndex: 0,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display:
                "Biological abstracts.  Section B, Experimental animal biology 1049-0671 (DLC)sn 90004463",
              marcTag: "787",
              issn: "1049-0671",
              isbn: null,
              language: null,
              oclc: "",
              lccn: "(DLC)sn 90004463",
              hash: 3043593899,
              marcTagIndex: 1,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display:
                "Biological abstracts.  Section B, Basic medical sciences 1049-068X (DLC)sn 90004464",
              marcTag: "787",
              issn: "1049-068X",
              isbn: null,
              language: null,
              oclc: "",
              lccn: "(DLC)sn 90004464",
              hash: 12402104615,
              marcTagIndex: 2,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display:
                "Biological abstracts.  Section C, Microbiology, immunology and parasitology 1049-0698 (DLC)sn 90004465",
              marcTag: "787",
              issn: "1049-0698",
              isbn: null,
              language: null,
              oclc: "",
              lccn: "(DLC)sn 90004465",
              hash: 6251461252,
              marcTagIndex: 3,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display:
                "Biological abstracts.  Section D, Plant sciences 1049-0701 (DLC)sn 90004466",
              marcTag: "787",
              issn: "1049-0701",
              isbn: null,
              language: null,
              oclc: "",
              lccn: "(DLC)sn 90004466",
              hash: 23662201603,
              marcTagIndex: 4,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display: "Biological abstracts.  Section E, Animal sciences",
              marcTag: "787",
              issn: null,
              isbn: null,
              language: null,
              oclc: null,
              lccn: null,
              hash: 7868883631,
              marcTagIndex: 5,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display: "Biological abstracts.  Section F",
              marcTag: "787",
              issn: null,
              isbn: null,
              language: null,
              oclc: null,
              lccn: null,
              hash: 7420369401,
              marcTagIndex: 6,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display: "Biological abstracts.  Section G",
              marcTag: "787",
              issn: null,
              isbn: null,
              language: null,
              oclc: null,
              lccn: null,
              hash: 7420368440,
              marcTagIndex: 7,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display: "Biological abstracts.  Section H",
              marcTag: "787",
              issn: null,
              isbn: null,
              language: null,
              oclc: null,
              lccn: null,
              hash: 7420367479,
              marcTagIndex: 8,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display: "Biological abstracts.  Section I",
              marcTag: "787",
              issn: null,
              isbn: null,
              language: null,
              oclc: null,
              lccn: null,
              hash: 7420366518,
              marcTagIndex: 9,
            },
            {
              parallelDisplay: null,
              label: "Other Relationship Entry",
              display: "Biological abstracts.  Section J",
              marcTag: "787",
              issn: null,
              isbn: null,
              language: null,
              oclc: null,
              lccn: null,
              hash: 7420365557,
              marcTagIndex: 10,
            },
            {
              parallelDisplay: null,
              label: "Formed By",
              display: "Abstracts of bacteriology 0096-5340 (OCoLC)1460582",
              marcTag: "780",
              issn: "0096-5340",
              isbn: null,
              language: null,
              oclc: "(OCoLC)1460582",
              lccn: "",
              hash: 9742325060,
              marcTagIndex: 0,
            },
            {
              parallelDisplay: null,
              label: "Formed By",
              display:
                "Botanical abstracts 0096-526X (DLC)   20008987 (OCoLC)1536892",
              marcTag: "780",
              issn: "0096-526X",
              isbn: null,
              language: null,
              oclc: "(OCoLC)1536892",
              lccn: "(DLC)   20008987",
              hash: 405476553,
              marcTagIndex: 1,
            },
          ],
        },
      },
      annotatedMarc: results.annotatedMarc,
      isAuthenticated,
      itemPage: query.item_page ? parseInt(query.item_page) : 1,
      accountData,
    },
  }
}
