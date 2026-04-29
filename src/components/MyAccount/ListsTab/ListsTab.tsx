import { useContext } from "react"
import { Box, Table } from "@nypl/design-system-react-components"
import { PatronDataContext } from "../../../context/PatronDataContext"
import styles from "../../../../styles/components/MyAccount.module.scss"
import List from "../../../models/List"
import Link from "../../Link/Link"

const ListsTab = () => {
  const {
    updatedAccountData: { lists: listResults },
  } = useContext(PatronDataContext)
  const lists = listResults.map((list: any) => new List(list))
  const tableData = lists.map((list: List) => [
    <Link href={`/account/lists/${list.id}`} key={list.id}>
      {list.listName}
    </Link>,
    list.description || (
      <span style={{ color: "ui.gray.dark !important", fontStyle: "italic" }}>
        No description
      </span>
    ),
    list.records?.length || 0,
    list.createdDate ? new Date(list.createdDate).toLocaleDateString() : "",
    list.modifiedDate ? new Date(list.modifiedDate).toLocaleDateString() : "",
    "Actions...",
  ])

  return (
    // Display as grid to prevent bug where the outer container stretches to the Table's width on mobile
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
        fontSize="body2"
        columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
        columnStyles={[
          { width: "auto", minWidth: 250 },
          { width: "auto", minWidth: 250 },
          { width: "17%", minWidth: 100 },
          { width: "17%", minWidth: 100 },
          { width: "17%", minWidth: 100 },
          { width: "17%", minWidth: 100 },
        ]}
        tableData={tableData}
        isScrollable
        showRowDividers
        my={{ base: 0, md: "s" }}
        data-testid="list-table"
      />
    </Box>
  )
}

export default ListsTab
