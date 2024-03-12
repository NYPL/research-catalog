import {
  Box,
  Link,
  StatusBadge,
  Text,
} from "@nypl/design-system-react-components"
import type { Hold, Patron } from "../../../types/accountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import ItemsTab from "../ItemsTab"
import CancelButton from "./CancelButton"
import { useState } from "react"
import FreezeButton from "./FreezeButton"

const RequestsTab = ({
  handleHoldsState,
  holds,
  patron,
}: {
  handleHoldsState
  holds: Hold[]
  patron: Patron
}) => {
  const holdsHeaders = [
    "Title",
    "Status",
    "Pickup location",
    "Pickup by",
    "Manage request",
  ]

  const holdsData = holds.map((hold) => [
    formatTitle(hold),
    getStatusBadge(hold.status),
    hold.pickupLocation.name,
    hold.pickupByDate,
    /* Passing handleState() down to the Cancel button so it can remove the hold from
     * currentHolds */
    hold ? (
      <Box sx={{ display: "flex", gap: "4px" }}>
        <CancelButton
          handleHoldsState={handleHoldsState}
          hold={hold}
          patron={patron}
        />
        {hold.canFreeze && <FreezeButton hold={hold} patron={patron} />}
      </Box>
    ) : null,
  ])

  function formatTitle(hold: Hold) {
    // If item is research/circ
    if (hold.catalogHref) {
      return <Link href={hold.catalogHref}>{hold.title}</Link>
    } else {
      // Item is a partner record
      return <Text>{hold.title}</Text>
    }
  }

  function getStatusBadge(status) {
    if (status == "READY FOR PICKUP") {
      return (
        <StatusBadge className={styles.statusBadgeReady}>{status}</StatusBadge>
      )
    }
    return (
      <StatusBadge className={styles.statusBadge}>
        {status.toUpperCase()}
      </StatusBadge>
    )
  }

  return <ItemsTab headers={holdsHeaders} data={holdsData} verb={"requested"} />
}

export default RequestsTab
