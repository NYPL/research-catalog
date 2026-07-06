import type Item from "../../models/Item"
import { AVAILABILITY_KEYS } from "../../config/constants"
import NotAvailable from "./ItemAvailability/NotAvailable"
import AvailableText from "./ItemAvailability/AvailableText"

interface ItemAvailabilityProps {
  item: Item
}

const {
  NOT_AVAILABLE,
  AVAILABLE_SHELF,
  AVAILABLE_DESK,
  AVAILABLE_ONSITE_APPT,
  AVAILABLE_OFFSITE,
  AVAILABLE_CLOSED_STACK_NO_BARCODE,
} = AVAILABILITY_KEYS

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  switch (item.availability.key) {
    case NOT_AVAILABLE:
      return <NotAvailable dueDate={item.dueDate} />
    case AVAILABLE_DESK:
      return (
        <AvailableText
          text={
            "Item located at service desk. Please visit the service desk in this room to request this item."
          }
        />
      )
    case AVAILABLE_SHELF:
      return (
        <AvailableText
          text={
            "Item located on open reference shelves. Please contact a staff member in this room for assistance if you cannot locate this item."
          }
        />
      )
    case AVAILABLE_CLOSED_STACK_NO_BARCODE:
      return (
        <AvailableText
          text={"Please contact the division to request this item."}
        />
      )
    case AVAILABLE_OFFSITE:
      return (
        <AvailableText
          text={"Item stored offsite and must be requested in advance."}
        />
      )
    case AVAILABLE_ONSITE_APPT:
      return (
        <AvailableText
          text={"Please contact the division to schedule an appointment."}
        />
      )
  }
}

export default ItemAvailability
