import RequestButtons from "./RequestButtons"
import type Item from "../../models/Item"

interface StatusLinksProps {
  item: Item
}

/**
 * The StatusLinks component appears in the Item Table on the Bib Page, or beneath it
 * in the Search Results
 *
 * It displays the Request Buttons and Information Links
 */
const StatusLinks = ({ item }: StatusLinksProps) => {
  return (
    <>
      <RequestButtons item={item} />
    </>
  )
}

export default StatusLinks
