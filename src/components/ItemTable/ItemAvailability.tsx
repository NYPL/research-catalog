import { useContext } from "react"
import { Text, Link, Button, Box } from "@nypl/design-system-react-components"

import { appConfig } from "../../config/config"
import type Item from "../../models/Item"
import { FeedbackContext } from "../../context/FeedbackContext"
import type { ItemMetadata } from "../../types/itemTypes"

interface ItemAvailabilityProps {
  item: Item
}

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 * TODO: Add Feedback box, Due date, Available font styles
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  const feedback = useContext(FeedbackContext)

  const openFeedbackBox = feedback.onOpen
  const setItemMetadata = feedback.setItemMetadata

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    openFeedbackBox()
  }

  // TODO: Move this logic into a getter function in the Item class that returns an availability status key
  // and replace this nested If with a simple switch statement
  if (item.isAvailable) {
    if (item.isReCAP && !item.aeonUrl) {
      // Available ReCAP item
      return (
        <Link
          href={appConfig.urls.researchMaterialsHelp}
          target="_blank"
          fontSize="sm"
        >
          How do I pick up this item and when will it be ready?
        </Link>
      )
    } else if (item.aeonUrl && item.location?.endpoint) {
      return (
        <Text>
          <Box as="span" color="ui.success.primary">
            Available by appointment
          </Box>
          {!item.isReCAP ? (
            <>
              {" at "}
              <Link
                href={`${appConfig.urls.locations}${item.location.endpoint}`}
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
          <Box as="span" color="ui.success.primary">
            Available
          </Box>
          {" - Can be used on site. Please visit "}
          <Link
            href={`${appConfig.urls.locations}${item.location.endpoint}`}
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
        <Box as="span" color="ui.warning.primary">
          Not available
        </Box>
        {item.dueDate && ` - In use until ${item.dueDate}`}
        {" - Please "}
        <Button
          id="contact-librarian"
          buttonType="link"
          sx={{ display: "inline", fontWeight: "inherit", fontSize: "inherit" }}
          onClick={() =>
            onContact({
              id: item.id,
              barcode: item.barcode,
              callNumber: item.callNumber,
              bibId: item.bibId,
            })
          }
        >
          contact a librarian
        </Button>
        {" for assistance."}
      </Text>
    )
  }
}

export default ItemAvailability
