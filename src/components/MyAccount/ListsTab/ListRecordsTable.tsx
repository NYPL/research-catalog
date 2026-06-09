import {
  SkeletonLoader,
  Flex,
  Heading,
  Box,
  Table,
  Pagination,
} from "@nypl/design-system-react-components"
import { useRef, useState, useMemo, useEffect } from "react"
import { BASE_URL } from "../../../config/constants"
import { useFocusContext, idConstants } from "../../../context/FocusContext"
import styles from "../../../../styles/components/MyAccount.module.scss"
import {
  LIST_RECORDS_PER_PAGE,
  listResultsHeading,
  listSortOptions,
  buildListRecords,
} from "../../../utils/listUtils"
import ListSort from "./ListSort"
import Link from "../../Link/Link"
import type { List, ListRecord } from "../../../types/listTypes"
import type { DiscoverySearchResultsElement } from "../../../types/searchTypes"
import { ManageBibInList } from "../../List/ManageBibInList"
import EmptyList from "./EmptyList"

/* The ListRecordsTable fetches corresponding bib data, merges it with the list records,
 * sorts and paginates, and renders the results heading, sort menu, and table of records.
 * If there are no list records, it displays the Empty list view. */

const ListRecordsTable = ({
  list,
  activeSort,
  setActiveSort,
  setStatus,
}: {
  list: List
  activeSort
  setActiveSort
  setStatus
}) => {
  const listRecordsHeadingRef = useRef(null)
  const { setPersistentFocus } = useFocusContext()
  const sortMenuRef = useRef<HTMLDivElement | null>(null)

  const [listRecords, setListRecords] = useState<ListRecord[]>(
    list?.records || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // If the only record on a page is deleted, go back to previous page
  useEffect(() => {
    const maxPage = Math.max(
      1,
      Math.ceil((list?.records?.length || 0) / LIST_RECORDS_PER_PAGE)
    )
    if (currentPage > maxPage) {
      setCurrentPage(maxPage)
    }
  }, [list?.records?.length, currentPage])

  const sortedRecords = useMemo(() => {
    if (!list?.records) return []
    const records = [...list.records]
    if (activeSort === "added_date_asc") {
      return records.reverse()
    }
    return records
  }, [list, activeSort])

  useEffect(() => {
    const fetchBibData = async () => {
      if (!list || sortedRecords.length === 0) return
      setIsLoading(true)

      const canSortWithoutBibData = activeSort.includes("added_date")
      const startIndex = (currentPage - 1) * LIST_RECORDS_PER_PAGE
      const endIndex = startIndex + LIST_RECORDS_PER_PAGE

      // If sorting by title/author/call number, need to fetch bib data for all records
      // otherwise: sorting by date added, only need to fetch bib data for the current page
      const recordsToFetch = canSortWithoutBibData
        ? sortedRecords.slice(startIndex, endIndex)
        : sortedRecords

      const chunkSize = 50
      let allBibData: DiscoverySearchResultsElement[] = []

      for (let i = 0; i < recordsToFetch.length; i += chunkSize) {
        const chunk = recordsToFetch.slice(i, i + chunkSize)
        const uris = chunk
          .map((r) => r.uri)
          .filter(Boolean)
          .join(",")
        if (!uris) continue
        try {
          const response = await fetch(
            `${BASE_URL}/api/account/lists/records?uris=${uris}`
          )
          if (response.ok) {
            const data = await response.json()
            allBibData = allBibData.concat(data.bibData || [])
          }
        } catch (error) {
          console.error("Error fetching bib data chunk:", error)
        }
      }

      try {
        if (allBibData.length > 0) {
          let updatedRecords = buildListRecords(
            allBibData,
            recordsToFetch,
            activeSort
          )

          // slice out the current page to display if fetching all
          if (!canSortWithoutBibData) {
            updatedRecords = updatedRecords.slice(startIndex, endIndex)
          }

          setListRecords(updatedRecords)
        }
      } catch (error) {
        console.error("Error fetching bib data for list:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBibData()
  }, [list, currentPage, activeSort, sortedRecords])

  const handleSortChange = (selectedSortOption: string) => {
    setActiveSort(selectedSortOption)
    setCurrentPage(1)
    setPersistentFocus(idConstants.listsSort)
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    setPersistentFocus(idConstants.listRecordsHeading)
  }

  if (!list || list.recordCount === 0) {
    return <EmptyList />
  }

  const tableData = listRecords.map((record: ListRecord) => {
    return [
      <>
        <Link isUnderlined={false} href={`/bib/${record.uri}`} key={record.uri}>
          {record.title}
        </Link>{" "}
        {record.itemCount > 1 && `(${record.itemCount} items)`}
      </>,
      record.callNumber,
      record.location,
      record.addedDate,
      <ManageBibInList
        key={record.uri}
        recordId={record.uri}
        isAuthenticated={true}
        setStatus={setStatus}
      />,
    ]
  })

  const loader = (
    <SkeletonLoader
      showImage={false}
      mb="m"
      ml="0"
      maxWidth="1200px"
      contentSize={5}
      showHeading={false}
    />
  )
  return (
    <>
      <Flex
        mt="m"
        mb={{ base: "s", md: "xs" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading
          level="h3"
          size="heading6"
          id="list-records-heading"
          tabIndex={-1}
          ref={listRecordsHeadingRef}
          aria-live="polite"
          pr="m"
        >
          {listResultsHeading(list, currentPage)}
        </Heading>
        <Box display={{ base: "none", sm: "flex" }}>
          <ListSort
            ref={sortMenuRef}
            selectedValue={activeSort}
            sortOptions={listSortOptions}
            handleSortChange={handleSortChange}
          />
        </Box>
      </Flex>
      {isLoading ? (
        loader
      ) : (
        <Box display="grid">
          <Table
            className={styles.listTable}
            columnHeaders={[
              "Title",
              "Call number",
              "Location",
              "Date added",
              "Action",
            ]}
            columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
            columnStyles={[
              { width: 608, minWidth: 240 },
              { width: 192, minWidth: 120 },
              { width: 192, minWidth: 120 },
              { width: "auto", minWidth: 128 },
              { width: 128, minWidth: 128 },
            ]}
            tableData={tableData}
            isScrollable
            showRowDividers
            my={{ base: 0, md: "s" }}
            data-testid="list-records-table"
          />
          {list.recordCount > LIST_RECORDS_PER_PAGE && (
            <Flex justifyContent={{ base: "center", md: "flex-start" }}>
              <Pagination
                id="list-records-pagination"
                mt="l"
                width="auto"
                initialPage={currentPage}
                currentPage={currentPage}
                pageCount={Math.ceil(
                  list.records.length / LIST_RECORDS_PER_PAGE
                )}
                onPageChange={handlePageChange}
              />
            </Flex>
          )}
        </Box>
      )}
    </>
  )
}

export default ListRecordsTable
