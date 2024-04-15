import { Box } from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"

import type Item from "../../models/Item"

interface RequestButtonsProps {
  item: Item
}

/**
 * The StatusLinks component appears in the Item Table
 * TODO: Pass search keywords to links
 */
const RequestButtons = ({ item }: RequestButtonsProps) => {
  if (item.allLocationsClosed) return null
  return (
    <Box sx={{ a: { marginRight: "xs" } }} mb="s">
      {item.aeonUrl ? (
        <RCLink
          href={item.aeonUrl}
          type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, ${item.bibTitle}`}
          disabled={!item.isAvailable}
        >
          Request Appointment
        </RCLink>
      ) : (
        <>
          {item.isPhysicallyRequestable && (
            <RCLink
              href={`/hold/request/${item.bibId}-${
                item.id
              }?searchKeywords=${"TODO"}`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request for On-site Use, ${item.bibTitle}`}
              disabled={!item.isAvailable}
            >
              Request for On-site Use
            </RCLink>
          )}
          {item.isEDDRequestable && (
            <RCLink
              href={`/hold/request/${item.bibId}-${
                item.id
              }/edd?searchKeywords=${"TODO"}`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request Scan, ${item.bibTitle}`}
              disabled={!item.isAvailable}
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
