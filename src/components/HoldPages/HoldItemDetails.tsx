import { List } from "@nypl/design-system-react-components"

import type Item from "../../../src/models/Item"
import { LinkedDetailElement, PlainTextElement } from "../BibPage/BibDetail"

import bibDetailStyles from "../../../styles/components/BibDetails.module.scss"
import { PATHS } from "../../../src/config/constants"

interface HoldItemDetailsProps {
  item: Item
}

/**
 * The HoldRequestBanner renders the error notification for a failed response on the hold page.
 */
const HoldItemDetails = ({ item }: HoldItemDetailsProps) => {
  return (
    <List
      noStyling
      type="dl"
      showRowDividers={false}
      className={bibDetailStyles.bibDetails}
      mb="xs"
      mt={0}
    >
      <LinkedDetailElement
        label="Title"
        value={[{ url: `${PATHS.BIB}/${item.bibId}`, urlLabel: item.bibTitle }]}
        link="internal"
      />
      <PlainTextElement label="Call number" value={[item.callNumber]} />
      {item.volume ? (
        <PlainTextElement label="Volume/date" value={[item.volume]} />
      ) : (
        <></>
      )}
    </List>
  )
}

export default HoldItemDetails
