import { Box, Table } from "@nypl/design-system-react-components"

import type ItemTableData from "../../models/ItemTableData"
import StatusLinks from "./StatusLinks"
import styles from "../../../styles/components/ItemTable.module.scss"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays item details, the RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  const { tableHeadings, tableData, items, inSearchResult } = itemTableData

  return (
    // Display as grid to prevent bug where the outer container stretches to the Table's width on mobile
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
          !inSearchResult
            ? "bib-details-item-table"
            : "search-results-item-table"
        }
      />
      {inSearchResult && <StatusLinks item={items[0]} />}
    </Box>
  )
}

export default ItemTable
