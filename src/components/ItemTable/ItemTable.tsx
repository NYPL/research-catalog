import { Table, useNYPLBreakpoints } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import type Item from "../../models/Item"
import { getActivePage } from "../../utils/appUtils"
import { getItemTableHeadings } from "../../utils/itemUtils"

interface ItemTableProps {
  items: Item[]
  isArchiveCollection?: boolean
}

/**
 * The ItemTable displays the Item info, StatusLinks, and RequestButtons
 */
const ItemTable = ({ items, isArchiveCollection = false }: ItemTableProps) => {
  const { pathname } = useRouter()
  const isBibPage = getActivePage(pathname) === "bib"
  const { isLargerThanLarge: isDesktop } = useNYPLBreakpoints()
  const includeVolColumn = items.some((item) => item.volume) && isBibPage

  const tableHeadings = getItemTableHeadings(
    isDesktop,
    isBibPage,
    isArchiveCollection,
    includeVolColumn
  )
  console.log(items)
  return (
    <Table columnHeaders={tableHeadings} tableData={[["test", "test2"]]}>
      Items
    </Table>
  )
}

export default ItemTable
