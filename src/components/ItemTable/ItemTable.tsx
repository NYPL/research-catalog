import { Box, Table } from "@nypl/design-system-react-components"

import type ItemTableData from "../../models/ItemTableData"
import RequestButtons from "./RequestButtons"
import ItemAvailability from "./ItemAvailability"

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
        columnHeaders={itemTableData.tableHeadings}
        tableData={itemTableData.tableData}
        mb="s"
        sx={{
          tableLayout: "fixed",
          width: "full",
          tr: { border: "0 !important", padding: 0 },
          "th, td, th > span, td > span": {
            paddingTop: "xs",
            paddingBottom: "xs",
          },
        }}
      />
      {!itemTableData.isBibPage && (
        <Box mb="s">
          <RequestButtons item={itemTableData.items[0]} />
          <ItemAvailability item={itemTableData.items[0]} />
        </Box>
      )}
    </>
  )
}

export default ItemTable
