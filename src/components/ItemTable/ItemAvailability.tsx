import { Text } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { appConfig } from "../../config/config"
import type Item from "../../models/Item"
import { availabilityKeys } from "../../config/constants"
import {
  AvailableByAppointment,
  AvailableAt,
  AvailableAtLink,
} from "./ItemAvailability/AvailableByAppointment"
import AvailableOnsite from "./ItemAvailability/AvailableOnsite"
import NotAvailable from "./ItemAvailability/NotAvailable"
import FindingAid from "./ItemAvailability/FindingAid"
import ContactALibrarian from "./ItemAvailability/ContactALibrarian"

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
} = availabilityKeys

/**
 * The ItemAvailability component appears below the Item table and displays
 * info about an item's availability.
 * TODO: Add Feedback box, Due date, Available font styles
 */
const ItemAvailability = ({ item }: ItemAvailabilityProps) => {
  if (item.availability.key === RECAP_GENERAL_COLLECTIONS) {
    return (
      <ExternalLink href={appConfig.urls.researchMaterialsHelp} fontSize="sm">
        How do I pick up this item and when will it be ready?
      </ExternalLink>
    )
  }

  let message
  switch (item.availability.key) {
    case RECAP_GENERAL_COLLECTIONS:
      throw "This key doesn't have a message. This component should be returning earlier than this."
    case EDGE_CASE:
      message = <ContactALibrarian item={item} />
      break
    case (RECAP_AEON, ONSITE_AEON, RECAP_AEON_FINDING_AID):
      message = <AvailableByAppointment />
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
          <AvailableByAppointment />
          <FindingAid url={item.availability.findingAid} />
        </>
      )
      break
    case RECAP_NO_FINDING_AID_NO_AEON:
      message = (
        <>
          <AvailableByAppointment />
          <ContactALibrarian item={item} />
        </>
      )
      break
    case ONSITE_NO_FINDING_AID_NO_AEON:
      message = (
        <>
          <AvailableByAppointment />
          <AvailableAtLink location={item.location} />
          <ContactALibrarian item={item} />
        </>
      )
      break
    case ONSITE_GENERAL_COLLECTIONS:
      message = <AvailableOnsite location={item.location} />
      break
    case NOT_AVAILABLE:
      message = <NotAvailable item={item} />
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
