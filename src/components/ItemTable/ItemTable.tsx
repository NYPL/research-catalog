import {
  Box,
  Table,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"

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
  const { isLargerThanMobile } = useNYPLBreakpoints()

  return (
    // Display as grid to prevent bug where the outer container stretches to the Table's width on mobile
    <Box display="grid">
      <Table
        className={`${styles.itemTable}${
          inSearchResult ? " " + styles.inSearchResult : ""
        }`}
        columnHeaders={tableHeadings}
        // TODO: Review these values with the design team
        columnStyles={
          inSearchResult
            ? [
                { width: "33.3%", minWidth: 150, maxWidth: 250 },
                { width: "33.3%", minWidth: 150, maxWidth: 250 },
                { width: "33.3%", minWidth: 150, maxWidth: 250 },
              ]
            : [
                { minWidth: 350, maxWidth: 350 },
                { minWidth: 150, maxWidth: 200 },
                { minWidth: 150, maxWidth: 150 },
                { minWidth: 150, maxWidth: 150 },
                { minWidth: 200, maxWidth: 250 },
                { minWidth: 150, maxWidth: 200 },
              ]
        }
        tableData={tableData}
        showRowDividers={!inSearchResult}
        isScrollable={!isLargerThanMobile}
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
