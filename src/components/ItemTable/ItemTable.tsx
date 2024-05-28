import { Box, Table } from "@nypl/design-system-react-components"
import classNames from "classnames/bind"

import type ItemTableData from "../../models/ItemTableData"
import RequestButtons from "./RequestButtons"
import ItemAvailability from "./ItemAvailability"
import styles from "../../../styles/components/ItemTable.module.scss"

const cx = classNames.bind(styles)

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays item details, the RequestButtons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  const { tableHeadings, tableData, items, isBibPage } = itemTableData
  const isSearchResult = !isBibPage

  return (
    <Box>
      <Table
        className={cx({
          itemTable: true,
          isSearchResult,
        })}
        columnHeaders={tableHeadings}
        tableData={tableData}
        showRowDividers={!isSearchResult}
        my={{ base: 0, md: "s" }}
      />
      {isSearchResult && (
        <Box>
          <RequestButtons item={items[0]} />
          <ItemAvailability item={items[0]} />
        </Box>
      )}
    </Box>
  )
}

export default ItemTable
