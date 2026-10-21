import type Item from "../../models/Item"
import { AVAILABILITY_KEYS } from "../../config/constants"
import NotAvailableText from "./ItemAvailability/NotAvailableText"
import AvailableText from "./ItemAvailability/AvailableText"

interface ItemAvailabilityProps {
  item: Item
}

const {
  AVAILABLE_DESK,
  NOT_AVAILABLE_DESK,
  AVAILABLE_SHELF,
  NOT_AVAILABLE_SHELF,
  AVAILABLE_GENERAL_NO_BARCODE,
  NOT_AVAILABLE_GENERAL_NO_BARCODE,
  AVAILABLE_PARTNER,
  NOT_AVAILABLE_PARTNER,
  AVAILABLE_OFFSITE_NYPL,
  NOT_AVAILABLE_OFFSITE_NYPL,
  AVAILABLE_APPT_AEON,
  NOT_AVAILABLE_APPT_AEON,
  AVAILABLE_APPT_NO_AEON_FINDING_AID,
  NOT_AVAILABLE_APPT_NO_AEON_FINDING_AID,
  AVAILABLE_APPT_NO_AEON_NO_FINDING_AID,
  NOT_AVAILABLE_APPT_NO_AEON_NO_FINDING_AID,
  NOT_AVAILABLE_EDGE_CASE,
  AVAILABLE_EDGE_CASE,
} = AVAILABILITY_KEYS

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  switch (item.availability.key) {
    case NOT_AVAILABLE_DESK:
    case NOT_AVAILABLE_SHELF:
    case NOT_AVAILABLE_GENERAL_NO_BARCODE:
    case NOT_AVAILABLE_OFFSITE_NYPL:
    case NOT_AVAILABLE_APPT_AEON:
    case NOT_AVAILABLE_APPT_NO_AEON_FINDING_AID:
    case NOT_AVAILABLE_APPT_NO_AEON_NO_FINDING_AID:
    case NOT_AVAILABLE_PARTNER:
    case NOT_AVAILABLE_EDGE_CASE:
      return <NotAvailableText item={item} />
    case AVAILABLE_DESK:
      return (
        <AvailableText
          text={
            "Please visit the service desk in this room to request this item."
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
    case AVAILABLE_GENERAL_NO_BARCODE:
      return (
        <AvailableText
          item={item}
          text={"Please contact the division to request this item."}
        />
      )
    case AVAILABLE_PARTNER:
    case AVAILABLE_OFFSITE_NYPL:
      return (
        <AvailableText
          text={"Item stored offsite and must be requested in advance."}
        />
      )
    case AVAILABLE_APPT_NO_AEON_FINDING_AID:
      return (
        <AvailableText
          text={
            <>
              Please view the <span translate="no"> finding aid </span> to
              schedule an appointment.
            </>
          }
        />
      )
    case AVAILABLE_APPT_NO_AEON_NO_FINDING_AID:
      return (
        <AvailableText
          text={"Please contact the division to schedule an appointment."}
        />
      )
    // No message displays for these cases
    case AVAILABLE_APPT_AEON:
    case AVAILABLE_EDGE_CASE:
      return null
  }
}

export default ItemAvailability
