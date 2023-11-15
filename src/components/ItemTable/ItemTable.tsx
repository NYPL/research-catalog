import type Item from "../../models/Item"
import { getActivePage } from "../../utils/appUtils"
import { useRouter } from "next/router"

interface ItemTableProps {
  items: Item[]
}

/**
 * The ItemTable displays the Item info, StatusLinks, and RequestButtons
 */
const ItemTable = ({ items }: ItemTableProps) => {
  const { pathname } = useRouter()
  const activePage = getActivePage(pathname)
  console.log(activePage)
  console.log(items)
  return <div>Items</div>
}

export default ItemTable
