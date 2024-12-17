import type Item from "./Item"
import AvailableByAppointment from "../components/ItemTable/ItemAvailabilityComponents/AvailableByAppointment"
import AvailableOnsite from "../components/ItemTable/ItemAvailabilityComponents/AvailableOnsite"
import NotAvailable from "../components/ItemTable/ItemAvailabilityComponents/NotAvailable"
import { availabilityKeys } from "../config/constants"

class ItemAvailability {
  item: Item
  key: string
  findingAid: string
  constructor(item: Item, findingAid: string) {
    this.item = item
    this.key = this.buildKey()
    this.findingAid = findingAid
  }
  buildKey() {
    if (this.item.isAvailable && this.item.isReCAP && !this.item.aeonUrl) {
      return availabilityKeys.RECAP
    }
    if (
      this.item.isAvailable &&
      this.item.aeonUrl &&
      this.item.location?.endpoint &&
      this.item.isReCAP
    ) {
      return availabilityKeys.RECAP_AEON
    }
    if (
      this.item.isAvailable &&
      this.item.aeonUrl &&
      this.item.location?.endpoint &&
      !this.item.isReCAP
    ) {
      return availabilityKeys.ONSITE_AEON
    }
    if (this.item.isAvailable && !this.item.isReCAP) {
      return availabilityKeys.ONSITE
    }
    if (!this.item.isAvailable) {
      return availabilityKeys.NOT_AVAILABLE
    }
  }
  message() {
    switch (this.key) {
      case availabilityKeys.RECAP:
        throw "This key doesn't have a message. This component should be returning earlier than this."
      case availabilityKeys.RECAP_AEON:
        return <AvailableByAppointment item={this.item} />
      case availabilityKeys.ONSITE_AEON:
        return <AvailableByAppointment item={this.item} />
      case availabilityKeys.ONSITE:
        return <AvailableOnsite item={this.item} />
      case availabilityKeys.NOT_AVAILABLE:
        return <NotAvailable item={this.item} />
    }
  }
}

export default ItemAvailability
