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
    <Box>
      <Table
        className={`${styles.itemTable}${
          inSearchResult ? " " + styles.inSearchResult : ""
        }`}
        columnHeaders={tableHeadings}
        tableData={tableData}
        showRowDividers={!inSearchResult}
        my={{ base: 0, md: "s" }}
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
