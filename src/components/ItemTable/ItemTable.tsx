import { Table } from "@nypl/design-system-react-components"

import type ItemTableData from "../../models/ItemTableData"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays the Item info, StatusLinks, and RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  console.log(itemTableData)
  return (
    <Table columnHeaders={[]} tableData={[["test", "test2"]]}>
      Items
    </Table>
  )
}

export default ItemTable
