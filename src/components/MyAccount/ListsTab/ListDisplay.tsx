import { useContext, useRef, useState, useEffect } from "react"
import {
  Box,
  Flex,
  Heading,
  Icon,
  Pagination,
  SkeletonLoader,
  Table,
  Text,
} from "@nypl/design-system-react-components"
import { PatronDataContext } from "../../../context/PatronDataContext"
import styles from "../../../../styles/components/MyAccount.module.scss"
import Link from "../../Link/Link"
import type List from "../../../models/List"
import { useRouter } from "next/router"
import { idConstants, useFocusContext } from "../../../context/FocusContext"
import { BASE_URL } from "../../../config/constants"
import {
  LIST_RECORDS_PER_PAGE,
  listResultsHeading,
  listSortOptions,
} from "../../../utils/listUtils"
import ListRecord from "../../../models/ListRecord"
import ListSort from "./ListSort"
import ListOptions from "./ListOptions"
import EmptyList from "./EmptyList"

const ListDisplay = ({ list }: { list?: List }) => {
  // Maybe..
  const {
    updatedAccountData: { lists: listResults, patron },
  } = useContext(PatronDataContext)

  const router = useRouter()
  const listRecordsHeadingRef = useRef(null)

  const [listRecords, setListRecords] = useState<ListRecord[]>(
    list?.records || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchBibs = async () => {
      if (!list || list.records.length === 0) return
      setIsLoading(true)

      const startIndex = (currentPage - 1) * LIST_RECORDS_PER_PAGE
      const endIndex = startIndex + LIST_RECORDS_PER_PAGE
      const pageRecords = list.records.slice(startIndex, endIndex)

      const uris = pageRecords.map((r) => r.uri).join(",")
      try {
        const response = await fetch(
          `${BASE_URL}/api/account/lists/records?uris=${uris}`
        )
        const data = await response.json()
        if (data.bibData) {
          const bibDataMap = data.bibData.reduce((acc: any, bib: any) => {
            const bibResult = bib.result
            const uri =
              bibResult.uri ||
              (bibResult["@id"] ? bibResult["@id"].substring(4) : "")
            acc[uri] = bibResult
            return acc
          }, {})
          const updatedRecords = pageRecords.map((record) => {
            const bibData = bibDataMap[record.uri]
            if (bibData) {
              const updated = new ListRecord(
                {
                  uri: record.uri,
                  addedToListDate: new Date().toISOString(),
                } as any,
                bibData
              )
              updated.addedDate = record.addedDate
              return updated
            }
            return record
          })
          setListRecords(updatedRecords)
        }
      } catch (error) {
        console.error("Error fetching bib data for list:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBibs()
  }, [list, currentPage])

  const separatingDot = (i) => (
    // @ts-ignore
    <Icon key={`dot-${i}`} size="xxsmall" ml="xs" mr="xs" pb="xxs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="4"
        viewBox="0 0 4 4"
        fill="#000"
      >
        <circle cx="2" cy="2" r="2" fill="#000" />
      </svg>
    </Icon>
  )
  const metadata = [
    `${list.recordCount} record${list.records.length === 1 ? "" : "s"}`,
    `Last modified on ${list.modifiedDate}`,
    `Created on ${list.createdDate}`,
  ].filter(Boolean)

  const joinedMetadata = metadata.reduce((acc, piece, i) => {
    if (i > 0) acc.push(separatingDot(i))
    acc.push(<Text key={i}>{piece}</Text>)
    return acc
  }, [])

  const { setPersistentFocus } = useFocusContext()
  const sortMenuRef = useRef<HTMLDivElement | null>(null)
  const [activeSort, setActiveSort] = useState("added_date_desc")

  const handleSortChange = async (selectedSortOption: string) => {
    try {
      //uhh
    } catch (error) {
      console.error("Error sorting lists:", error)
    }
    setActiveSort(selectedSortOption)
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
      maxWidth="900px"
      contentSize={5}
      showHeading={false}
    />
  )

  return (
    <Flex flexDir="column">
      <Box mt="l" mb="l">
        <Link
          isUnderlined={false}
          href="/account/lists"
          onClick={(e: any) => {
            e.preventDefault()
            setPersistentFocus(null)
            router.push("/account/lists", undefined, { shallow: true })
          }}
        >
          <Icon
            iconRotation="rotate90"
            name="arrow"
            size="xsmall"
            align="right"
            color="ui.link.primary"
          />
          <Box as="span" ml="xs" fontSize="14px">
            Back to all lists
          </Box>
        </Link>
      </Box>
      <Flex flexDir="column">
        <Heading level="h2" size="heading3">
          {list.listName}
        </Heading>
        <Box
          mt="xs"
          sx={{
            p: {
              display: "inline-block",
            },
          }}
        >
          {joinedMetadata}
        </Box>
        {list.description ? (
          <Box as="span" mt="m">
            {list.description}
          </Box>
        ) : (
          <Box as="span" mt="m" color="ui.gray.dark" fontStyle="italic">
            No description
          </Box>
        )}
        <ListOptions />
      </Flex>
      {list.records.length > 0 ? (
        <>
          <Flex
            mt="m"
            mb="xs"
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
              {list.records.length > LIST_RECORDS_PER_PAGE && (
                <Pagination
                  id="list-records-pagination"
                  mt="l"
                  initialPage={currentPage}
                  currentPage={currentPage}
                  pageCount={Math.ceil(
                    list.records.length / LIST_RECORDS_PER_PAGE
                  )}
                  onPageChange={handlePageChange}
                />
              )}
            </Box>
          )}
        </>
      ) : (
        <EmptyList />
      )}
    </Flex>
  )
}

export default ListDisplay
