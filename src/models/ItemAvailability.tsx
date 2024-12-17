import type Item from "./Item"
import {
  AvailableAt,
  AvailableByAppointment,
} from "../components/ItemTable/ItemAvailabilityComponents/AvailableByAppointment"
import AvailableOnsite from "../components/ItemTable/ItemAvailabilityComponents/AvailableOnsite"
import NotAvailable from "../components/ItemTable/ItemAvailabilityComponents/NotAvailable"
import { availabilityKeys } from "../config/constants"

class ItemAvailability {
  item: Item
  key: string
  location: { endpoint: string }
  dueDate: string
  isAvailable: boolean
  isReCAP: boolean
  aeonUrl: string
  findingAid: string
  needsButton: boolean
  specialCollections?: boolean
  itemMetadata: {
    id: string
    barcode: string
    callNumber: string
    bibId: string
  }
  constructor({
    location,
    dueDate,
    isAvailable,
    isReCAP,
    aeonUrl,
    findingAid,
    itemMetadata,
    specialCollections,
  }) {
    this.findingAid = findingAid
    this.dueDate = dueDate
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.aeonUrl = aeonUrl
    this.location = location
    this.dueDate = dueDate
    this.itemMetadata = itemMetadata
    this.key = this.buildKey()
    this.specialCollections =
      specialCollections || this.findingAid || this.aeonUrl
  }
  buildKey() {
    // All unavailable records have the same messaging.
    if (!this.isAvailable) {
      return availabilityKeys.NOT_AVAILABLE
    }
    if (this.isReCAP && !this.aeonUrl) {
      return availabilityKeys.RECAP
    }
    if (this.aeonUrl && this.isReCAP) {
      return availabilityKeys.RECAP_AEON
    }
    if (this.aeonUrl && this.location?.endpoint && !this.isReCAP) {
      return availabilityKeys.ONSITE_AEON
    }
    if (!this.isReCAP) {
      return availabilityKeys.ONSITE
    }
  }
  message() {
    switch (this.key) {
      case availabilityKeys.RECAP:
        throw "This key doesn't have a message. This component should be returning earlier than this."
      case availabilityKeys.RECAP_AEON:
        return <AvailableByAppointment />
      case availabilityKeys.ONSITE_AEON:
        return (
          <>
            <AvailableByAppointment />
            <AvailableAt location={this.location} />
          </>
        )
      case availabilityKeys.ONSITE:
        return <AvailableOnsite location={this.location} />
      case availabilityKeys.NOT_AVAILABLE:
        return (
          <NotAvailable
            dueDate={this.dueDate}
            itemMetadata={this.itemMetadata}
          />
        )
    }
  }
}

export default ItemAvailability
