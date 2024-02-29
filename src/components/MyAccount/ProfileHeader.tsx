import { List, Icon, Text, Box } from "@nypl/design-system-react-components"
import type { IconNames } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

import Barcode from "react-barcode"

import type { Patron } from "../../types/accountTypes"

// https://www.figma.com/file/k2E6Fc3bFV2GebWwCkmJQD/My-Account?type=design&node-id=2835-56709&mode=design&t=XWMgb9Ik9KGUpDXe-0
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
  ].map(
    ({
      icon,
      term,
      description,
    }: {
      icon: IconNames
      term: string
      description: string
    }) => {
      return (
        <>
          <dt key={term}>
            <Icon
              size="large"
              name={icon}
              title={`account profile ${term} icon`}
            />
            {term}
          </dt>
          <dd key={term}>{description}</dd>
        </>
      )
    }
  )

  return (
    <List
      sx={{ border: "none", h2: { border: "none" } }}
      className={styles.myAccountProfileHeader}
      id="my-account-profile-header"
      title="My account"
      type="dl"
    >
      {profileData}
    </List>
  )
}

export default ProfileHeader
