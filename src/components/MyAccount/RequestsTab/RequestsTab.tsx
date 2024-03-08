import { getTitle } from "../../../utils/myAccountUtils"
import {
  Box,
  Button,
  Icon,
  Link,
  StatusBadge,
  Text,
  useModal,
} from "@nypl/design-system-react-components"
import type { Hold, Patron } from "../../../types/accountTypes"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../styles/components/MyAccount.module.scss"
import ItemsTab from "../ItemsTab"

const RequestsTab = ({ holds, patron }: { holds: Hold[]; patron: Patron }) => {
  console.log(holds)
  const holdsHeaders = [
    "Title",
    "Status",
    "Pickup location",
    "Pickup by",
    "Manage request",
  ]

  const holdsData = holds.map((hold) => [
    getTitle(hold),
    getStatusBadge(hold.status),
    hold.pickupLocation,
    hold.pickupByDate,
    CancelFreezeButton(hold, patron),
  ])

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

  function CancelFreezeButton(hold, patron) {
    const { onOpen, Modal } = useModal()
  }

  return <ItemsTab headers={holdsHeaders} data={holdsData} verb={"requested"} />
}

export default RequestsTab
