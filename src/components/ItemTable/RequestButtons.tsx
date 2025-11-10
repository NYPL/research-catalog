import { Box } from "@nypl/design-system-react-components"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import RCLink from "../Links/RCLink/RCLink"

import type Item from "../../models/Item"

interface RequestButtonsProps {
  item: Item
}

/**
 * The StatusLinks component appears in the Item Table
 * TODO: Pass search keywords to links as ?searchKeywords=${"TODO"}
 */
const RequestButtons = ({ item }: RequestButtonsProps) => {
  if (item.allLocationsClosed) return null
  return (
    <Box sx={{ a: { marginRight: "xs" } }} className="no-print">
      {item.aeonUrl && (
        <ExternalLink
          href={item.aeonUrl}
          variant={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, ${item.requestButtonAriaLabel}`}
          disabled={!item.isAvailable}
          mb="s"
          target="_self"
        >
          Request appointment
        </ExternalLink>
      )}

      {item.isPhysicallyRequestable && (
        <RCLink
          href={`/hold/request/${item.bibId}-${item.id}`}
          variant={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request for onsite use, ${item.requestButtonAriaLabel}`}
          disabled={!item.isAvailable}
          mb="s"
          target="_self"
        >
          Request for onsite use
        </RCLink>
      )}
      {item.isEDDRequestable && (
        <RCLink
          href={`/hold/request/${item.bibId}-${item.id}/edd`}
          variant={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Scan, ${item.requestButtonAriaLabel}`}
          disabled={!item.isAvailable}
          mb="s"
          target="_self"
        >
          Request scan
        </RCLink>
      )}
    </Box>
  )
}

export default RequestButtons
