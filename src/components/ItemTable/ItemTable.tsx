import { Table } from "@nypl/design-system-react-components"

import type ItemTableData from "../../models/ItemTableData"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays the Item info, StatusLinks, and RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  console.log(itemTableData.isBibPage)
  return (
    <Table
      columnHeaders={itemTableData.tableHeadings}
      tableData={itemTableData.tableData}
    >
      Items
    </Table>
  )
}

export default ItemTable
