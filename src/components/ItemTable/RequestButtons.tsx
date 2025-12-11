import { Box } from "@nypl/design-system-react-components"
import Link from "../Link/Link"

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
        <Link
          isExternal
          href={item.aeonUrl}
          variant={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, ${item.requestButtonAriaLabel}`}
          disabled={!item.isAvailable}
          mb="s"
          target="_self"
        >
          Request appointment
        </Link>
      )}

      {item.isPhysicallyRequestable && (
        <Link
          href={`/hold/request/${item.bibId}-${item.id}`}
          variant={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request for onsite use, ${item.requestButtonAriaLabel}`}
          disabled={!item.isAvailable}
          mb="s"
        >
          Request for onsite use
        </Link>
      )}
      {item.isEDDRequestable && (
        <Link
          href={`/hold/request/${item.bibId}-${item.id}/edd`}
          variant={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Scan, ${item.requestButtonAriaLabel}`}
          disabled={!item.isAvailable}
          mb="s"
        >
          Request scan
        </Link>
      )}
    </Box>
  )
}

export default RequestButtons
