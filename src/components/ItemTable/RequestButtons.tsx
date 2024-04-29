import { Box } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import RCLink from "../Links/RCLink/RCLink"
import type Item from "../../models/Item"
import { useSearchParamsContext } from "../../context/SearchParamsContext"

interface RequestButtonsProps {
  item: Item
}

/**
 * The StatusLinks component appears in the Item Table
 */
const RequestButtons = ({ item }: RequestButtonsProps) => {
  const { searchParams } = useSearchParamsContext()
  const searchKeywordsParam = searchParams
    ? `?searchKeywords=${searchParams}`
    : ""

  if (item.allLocationsClosed) return null

  return (
    <Box sx={{ a: { marginRight: "xs" } }}>
      {item.aeonUrl ? (
        <ExternalLink
          href={item.aeonUrl}
          type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
          aria-label={`Request Appointment, ${item.bibTitle}`}
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
              href={`/hold/request/${item.bibId}-${item.id}${searchKeywordsParam}`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request for On-site Use, ${item.bibTitle}`}
              disabled={!item.isAvailable}
              mb="s"
              target="_self"
            >
              Request for On-site Use
            </RCLink>
          )}
          {item.isEDDRequestable && (
            <RCLink
              href={`/hold/request/${item.bibId}-${item.id}/edd${searchKeywordsParam}`}
              type={!item.isAvailable ? "buttonDisabled" : "buttonSecondary"}
              aria-label={`Request Scan, ${item.bibTitle}`}
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
