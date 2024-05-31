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

  return (
    <Box>
      <Table
        className={cx({
          itemTable: true,
          isSearchResult: !isBibPage,
        })}
        columnHeaders={tableHeadings}
        tableData={tableData}
        showRowDividers={isBibPage}
        my={{ base: 0, md: "s" }}
        data-testid={
          isBibPage ? "bib-details-item-table" : "search-results-item-table"
        }
      />
      {!isBibPage && <StatusLinks item={items[0]} />}
    </Box>
  )
}

export default ItemTable
