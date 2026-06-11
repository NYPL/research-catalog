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
import { useState } from "react"
import { StatusBanner } from "./Settings/StatusBanner"
import type { StatusBannerState } from "./Settings/StatusBanner"
import { idConstants } from "../../context/FocusContext"

const ProfileHeader = ({ patron }: { patron: Patron }) => {
  const { isLargerThanMobile } = useNYPLBreakpoints()
  const [usernameStatus, setUsernameStatus] =
    useState<StatusBannerState | null>(null)

  const profileData = (
    [
      { icon: "actionIdentityFilled", term: "Name", description: patron.name },
      {
        icon: "actionIdentity",
        term: "Username",
        description: (
          <UsernameForm patron={patron} setUsernameStatus={setUsernameStatus} />
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
      {usernameStatus && (
        <div
          id={idConstants.usernameStatusBanner}
          tabIndex={-1}
          style={{ marginTop: "32px", marginBottom: "32px" }}
        >
          <StatusBanner
            type={usernameStatus.type}
            message={usernameStatus.message}
          />
        </div>
      )}
      <List
        className={styles.myAccountList}
        id="my-account-profile-header"
        title="My account"
        variant="dl"
        sx={{
          border: "none",
          h2: { border: "none", paddingTop: 0, marginBottom: "m" },
          marginBottom: "l",
        }}
      >
        {profileData}
      </List>
    </>
  )
}

export default ProfileHeader
