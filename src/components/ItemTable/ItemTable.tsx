import { Table } from "@nypl/design-system-react-components"

import RequestButtons from "./RequestButtons"
import type ItemTableData from "../../models/ItemTableData"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays item details, the RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  return (
    <>
      <Table
        sx={{
          tableLayout: "fixed",
          width: "full",
          tr: { border: "0 !important" },
        }}
        columnHeaders={itemTableData.tableHeadings}
        tableData={itemTableData.tableData}
        mb="s"
      />
      {!itemTableData.isBibPage && (
        <RequestButtons item={itemTableData.items[0]} />
      )}
    </>
  )
}

export default ItemTable
