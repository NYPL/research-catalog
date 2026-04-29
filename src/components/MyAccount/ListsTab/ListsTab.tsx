import { useContext, useRef, useState, useEffect } from "react"
import { Box, Flex, Table } from "@nypl/design-system-react-components"
import { PatronDataContext } from "../../../context/PatronDataContext"
import styles from "../../../../styles/components/MyAccount.module.scss"
import List from "../../../models/List"
import Link from "../../Link/Link"
import ListsSort from "./ListsSort"
import { idConstants, useFocusContext } from "../../../context/FocusContext"
import { listSortOptions } from "../../../utils/listUtils"
import CreateListButton from "./CreateListButton"
import ListOptionsModal from "./ListOptionsModal"

const ListsTab = () => {
  const {
    updatedAccountData: { lists: listResults, patron },
  } = useContext(PatronDataContext)

  const [lists, setLists] = useState(
    listResults.map((list: any) => new List(list))
  )

  // Keep local lists in sync
  useEffect(() => {
    setLists(listResults.map((list: any) => new List(list)))
  }, [listResults])

  const tableData = lists.map((list: List) => [
    <Link isUnderlined={false} href={`/account/lists/${list.id}`} key={list.id}>
      {list.listName}
    </Link>,
    list.description || (
      <Box as="span" color="ui.gray.dark" fontStyle="italic">
        No description
      </Box>
    ),
    list.recordCount,
    list.createdDate,
    list.modifiedDate,
    <ListOptionsModal key={list.id} list={list} />,
  ])

  const { setPersistentFocus } = useFocusContext()
  const sortMenuRef = useRef<HTMLDivElement | null>(null)
  const [activeSort, setActiveSort] = useState("modified_date_desc")

  const handleSortChange = async (selectedSortOption: string) => {
    try {
      const response = await fetch(
        `/api/account/lists?patronId=${patron.id}&sort=${selectedSortOption}`
      )
      if (response.ok) {
        const data = await response.json()
        setLists(data.lists.map((list: any) => new List(list)))
      }
    } catch (error) {
      console.error("Error sorting lists:", error)
    }
    setActiveSort(selectedSortOption)
    setPersistentFocus(idConstants.listsSort)
  }

  return (
    <Flex flexDir="column">
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        mt="m"
        mb="m"
        gap="xs"
      >
        <CreateListButton />
        <ListsSort
          ref={sortMenuRef}
          selectedValue={activeSort}
          sortOptions={listSortOptions}
          handleSortChange={handleSortChange}
        />
      </Flex>
      <Box display="grid">
        <Table
          className={styles.listTable}
          columnHeaders={[
            "List name",
            "List description",
            "Records",
            "Date created",
            "Date modified",
            "Action",
          ]}
          columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
          columnStyles={[
            { width: 320, minWidth: 240 },
            { width: "auto", minWidth: 240 },
            { width: 160, minWidth: 120 },
            { width: 160, minWidth: 120 },
            { width: 160, minWidth: 120 },
            { width: 120, minWidth: 128 },
          ]}
          tableData={tableData}
          isScrollable
          showRowDividers
          my={{ base: 0, md: "s" }}
          data-testid="list-table"
        />
      </Box>
    </Flex>
  )
}

export default ListsTab
