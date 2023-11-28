import { Box } from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"

import { BASE_URL } from "../../config/constants"
import type Item from "../../models/Item"

interface RequestButtonsProps {
  item: Item
}

/**
 * The StatusLinks component appears in the Item Table
 */
const RequestButtons = ({ item }: RequestButtonsProps) => {
  return (
    <Box __css={{ a: { marginRight: "xs" } }}>
      <RCLink
        href={`${BASE_URL}/hold/request/${item.bibId}-${item.id}`}
        type="buttonSecondary"
      >
        Test
      </RCLink>
      <RCLink href="test2" type="buttonSecondary">
        Test2
      </RCLink>
    </Box>
  )
}

export default RequestButtons
