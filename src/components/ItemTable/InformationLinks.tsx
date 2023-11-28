import { Text, Link } from "@nypl/design-system-react-components"

import type Item from "../../models/Item"

interface InformationLinksProps {
  item: Item
}

/**
 * The InformationLinks component appears in the Item Table
 * TODO: Add Feedback box, Due date, Available font styles
 */
const InformationLinks = ({ item }: InformationLinksProps) => {
  if (item.isAvailable) {
    if (item.isReCAP && !item.aeonUrl) {
      // Available ReCAP item
      return (
        <Link
          href="https://www.nypl.org/help/request-research-materials"
          target="_blank"
        >
          How do I pick up this item and when will it be ready?
        </Link>
      )
    } else if (item.aeonUrl && item.location?.url) {
      return (
        <Text>
          <span className="available-text">Available by appointment</span>
          {!item.isReCAP ? (
            <>
              <span> at </span>
              <Link href={item.location.url} target="_blank">
                {item.location.prefLabel}
              </Link>
            </>
          ) : null}
        </Text>
      )
    } else {
      // Available Onsite item
      const locationShort = item.location.prefLabel.split("-")[0]
      return (
        <Text>
          <span className="available-text">Available </span>
          {"- Can be used on site. Please visit "}
          <Link
            href={"https://www.nypl.org/locations/" + item.location.endpoint}
            target="_blank"
          >
            {"New York Public Library - "}
            {locationShort}
          </Link>
          {" to submit a request in person."}
        </Text>
      )
    }
  } else {
    return <></>
  }
}

export default InformationLinks
