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
        mt="s"
        mb="s"
        sx={{
          width: "unset",
          thead: { mb: "xs" },
          tr: { border: "0 !important" },
          "th, td": {
            width: "240px",
            padding: "0",
            marginRight: "32px",
          },
          "th, td, th > span, td > span": {
            paddingTop: "0",
            paddingBottom: "0",
          },
        }}
      />
      {!itemTableData.isBibPage && (
        <Box>
          <RequestButtons item={itemTableData.items[0]} />
          <ItemAvailability item={itemTableData.items[0]} />
        </Box>
      )}
    </>
  )
}

export default ItemTable
