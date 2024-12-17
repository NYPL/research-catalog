import { Text } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { appConfig } from "../../config/config"
import type Item from "../../models/Item"
import { availabilityKeys } from "../../config/constants"
import {
  AvailableByAppointment,
  AvailableAt,
} from "./ItemAvailabilityComponents/AvailableByAppointment"
import AvailableOnsite from "./ItemAvailabilityComponents/AvailableOnsite"
import NotAvailable from "./ItemAvailabilityComponents/NotAvailable"

interface ItemAvailabilityProps {
  item: Item
}

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 * TODO: Add Feedback box, Due date, Available font styles
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  if (item.availability.key === availabilityKeys.RECAP) {
    return (
      <ExternalLink href={appConfig.urls.researchMaterialsHelp} fontSize="sm">
        How do I pick up this item and when will it be ready?
      </ExternalLink>
    )
  }

  let message
  switch (item.availability.key) {
    case availabilityKeys.RECAP:
      throw "This key doesn't have a message. This component should be returning earlier than this."
    case availabilityKeys.RECAP_AEON:
      message = <AvailableByAppointment />
      break
    case availabilityKeys.ONSITE_AEON:
      message = (
        <>
          <AvailableByAppointment />
          <AvailableAt location={item.availability.location} />
        </>
      )
      break
    case availabilityKeys.ONSITE:
      message = <AvailableOnsite location={item.availability.location} />
      break
    case availabilityKeys.NOT_AVAILABLE:
      message = (
        <NotAvailable
          dueDate={item.availability.dueDate}
          itemMetadata={item.availability.itemMetadata}
        />
      )
      break
  }

  return (
    <Text
      mb="0"
      fontSize={{
        base: "mobile.body.body2",
        md: "desktop.body.body2",
      }}
    >
      {message}
    </Text>
  )
}

export default ItemAvailability
