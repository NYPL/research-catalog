import { Flex } from "@nypl/design-system-react-components"

import RequestButtons from "./RequestButtons"
import ItemAvailability from "./ItemAvailability"
import type Item from "../../models/Item"

interface AvailabilityLinksProps {
  item: Item
}

/**
 * The AvailabilityLinks component renders the RequestButtons and ItemAvailability for a given Item
 */
const AvailabilityLinks = ({ item }: AvailabilityLinksProps) => {
  return (
    <Flex flexDir="column" gap="s">
      <RequestButtons item={item} />
      <ItemAvailability item={item} />
    </Flex>
  )
}

export default AvailabilityLinks
