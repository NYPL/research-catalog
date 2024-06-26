import { Box } from "@nypl/design-system-react-components"

import RequestButtons from "./RequestButtons"
import ItemAvailability from "./ItemAvailability"
import type Item from "../../models/Item"

interface StatusLinksProps {
  item: Item
}

/**
 * The StatusLinks component renders the RequestButtons and ItemAvailability for a given Item
 */
const StatusLinks = ({ item }: StatusLinksProps) => {
  return (
    <Box>
      <RequestButtons item={item} />
      <ItemAvailability item={item} />
    </Box>
  )
}

export default StatusLinks
