import { List } from "@nypl/design-system-react-components"
import Barcode from "react-barcode"

import styles from "../../../styles/components/MyAccount.module.scss"

import type { Patron } from "../../types/myAccountTypes"
import type { IconListElementPropType } from "./IconListElement"
import { buildListElementsWithIcons } from "./IconListElement"

const ProfileHeader = ({ patron }: { patron: Patron }) => {
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
        term: "Expiration date",
        description: patron.expirationDate,
      },
    ] as IconListElementPropType[]
  ).map(buildListElementsWithIcons)

  return (
    <List
      className={styles.myAccountList}
      id="my-account-profile-header"
      title="My account"
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
