import { Text, Box } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { appConfig } from "../../config/config"
import type Item from "../../models/Item"
import AvailableByAppointment from "./ItemAvailabilityComponents/AvailableByAppointment"
import NotAvailable from "./ItemAvailabilityComponents/NotAvailable"
import AvailableOnsite from "./ItemAvailabilityComponents/AvailableOnsite"

interface ItemAvailabilityProps {
  item: Item
}

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 * TODO: Add Feedback box, Due date, Available font styles
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  if (item.availability.key === "availableRecap") {
    return (
      <ExternalLink href={appConfig.urls.researchMaterialsHelp} fontSize="sm">
        How do I pick up this item and when will it be ready?
      </ExternalLink>
    )
  }

  return (
    <Text
      mb="0"
      fontSize={{
        base: "mobile.body.body2",
        md: "desktop.body.body2",
      }}
    >
      {item.availability.message()}
    </Text>
  )
}

export default ItemAvailability
