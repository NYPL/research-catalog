import { Text, Link, Button } from "@nypl/design-system-react-components"

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
          <Text size="body2">
            How do I pick up this item and when will it be ready?
          </Text>
        </Link>
      )
    } else if (item.aeonUrl && item.location?.endpoint) {
      return (
        <Text>
          <Text color="ui.success.primary" sx={{ display: "inline" }}>
            Available by appointment
          </Text>
          {!item.isReCAP ? (
            <>
              {" at "}
              <Link
                href={`https://www.nypl.org/locations/${item.location.endpoint}`}
                target="_blank"
              >
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
          <Text color="ui.success.primary" sx={{ display: "inline" }}>
            Available
          </Text>
          {" - Can be used on site. Please visit "}
          <Link
            href={`https://www.nypl.org/locations/${item.location.endpoint}`}
            target="_blank"
          >
            {`New York Public Library - ${locationShort}`}
          </Link>
          {" to submit a request in person."}
        </Text>
      )
    }
  } else {
    // Not available
    return (
      <Text>
        <Text color="ui.warning.primary" sx={{ display: "inline" }}>
          Not available
        </Text>
        {item.dueDate && ` - In use until ${item.dueDate}`}
        {" - Please "}
        <Button
          id="contact-librarian"
          buttonType="link"
          sx={{ display: "inline", fontWeight: "inherit" }}
          size="large"
          onClick={() => {
            console.log("TODO: Trigger Feedback box")
          }}
        >
          contact a librarian
        </Button>
        {" for assistance."}
      </Text>
    )
  }
}

export default InformationLinks
