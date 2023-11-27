import { Table } from "@nypl/design-system-react-components"

import type ItemTableData from "../../models/ItemTableData"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays the Item info, StatusLinks, and RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  return (
    <Table
      __css={{ "table-layout": "fixed", width: "full" }}
      columnHeaders={itemTableData.tableHeadings}
      tableData={itemTableData.tableData}
    />
  )
}

export default ItemTable
