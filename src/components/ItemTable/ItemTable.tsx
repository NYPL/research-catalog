import { Box, Table } from "@nypl/design-system-react-components"

import type ItemTableData from "../../models/ItemTableData"
import RequestButtons from "./RequestButtons"
import ItemAvailability from "./ItemAvailability"
import styles from "../../../styles/components/ItemTable.module.scss"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays item details, the RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  return (
    <Box>
      <Table
        className={styles.itemTable}
        columnHeaders={itemTableData.tableHeadings}
        tableData={itemTableData.tableData}
        mt={{ base: 0, md: "s" }}
        mb={0}
      />
      {!itemTableData.isBibPage && (
        <Box>
          <RequestButtons item={itemTableData.items[0]} />
          <ItemAvailability item={itemTableData.items[0]} />
        </Box>
      )}
    </Box>
  )
}

export default ItemTable
