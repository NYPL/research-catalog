import { Box, Table } from "@nypl/design-system-react-components"
import type ItemTableData from "../../models/ItemTableData"
import styles from "../../../styles/components/ItemTable.module.scss"
import { handleTableCopy } from "../../utils/appUtils"

interface ItemTableProps {
  itemTableData: ItemTableData
}

/**
 * The ItemTable displays item details and the request buttons
 */
const ItemTable = ({ itemTableData }: ItemTableProps) => {
  const { tableHeadings, tableData, inSearchResult } = itemTableData

  return (
    // Display as grid to prevent bug where the outer container stretches to the Table's width on mobile
    <Box display="grid">
      <Table
        onCopy={(e) => handleTableCopy(e, "\t")}
        className={`${styles.itemTable} itemTable`}
        columnHeaders={tableHeadings}
        columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
        fontSize="body2"
        columnStyles={
          inSearchResult
            ? [
                { width: 272, minWidth: 85 },
                { width: 272, minWidth: 85 },
              ]
            : [
                { width: "auto", minWidth: 250 },
                { width: "17%", minWidth: 100 },
                { width: "17%", minWidth: 100 },
                { width: "17%", minWidth: 100 },
                { width: "17%", minWidth: 100 },
              ]
        }
        tableData={tableData}
        isScrollable
        showRowDividers
        my={{ base: 0, md: "s" }}
        data-testid="bib-details-item-table"
        ref={(el: HTMLTableElement | null) => {
          // Do not translate "call number" column header
          el?.querySelectorAll("th").forEach((th) => {
            if (th.textContent?.trim() === "Call number") {
              th.setAttribute("translate", "no")
            }
          })
          // Do not translate any cells except the status (first) column
          el?.querySelectorAll("tbody td:not(:first-child)").forEach((td) =>
            td.setAttribute("translate", "no")
          )
        }}
      />
    </Box>
  )
}

export default ItemTable
