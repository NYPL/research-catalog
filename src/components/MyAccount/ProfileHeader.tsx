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

const ProfileHeader = ({ patron }: { patron: Patron }) => {
  const { isLargerThanMobile } = useNYPLBreakpoints()

  const profileData = (
    [
      { icon: "actionIdentityFilled", term: "Name", description: patron.name },
      {
        icon: "actionIdentity",
        term: "Username",
        description: patron.username,
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
    <List
      className={styles.myAccountList}
      id="my-account-profile-header"
      title="My Account"
      type="dl"
      sx={{
        border: "none",
        h2: { border: "none", paddingTop: 0 },
        marginBottom: "xxl",
      }}
    >
      {profileData}
    </List>
  )
}

export default ProfileHeader
