import { Table } from "@nypl/design-system-react-components"

import StatusLinks from "./StatusLinks"
import type ItemTableData from "../../models/ItemTableData"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays the Item info, StatusLinks, and RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  return (
    <>
      <Table
        __css={{ tableLayout: "fixed", width: "full" }}
        columnHeaders={itemTableData.tableHeadings}
        tableData={itemTableData.tableData}
        mb="s"
      />
      {!itemTableData.isBibPage && (
        <StatusLinks item={itemTableData.items[0]} />
      )}
    </>
  )
}

export default ItemTable
