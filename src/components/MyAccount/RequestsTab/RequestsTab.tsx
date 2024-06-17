import { Box, StatusBadge, Text } from "@nypl/design-system-react-components"

import ExternalLink from "../../Links/ExternalLink/ExternalLink"
import type {
  Hold,
  Patron,
  SierraCodeName,
} from "../../../types/myAccountTypes"
import ItemsTab from "../ItemsTab"
import CancelButton from "./CancelButton"
import FreezeButton from "./FreezeButton"
import UpdateLocation from "./UpdateLocation"

const RequestsTab = ({
  updateHoldLocation,
  removeHold,
  holds,
  patron,
  pickupLocations,
}: {
  updateHoldLocation
  removeHold
  holds: Hold[]
  patron: Patron
  pickupLocations: SierraCodeName[]
}) => {
  function formatTitleElement(hold: Hold) {
    // If item is research/circ
    if (hold.catalogHref) {
      return (
        <ExternalLink isUnderlined={false} href={hold.catalogHref}>
          {hold.title}
        </ExternalLink>
      )
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
  const holdsData = holds.map((hold, i) => [
    formatTitleElement(hold),
    getStatusBadge(hold.status),
    <>
      <Text>{hold.pickupLocation.name}</Text>
      {!hold.isResearch && hold.status === "REQUEST PENDING" && (
        <UpdateLocation
          updateHoldLocation={updateHoldLocation}
          pickupLocationOptions={pickupLocations}
          patronId={patron.id}
          hold={hold}
          pickupLocation={hold.pickupLocation}
          key={i}
        />
      )}
    </>,
    hold.pickupByDate,
    /* Passing removeHold() down to the Cancel button so it can remove the hold from
     * currentHolds */
    hold ? (
      <Box sx={{ display: "flex", gap: "4px" }}>
        <CancelButton removeHold={removeHold} hold={hold} patron={patron} />
        {hold.canFreeze && hold.status === "REQUEST PENDING" && (
          <FreezeButton hold={hold} patron={patron} />
        )}
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
