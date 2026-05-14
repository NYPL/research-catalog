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
import type ListRecord from "../../../models/ListRecord"
import {
  LIST_RECORDS_PER_PAGE,
  listResultsHeading,
  listSortOptions,
  buildListRecords,
} from "../../../utils/listUtils"
import ListSort from "./ListSort"
import type List from "../../../models/List"
import styles from "../../../../styles/components/MyAccount.module.scss"
import Link from "../../Link/Link"

/* The ListRecordsTable fetches corresponding bib data, merges it with the list records,
 * sorts and paginates, and renders the results heading, sort menu, and table of records. */

const ListRecordsTable = ({ list }: { list: List }) => {
  const listRecordsHeadingRef = useRef(null)
  const { setPersistentFocus } = useFocusContext()
  const sortMenuRef = useRef<HTMLDivElement | null>(null)
  const [activeSort, setActiveSort] = useState("added_date_asc")

  const [listRecords, setListRecords] = useState<ListRecord[]>(
    list?.records || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const sortedRecords = useMemo(() => {
    if (!list?.records) return []
    const records = [...list.records]
    if (activeSort === "added_date_asc") {
      return records.reverse()
    }
    return records
  }, [list, activeSort])

  // TO DO: caching...
  useEffect(() => {
    const fetchBibData = async () => {
      if (!list || sortedRecords.length === 0) return
      setIsLoading(true)

      const isLocalSort = activeSort.includes("added_date")
      const startIndex = (currentPage - 1) * LIST_RECORDS_PER_PAGE
      const endIndex = startIndex + LIST_RECORDS_PER_PAGE

      // If sorting by title/author, fetch ALL records so the Discovery API can sort globally
      // otherwise: sorting by date added, only need to fetch the 20 records for the current page
      const recordsToFetch = isLocalSort
        ? sortedRecords.slice(startIndex, endIndex)
        : sortedRecords

      const uris = recordsToFetch.map((r) => r.uri).join(",")

      try {
        const sortParam = isLocalSort ? "" : `&sort=${activeSort}`
        const response = await fetch(
          `${BASE_URL}/api/account/lists/records?uris=${uris}${sortParam}`
        )
        const data = await response.json()
        if (data.bibData) {
          let updatedRecords = buildListRecords(
            data.bibData,
            recordsToFetch,
            activeSort
          )

          // slice out the current page to display if global fetch
          if (!isLocalSort) {
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
      "Manage",
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
      <Flex mt="m" mb="xs" alignItems="center" justifyContent="space-between">
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
        <ListSort
          ref={sortMenuRef}
          selectedValue={activeSort}
          sortOptions={listSortOptions}
          handleSortChange={handleSortChange}
        />
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
              { width: "auto", minWidth: 120 },
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
