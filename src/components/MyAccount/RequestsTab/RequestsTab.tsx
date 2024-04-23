import { Box, StatusBadge, Text } from "@nypl/design-system-react-components"

import ExternalLink from "../../Links/ExternalLink/ExternalLink"
import type { Hold, Patron } from "../../../types/myAccountTypes"
import ItemsTab from "../ItemsTab"
import CancelButton from "./CancelButton"
import FreezeButton from "./FreezeButton"

const RequestsTab = ({
  removeHold,
  holds,
  patron,
}: {
  removeHold
  holds: Hold[]
  patron: Patron
}) => {
  function formatTitleElement(hold: Hold) {
    // If item is research/circ
    if (hold.catalogHref) {
      return <ExternalLink href={hold.catalogHref}>{hold.title}</ExternalLink>
    } else {
      // Item is a partner record
      return <Text>{hold.title}</Text>
    }
  }
  const holdsHeaders = [
    "Title",
    "Status",
    "Pickup location",
    "Pickup by",
    "Manage request",
  ]

  const holdsData = holds.map((hold) => [
    formatTitleElement(hold),
    getStatusBadge(hold.status),
    hold.pickupLocation.name,
    hold.pickupByDate,
    /* Passing removeHold() down to the Cancel button so it can remove the hold from
     * currentHolds */
    hold ? (
      <Box sx={{ display: "flex", gap: "4px" }}>
        <CancelButton removeHold={removeHold} hold={hold} patron={patron} />
        {hold.canFreeze && <FreezeButton hold={hold} patron={patron} />}
      </Box>
    ) : null,
  ])

  function getStatusBadge(status) {
    if (status == "READY FOR PICKUP") {
      return <StatusBadge type="positive">{status}</StatusBadge>
    }
    return <StatusBadge type="neutral">{status}</StatusBadge>
  }

  return (
    <ItemsTab
      headers={holdsHeaders}
      data={holdsData}
      userAction={"requested"}
    />
  )
}

export default RequestsTab
