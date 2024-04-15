import { List } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

import Barcode from "react-barcode"

import type { Patron } from "../../types/myAccountTypes"
import { buildListElementsWithIcons } from "./IconListElement"

const ProfileHeader = ({ patron }: { patron: Patron }) => {
  const profileData = [
    { icon: "actionIdentityFilled", term: "Name:", description: patron.name },
    {
      icon: "actionPayment",
      term: "Card number:",
      description: patron.barcode,
    },
    {
      icon: "",
      term: "",
      description: (
        <Barcode
          margin={0}
          value={patron.barcode}
          format="codabar"
          displayValue={false}
        />
      ),
    },
    {
      icon: "clock",
      term: "Expiration date:",
      description: patron.expirationDate,
    },
  ].map(buildListElementsWithIcons)

  return (
    <List
      sx={{ border: "none", h2: { border: "none", paddingTop: 0 } }}
      className={styles.myAccountList}
      id="my-account-profile-header"
      title="My account"
      type="dl"
    >
      {profileData}
    </List>
  )
}

export default ProfileHeader
