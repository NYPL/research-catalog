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
          href={item.isAvailable ? item.aeonUrl : null}
          type={item.isAvailable ? "buttonSecondary" : "buttonDisabled"}
          aria-label={`Request Appointment, ${item.bibTitle}`}
        >
          Request Appointment
        </RCLink>
      ) : (
        <>
          {item.isPhysicallyRequestable && (
            <RCLink
              href={
                item.isAvailable
                  ? `/hold/request/${item.bibId}-${
                      item.id
                    }?searchKeywords=${"TODO"}`
                  : null
              }
              type={item.isAvailable ? "buttonSecondary" : "buttonDisabled"}
              aria-label={`Request for On-site Use, ${item.bibTitle}`}
            >
              Request for On-site Use
            </RCLink>
          )}
          {item.isEDDRequestable && (
            <RCLink
              href={
                item.isAvailable
                  ? `/hold/request/${item.bibId}-${
                      item.id
                    }/edd?searchKeywords=${"TODO"}`
                  : null
              }
              type={item.isAvailable ? "buttonSecondary" : "buttonDisabled"}
              aria-label={`Request Scan, ${item.bibTitle}`}
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
