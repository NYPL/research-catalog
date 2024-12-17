import { Text, Box } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { appConfig } from "../../config/config"
import type Item from "../../models/Item"
import ContactALibrarian from "./ItemAvailabilityComponents/ContactALibrarian"

interface ItemAvailabilityProps {
  item: Item
}

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 * TODO: Add Feedback box, Due date, Available font styles
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  // TODO: Move this logic into a getter function in the Item class that returns an availability status key
  // and replace this nested If with a simple switch statement
  switch (item.availabilityKey) {
    case "availableRecap":
      return (
        <ExternalLink href={appConfig.urls.researchMaterialsHelp} fontSize="sm">
          How do I pick up this item and when will it be ready?
        </ExternalLink>
      )
    case "availableAeon":
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
    case "availableOnsite": {
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
    case "notAvailable":
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
          <ContactALibrarian item={item} />
        </Text>
      )
  }
}

export default ItemAvailability
