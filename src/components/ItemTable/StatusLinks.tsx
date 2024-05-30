import { Box } from "@nypl/design-system-react-components"

import RequestButtons from "./RequestButtons"
import ItemAvailability from "./ItemAvailability"
import type Item from "../../models/Item"

interface StatusLinksProps {
  item: Item
}

/**
 * The StatusLinks component renders the RequestButtons and AvailabilityLinks for a given Item
 */
const ItemTable = ({ item }: StatusLinksProps) => {
  return (
    <Box>
      <RequestButtons item={item} />
      <ItemAvailability item={item} />
    </Box>
  )
}

export default ItemTable
