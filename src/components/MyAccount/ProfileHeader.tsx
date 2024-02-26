import { List } from "@nypl/design-system-react-components"

import type { Patron } from "../../types/accountTypes"

// https://www.figma.com/file/k2E6Fc3bFV2GebWwCkmJQD/My-Account?type=design&node-id=2835-56709&mode=design&t=XWMgb9Ik9KGUpDXe-0
const ProfileHeader = ({ patron }: { patron: Patron }) => {
  const profileData = [
    { term: "Name:", description: patron.name },
    { term: "Card number:", description: patron.barcode },
    { term: "Expiration date:", description: patron.expirationDate },
  ]

  return (
    <List
      id="my-account-profile-header"
      title="My account"
      type="dl"
      listItems={profileData}
    />
  )
}

export default ProfileHeader
