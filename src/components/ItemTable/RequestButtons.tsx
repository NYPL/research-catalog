import { Box } from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"

import { BASE_URL } from "../../config/constants"
import type Item from "../../models/Item"

interface RequestButtonsProps {
  item: Item
}

/**
 * The StatusLinks component appears in the Item Table
 * TODO: Pass search keywords to links
 */
const RequestButtons = ({ item }: RequestButtonsProps) => {
  return (
    <Box sx={{ a: { marginRight: "xs", marginBottom: "xs" } }} mb="xs">
      {item.aeonUrl ? (
        <RCLink
          href={item.aeonUrl}
          type="buttonSecondary"
          // onClick={TODO: Add ifAvailableHandler handler}
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
              type="buttonSecondary"
              // onClick={TODO: Add ifAvailableHandler handler}
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
              type="buttonSecondary"
              // onClick={TODO: Add ifAvailableHandler handler}
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
