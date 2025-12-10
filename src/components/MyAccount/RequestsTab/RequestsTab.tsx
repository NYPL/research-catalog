import {
  Box,
  SkeletonLoader,
  StatusBadge,
  Text,
} from "@nypl/design-system-react-components"

import type { Hold } from "../../../types/myAccountTypes"
import ItemsTab from "../ItemsTab"
import CancelButton from "./CancelButton"
import FreezeButton from "./FreezeButton"
import UpdateLocation from "./UpdateLocation"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useContext, useEffect, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import Link from "../../Link/Link"

const RequestsTab = () => {
  const tabRef = useRef(null)
  const [focusOnRequestTab, setFocusOnRequestTab] = useState(false)
  const [lastUpdatedHoldId, setLastUpdatedHoldId] = useState<string>(null)

  const {
    patronDataLoading,
    updatedAccountData: { holds, patron, pickupLocations },
  } = useContext(PatronDataContext)
  function formatTitleElement(hold: Hold) {
    // If item is research/circ
    if (hold.catalogHref) {
      return (
        <Link
          isExternal
          whiteSpace="pre-line"
          isUnderlined={false}
          href={hold.catalogHref}
        >
          {hold.title}
        </Link>
      )
    } else {
      // Item is a partner record
      return <Text whiteSpace="pre-line">{hold.title}</Text>
    }
  }
  const holdsHeaders = [
    "Title",
    "Status",
    "Pickup location",
    "Pickup by",
    "Manage request",
  ]
  const tableStyles = holdsHeaders.map((_, index) => {
    const width = index === 0 ? null : "16%"
    const minWidth = index === 0 ? "320px" : "172px"
    return { width, minWidth }
  })
  const holdsData = holds.map((hold, i) => [
    formatTitleElement(hold),
    getStatusBadge(hold.status),
    lastUpdatedHoldId === hold.id && patronDataLoading ? (
      <SkeletonLoader showImage={false} />
    ) : (
      <>
        <Text>{hold.pickupLocation.name}</Text>
        {!hold.isResearch && hold.status === "REQUEST PENDING" && (
          <UpdateLocation
            setLastUpdatedHoldId={setLastUpdatedHoldId}
            focus={lastUpdatedHoldId === hold.id}
            pickupLocationOptions={pickupLocations}
            patronId={patron.id}
            hold={hold}
            key={hold.pickupLocation.code}
          />
        )}
      </>
    ),
    hold.pickupByDate,
    hold ? (
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          flexDirection: { base: "column", md: "row" },
        }}
      >
        <CancelButton
          setFocusOnRequestTab={setFocusOnRequestTab}
          hold={hold}
          patron={patron}
        />
        {hold.canFreeze && hold.status === "REQUEST PENDING" && (
          <FreezeButton hold={hold} patron={patron} />
        )}{" "}
      </Box>
    ) : null,
  ])

  useEffect(() => {
    if (!patronDataLoading && focusOnRequestTab) {
      tabRef.current.focus()
      setFocusOnRequestTab(false)
    }
  }, [focusOnRequestTab, patronDataLoading])

  function getStatusBadge(status) {
    if (status == "READY FOR PICKUP") {
      return (
        <StatusBadge className={styles.statusBadge} variant="positive">
          {status}
        </StatusBadge>
      )
    }
    return (
      <StatusBadge className={styles.statusBadge} variant="neutral">
        {status}
      </StatusBadge>
    )
  }
  const awaitingPatronUpdateAfterCancel = patronDataLoading && focusOnRequestTab
  const tabDisplay = awaitingPatronUpdateAfterCancel ? (
    <SkeletonLoader showImage={false} />
  ) : (
    <ItemsTab
      tabRef={tabRef}
      headers={holdsHeaders}
      data={holdsData}
      userAction={"requested"}
      tableStyling={tableStyles}
    />
  )

  return tabDisplay
}

export default RequestsTab
