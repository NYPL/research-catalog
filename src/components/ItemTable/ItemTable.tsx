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
    <>
      <Table
        className={styles.itemTable}
        columnHeaders={itemTableData.tableHeadings}
        tableData={itemTableData.tableData}
        my={{ base: 0, md: "l" }}
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
