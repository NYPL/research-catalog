import {
  Banner,
  Box,
  List,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"
import Barcode from "react-barcode"

import styles from "../../../styles/components/MyAccount.module.scss"

import type { Patron } from "../../types/myAccountTypes"
import type { IconListElementPropType } from "./IconListElement"
import { buildListElementsWithIcons } from "./IconListElement"
import UsernameForm from "./NewSettings/UsernameForm"
import { useEffect, useRef, useState } from "react"
import type { StatusType } from "./NewSettings/StatusBanner"
import { StatusBanner } from "./NewSettings/StatusBanner"

const ProfileHeader = ({ patron }: { patron: Patron }) => {
  const { isLargerThanMobile } = useNYPLBreakpoints()
  const [usernameStatus, setUsernameStatus] = useState<StatusType>("")
  const [usernameStatusMessage, setUsernameStatusMessage] = useState<string>("")
  const usernameBannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (usernameStatus !== "" && usernameBannerRef.current) {
      usernameBannerRef.current.focus()
    }
  }, [usernameStatus])

  const usernameState = {
    setUsernameStatus,
    setUsernameStatusMessage,
  }

  const profileData = (
    [
      { icon: "actionIdentityFilled", term: "Name", description: patron.name },
      {
        icon: "actionPayment",
        term: "Card number",
        description: patron.formattedBarcode,
      },
      {
        icon: "",
        term: "",
        description: (
          <Box role="img" aria-label="barcode">
            <Barcode
              margin={0}
              value={patron.barcode}
              format="codabar"
              displayValue={false}
              width={isLargerThanMobile ? 2 : 1.5}
            />
          </Box>
        ),
      },
      {
        icon: "clock",
        term: "Expiration date",
        description: patron.expirationDate,
      },
    ] as IconListElementPropType[]
  )
    .filter((data) => data.description)
    .map(buildListElementsWithIcons)

  return (
    <>
      {usernameStatus !== "" && (
        <div
          ref={usernameBannerRef}
          tabIndex={-1}
          style={{ marginBottom: "32px" }}
        >
          <StatusBanner
            status={usernameStatus}
            statusMessage={usernameStatusMessage}
          />
        </div>
      )}
      <List
        className={styles.myAccountList}
        id="my-account-profile-header"
        title="My Account"
        type="dl"
        sx={{
          border: "none",
          h2: { border: "none", paddingTop: 0 },
        }}
      >
        {profileData[0]}
      </List>
      <UsernameForm patron={patron} usernameState={usernameState} />
      <List
        className={styles.myAccountList}
        id="my-account-profile-header-2"
        type="dl"
        sx={{
          border: "none",
          marginBottom: "xxl",
        }}
      >
        {profileData.slice(1)}
      </List>
    </>
  )
}

export default ProfileHeader
