import { Box, Table } from "@nypl/design-system-react-components"
import classNames from "classnames/bind"

import type ItemTableData from "../../models/ItemTableData"
import StatusLinks from "./StatusLinks"
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
      {isSearchResult && <StatusLinks item={items[0]} />}
    </Box>
  )
}

export default ItemTable
