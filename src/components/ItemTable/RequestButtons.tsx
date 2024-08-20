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
    <Box sx={{ a: { marginRight: "xs" } }}>
      {item.aeonUrl ? (
        <ExternalLink
          href={item.aeonUrl}
          type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, ${item.requestTitle}`}
          disabled={!item.isAvailable}
          mb="s"
          target="_self"
        >
          Request Appointment
        </ExternalLink>
      ) : (
        <>
          {item.isPhysicallyRequestable && (
            <RCLink
              href={`/hold/request/${item.bibId}-${item.id}`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request for On-site Use, ${item.requestTitle}`}
              disabled={!item.isAvailable}
              mb="s"
              target="_self"
            >
              Request for On-site Use
            </RCLink>
          )}
          {item.isEDDRequestable && (
            <RCLink
              href={`/hold/request/${item.bibId}-${item.id}/edd`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request Scan, ${item.requestTitle}`}
              disabled={!item.isAvailable}
              mb="s"
              target="_self"
            >
              Request Scan
            </RCLink>
          )}
        </>
      )}
    </Box>
  )
}

export default RequestButtons
