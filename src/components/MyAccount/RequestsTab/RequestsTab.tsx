import { Link, StatusBadge, Text } from "@nypl/design-system-react-components"
import type { Hold, Patron } from "../../../types/accountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import ItemsTab from "../ItemsTab"
import CancelFreezeButton from "../CancelFreezeButton"
import { useState } from "react"

const RequestsTab = ({ holds, patron }: { holds: Hold[]; patron: Patron }) => {
  const [currentHolds, setCurrentHolds] = useState(holds)
  const holdsHeaders = [
    "Title",
    "Status",
    "Pickup location",
    "Pickup by",
    "Manage request",
  ]

  function handleState(hold) {
    setCurrentHolds(
      currentHolds.reduce((acc, item) => {
        if (item.id !== hold.id) {
          acc.push(item)
        }
        return acc
      }, [])
    )
  }

  const holdsData = currentHolds.map((hold) => [
    formatTitle(hold),
    getStatusBadge(hold.status),
    hold.pickupLocation.name,
    hold.pickupByDate,
    hold ? (
      <CancelFreezeButton
        handleState={handleState}
        hold={hold}
        patron={patron}
      />
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
