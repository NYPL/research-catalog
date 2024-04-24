import { Box } from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"

import type Item from "../../models/Item"
import { BASE_URL } from "../../config/constants"

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
        <RCLink
          href={item.aeonUrl}
          type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, ${item.bibTitle}`}
          disabled={!item.isAvailable}
          mb="s"
        >
          Request Appointment
        </RCLink>
      ) : (
        <>
          {item.isPhysicallyRequestable && (
            <RCLink
              href={`${BASE_URL}/hold/request/${item.bibId}-${item.id}`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request for On-site Use, ${item.bibTitle}`}
              disabled={!item.isAvailable}
              mb="s"
            >
              Request for On-site Use
            </RCLink>
          )}
          {item.isEDDRequestable && (
            <RCLink
              href={`${BASE_URL}/hold/request/${item.bibId}-${item.id}/edd`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request Scan, ${item.bibTitle}`}
              disabled={!item.isAvailable}
              mb="s"
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
