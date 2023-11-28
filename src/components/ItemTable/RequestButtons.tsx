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
    <Box sx={{ a: { marginRight: "xs", marginBottom: "xs" } }} mb="xs">
      <RCLink
        href={`${BASE_URL}/hold/request/${item.bibId}-${item.id}`}
        type="buttonSecondary"
      >
        Request for On-site Use
      </RCLink>
      <RCLink href="test2" type="buttonSecondary">
        Request Scan
      </RCLink>
    </Box>
  )
}

export default RequestButtons
