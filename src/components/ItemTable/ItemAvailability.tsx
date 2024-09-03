import { useContext } from "react"
import { Text, Button, Box } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
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
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }

  // TODO: Move this logic into a getter function in the Item class that returns an availability status key
  // and replace this nested If with a simple switch statement
  if (item.isAvailable) {
    if (item.isReCAP && !item.aeonUrl) {
      // Available ReCAP item
      return (
        <ExternalLink href={appConfig.urls.researchMaterialsHelp} fontSize="sm">
          How do I pick up this item and when will it be ready?
        </ExternalLink>
      )
    } else if (item.aeonUrl && item.location?.endpoint) {
      return (
        <Text
          mb="0"
          fontSize={{
            base: "mobile.body.body2",
            md: "desktop.body.body2",
          }}
        >
          <Box as="span" color="ui.success.primary">
            Available by appointment
          </Box>
          {!item.isReCAP ? (
            <>
              {" at "}
              <ExternalLink
                href={`${appConfig.urls.locations}${item.location.endpoint}`}
              >
                {item.location.prefLabel}
              </ExternalLink>
            </>
          ) : null}
        </Text>
      )
    } else {
      // Available Onsite item
      const locationShort = item.location.prefLabel.split("-")[0]
      return (
        <Text
          mb="0"
          fontSize={{
            base: "mobile.body.body2",
            md: "desktop.body.body2",
          }}
        >
          <Box as="span" color="ui.success.primary">
            Available
          </Box>
          {" - Can be used on site. Please visit "}
          <ExternalLink
            href={`${appConfig.urls.locations}${item.location.endpoint}`}
          >
            {`New York Public Library - ${locationShort}`}
          </ExternalLink>
          {" to submit a request in person."}
        </Text>
      )
    }
  } else {
    // Not available
    return (
      <Text
        mb="0"
        fontSize={{
          base: "mobile.body.body2",
          md: "desktop.body.body2",
        }}
      >
        <Box as="span" color="ui.warning.tertiary">
          Not available
        </Box>
        {item.dueDate && ` - In use until ${item.dueDate}`}
        {" - Please "}
        <Button
          id="contact-librarian"
          buttonType="link"
          sx={{
            display: "inline",
            fontWeight: "inherit",
            fontSize: "inherit",
            p: 0,
            height: "auto",
          }}
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
