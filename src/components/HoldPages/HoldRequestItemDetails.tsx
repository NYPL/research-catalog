import { List } from "@nypl/design-system-react-components"

import type Item from "../../models/Item"
import { LinkedDetailElement, PlainTextElement } from "../BibPage/BibDetail"

import bibDetailStyles from "../../../styles/components/BibDetails.module.scss"
import { PATHS } from "../../config/constants"

interface HoldRequestItemDetailsProps {
  item: Item
}

/**
 * The HoldRequestItemDetails renders item details on the hold page.
 */
const HoldRequestItemDetails = ({ item }: HoldRequestItemDetailsProps) => {
  return (
    <List
      noStyling
      variant="dl"
      showRowDividers={false}
      className={bibDetailStyles.bibDetails}
      mb="l"
      mt={0}
    >
      {LinkedDetailElement({
        label: "Title",
        value: [{ url: `${PATHS.BIB}/${item.bibId}`, urlLabel: item.bibTitle }],
        link: "internal",
      })}
      <PlainTextElement label="Call number" value={[item.callNumber]} />
      {item.volume ? (
        <PlainTextElement label="Volume/date" value={[item.volume]} />
      ) : (
        <></>
      )}
    </List>
  )
}

export default HoldRequestItemDetails
