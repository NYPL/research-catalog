import { Box, Table } from "@nypl/design-system-react-components"
import StatusLinks from "./StatusLinks"
import styles from "../../../styles/components/ItemTable.module.scss"
import type { ReactElement } from "react"
import type Item from "../../models/Item"

type ItemTableProps = {
  itemTableData: {
    items: Item[]
    tableHeadings: string[]
    tableData: ReactElement[][]
  }
  inSearchResult: boolean
}

/**
 * The ItemTable displays item details, the RequestButtons
 */
const ItemTable = ({ itemTableData, inSearchResult }: ItemTableProps) => {
  const { tableHeadings, tableData, items } = itemTableData

  return (
    <Box display="grid">
      <Table
        className={`${styles.itemTable}${
          inSearchResult ? " " + styles.inSearchResult : ""
        }`}
        columnHeaders={tableHeadings}
        tableTextSize="body2"
        columnStyles={
          inSearchResult
            ? [
                { width: 272, minWidth: 85 },
                { width: 272, minWidth: 85 },
                { width: 272, minWidth: 85 },
              ]
            : [
                { width: "auto", minWidth: 250 },
                { width: "14%", minWidth: 100 },
                { width: "14%", minWidth: 100 },
                { width: "14%", minWidth: 100 },
                { width: "14%", minWidth: 100 },
                { width: "14%", minWidth: 100 },
              ]
        }
        tableData={tableData}
        showRowDividers={!inSearchResult}
        isScrollable={true}
        my={{ base: inSearchResult ? "s" : 0, md: "s" }}
        data-testid={
          inSearchResult
            ? "search-results-item-table"
            : "bib-details-item-table"
        }
      />
      {inSearchResult && <StatusLinks item={items[0]} />}
    </Box>
  )
}

export default ItemTable
