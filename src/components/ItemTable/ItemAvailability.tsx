import type Item from "../../models/Item"
import { AVAILABILITY_KEYS } from "../../config/constants"
import NotAvailable from "./ItemAvailability/NotAvailable"
import AvailableText from "./ItemAvailability/AvailableText"
import NotAvailablePartner from "./ItemAvailability/NotAvailablePartner"

interface ItemAvailabilityProps {
  item: Item
}

const {
  NOT_AVAILABLE,
  NOT_AVAILABLE_PARTNER,
  AVAILABLE_SHELF,
  AVAILABLE_DESK,
  AVAILABLE_ONSITE_APPT,
  AVAILABLE_ONSITE_APPT_AEON,
  AVAILABLE_OFFSITE,
  AVAILABLE_CLOSED_STACK_NO_BARCODE,
  AVAILABLE_CLOSED_STACK,
  AVAILABLE_GENERAL,
} = AVAILABILITY_KEYS

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  switch (item.availability.key) {
    case NOT_AVAILABLE:
      return (
        <NotAvailable
          text={"Please contact the division for assistance."}
          dueDate={item.dueDate}
        />
      )
    case NOT_AVAILABLE_PARTNER:
      return <NotAvailablePartner item={item} />
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
    // No message displays for these cases
    case AVAILABLE_ONSITE_APPT_AEON:
    case AVAILABLE_CLOSED_STACK:
    case AVAILABLE_GENERAL:
  }
}

export default ItemAvailability
