import { List } from "@nypl/design-system-react-components"

import type Item from "../../../src/models/Item"
import { PlainTextElement } from "../BibPage/BibDetail"

import bibDetailStyles from "../../../styles/components/BibDetails.module.scss"

interface HoldConfirmationItemDetailsProps {
  item: Item
  pickupLocationLabel?: string
}

/**
 * The HoldConfirmationItemDetails renders item details on the hold confirmation page.
 */
const HoldConfirmationItemDetails = ({
  item,
  pickupLocationLabel,
}: HoldConfirmationItemDetailsProps) => {
  return (
    <List
      noStyling
      variant="dl"
      showRowDividers={false}
      className={bibDetailStyles.bibDetails}
      mb="l"
      mt={0}
    >
      {pickupLocationLabel ? (
        <PlainTextElement
          label="Pickup location"
          value={[pickupLocationLabel]}
        />
      ) : (
        <></>
      )}
      <PlainTextElement label="Call number" value={[item.callNumber]} />
      {item.barcode ? (
        <PlainTextElement label="Barcode" value={[item.barcode]} />
      ) : (
        <></>
      )}
    </List>
  )
}

export default HoldConfirmationItemDetails
