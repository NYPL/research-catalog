import { Text } from "@nypl/design-system-react-components"

import { appConfig } from "../../config/config"
import type Item from "../../models/Item"
import { AVAILABILITY_KEYS } from "../../config/constants"
import {
  AvailableByAppointment,
  AvailableAt,
  AvailableAtLink,
} from "./ItemAvailability/AvailableByAppointment"
import AvailableOnsite from "./ItemAvailability/AvailableOnsite"
import NotAvailable from "./ItemAvailability/NotAvailable"
import FindingAid from "./ItemAvailability/FindingAid"
import ContactALibrarian from "./ItemAvailability/ContactALibrarian"
import Link from "../Link/Link"

interface ItemAvailabilityProps {
  item: Item
}

const {
  EDGE_CASE,
  RECAP_GENERAL_COLLECTIONS,
  ONSITE_GENERAL_COLLECTIONS,
  NOT_AVAILABLE,
  // special collections availability keys
  RECAP_AEON,
  ONSITE_AEON,
  ONSITE_AEON_FINDING_AID,
  RECAP_AEON_FINDING_AID,
  ONSITE_FINDING_AID,
  RECAP_FINDING_AID,
  ONSITE_NO_FINDING_AID_NO_AEON,
  RECAP_NO_FINDING_AID_NO_AEON,
} = AVAILABILITY_KEYS

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 * TODO: Add Feedback box, Due date, Available font styles
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  let message
  const itemMetadata = {
    id: item.id,
    barcode: item.barcode,
    callNumber: item.callNumber,
    bibId: item.bibId,
  }
  switch (item.availability.key) {
    case RECAP_GENERAL_COLLECTIONS:
      return (
        <Link
          isExternal
          href={appConfig.urls.researchMaterialsHelp}
          fontSize="sm"
          className="no-print"
        >
          How do I pick up this item and when will it be ready?
        </Link>
      )
    case EDGE_CASE:
      message = <ContactALibrarian item={itemMetadata} />
      break
    case RECAP_AEON:
    case RECAP_AEON_FINDING_AID:
      message = <AvailableByAppointment displayPeriod />
      break
    case ONSITE_AEON_FINDING_AID:
      message = (
        <>
          <AvailableByAppointment />
          <AvailableAtLink location={item.location} />
        </>
      )
      break
    case ONSITE_AEON:
      message = (
        <>
          <AvailableByAppointment />
          <AvailableAt location={item.location} />
        </>
      )
      break
    case ONSITE_FINDING_AID:
      message = (
        <>
          <AvailableByAppointment />
          <AvailableAt location={item.location} />
          <FindingAid url={item.availability.findingAid} />
        </>
      )
      break
    case RECAP_FINDING_AID:
      message = (
        <>
          <AvailableByAppointment displayPeriod />
          <FindingAid url={item.availability.findingAid} />
        </>
      )
      break
    case RECAP_NO_FINDING_AID_NO_AEON:
      message = (
        <>
          <AvailableByAppointment displayPeriod />
          <ContactALibrarian item={item} />
        </>
      )
      break
    case ONSITE_NO_FINDING_AID_NO_AEON:
      message = (
        <>
          <AvailableByAppointment />
          <AvailableAt location={item.location} />
          <ContactALibrarian item={itemMetadata} />
        </>
      )
      break
    case ONSITE_GENERAL_COLLECTIONS:
      message = <AvailableOnsite location={item.location} />
      break
    case NOT_AVAILABLE:
      message = <NotAvailable item={itemMetadata} dueDate={item.dueDate} />
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
