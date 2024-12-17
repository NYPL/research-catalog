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
  }) {
    this.findingAid = findingAid
    this.needsButton = false
    this.dueDate = dueDate
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.aeonUrl = aeonUrl
    this.location = location
    this.dueDate = dueDate
    this.itemMetadata = itemMetadata
    this.key = this.buildKey()
  }
  buildKey() {
    if (this.isAvailable && this.isReCAP && !this.aeonUrl) {
      return availabilityKeys.RECAP
    }
    if (
      this.isAvailable &&
      this.aeonUrl &&
      this.location?.endpoint &&
      this.isReCAP
    ) {
      return availabilityKeys.RECAP_AEON
    }
    if (
      this.isAvailable &&
      this.aeonUrl &&
      this.location?.endpoint &&
      !this.isReCAP
    ) {
      return availabilityKeys.ONSITE_AEON
    }
    if (this.isAvailable && !this.isReCAP) {
      return availabilityKeys.ONSITE
    }
    if (!this.isAvailable) {
      return availabilityKeys.NOT_AVAILABLE
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
