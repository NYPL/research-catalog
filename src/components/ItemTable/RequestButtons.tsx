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
    <Box sx={{ a: { marginRight: "xs", marginBottom: "xs" } }} mb="s">
      {item.aeonUrl ? (
        <RCLink
          href={item.aeonUrl}
          type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, Call Number: ${item.callNumber}`}
          aria-disabled={!item.isAvailable}
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
              aria-label={`Request for On-site Use, Call Number: ${item.callNumber}`}
              aria-disabled={!item.isAvailable}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
            >
              Request for On-site Use
            </RCLink>
          )}
          {item.isEDDRequestable && (
            <RCLink
              href={`/hold/request/${item.bibId}-${
                item.id
              }/edd?searchKeywords=${"TODO"}`}
              aria-label={`Request Scan, Call Number: ${item.callNumber}`}
              aria-disabled={!item.isAvailable}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
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
