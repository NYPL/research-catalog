import {
  Box,
  StatusBadge,
  Text,
  SkeletonLoader,
} from "@nypl/design-system-react-components"

import ExternalLink from "../../Links/ExternalLink/ExternalLink"
import type { Hold } from "../../../types/myAccountTypes"
import ItemsTab from "../ItemsTab"
import CancelButton from "./CancelButton"
import FreezeButton from "./FreezeButton"
import UpdateLocation from "./UpdateLocation"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { useContext, useEffect, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"

const RequestsTab = () => {
  const tabRef = useRef(null)
  const [focusOnRequestTab, setFocusOnRequestTab] = useState(false)
  const {
    patronDataLoading,
    updatedAccountData: { holds, patron, pickupLocations },
  } = useContext(PatronDataContext)
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
          pickupLocationOptions={pickupLocations}
          patronId={patron.id}
          hold={hold}
          pickupLocation={hold.pickupLocation}
          key={i}
        />
      )}
    </>,
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
        )}
      </Box>
    ) : null,
  ])

  useEffect(() => {
    if (focusOnRequestTab) {
      tabRef.current.focus()
      setFocusOnRequestTab(false)
    }
  }, [focusOnRequestTab])

  function getStatusBadge(status) {
    if (status == "READY FOR PICKUP") {
      return (
        <StatusBadge className={styles.statusBadge} type="positive">
          {status}
        </StatusBadge>
      )
    }
    return (
      <StatusBadge className={styles.statusBadge} type="neutral">
        {status}
      </StatusBadge>
    )
  }
  // const tabDisplay = patronDataLoading ? (
  //   <SkeletonLoader showImage={false} />
  // ) : (
  //   <ItemsTab
  //     tabRef={tabRef}
  //     headers={holdsHeaders}
  //     data={holdsData}
  //     userAction={"requested"}
  //   />
  // )

  // return tabDisplay
  return (
    <ItemsTab
      tabRef={tabRef}
      headers={holdsHeaders}
      data={holdsData}
      userAction={"requested"}
    />
  )
}

export default RequestsTab
