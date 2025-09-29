import {
  Box,
  List,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"
import Barcode from "react-barcode"

import styles from "../../../styles/components/MyAccount.module.scss"

import type { Patron } from "../../types/myAccountTypes"
import type { IconListElementPropType } from "./IconListElement"
import { buildListElementsWithIcons } from "./IconListElement"
import UsernameForm from "./Settings/UsernameForm"
import { useEffect, useRef, useState } from "react"
import type { StatusType } from "./Settings/StatusBanner"
import { StatusBanner } from "./Settings/StatusBanner"

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
        icon: "actionIdentity",
        term: "Username",
        description: (
          <UsernameForm patron={patron} usernameState={usernameState} />
        ),
      },
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
        variant="dl"
        sx={{
          border: "none",
          h2: { border: "none", paddingTop: 0 },
          marginBottom: "l",
        }}
      >
        {profileData}
      </List>
    </>
  )
}

export default ProfileHeader
