import type Item from "./Item"
import AvailableByAppointment from "../components/ItemTable/ItemAvailabilityComponents/AvailableByAppointment"
import AvailableOnsite from "../components/ItemTable/ItemAvailabilityComponents/AvailableOnsite"
import NotAvailable from "../components/ItemTable/ItemAvailabilityComponents/NotAvailable"
import { availabilityKeys } from "../config/constants"

class ItemAvailability {
  item: Item
  key: string
  constructor(item: Item) {
    this.item = item
    this.key = this.buildKey()
  }
  buildKey() {
    if (this.item.isAvailable && this.item.isReCAP && !this.item.aeonUrl) {
      return availabilityKeys.AVAILABLE_RECAP
    }
    if (
      this.item.isAvailable &&
      this.item.aeonUrl &&
      this.item.location?.endpoint
    ) {
      return availabilityKeys.AVAILABLE_AEON
    }
    if (this.item.isAvailable && !this.item.isReCAP) {
      return availabilityKeys.AVAILABLE_ONSITE
    }
    if (!this.item.isAvailable) {
      return availabilityKeys.NOT_AVAILABLE
    }
  }
  message() {
    switch (this.key) {
      case availabilityKeys.AVAILABLE_RECAP:
        throw "This key doesn't have a message. This component should be returning earlier than this."
      case availabilityKeys.AVAILABLE_AEON:
        return <AvailableByAppointment item={this.item} />
      case availabilityKeys.AVAILABLE_ONSITE:
        return <AvailableOnsite item={this.item} />
      case availabilityKeys.NOT_AVAILABLE:
        return <NotAvailable item={this.item} />
    }
  }
}

export default ItemAvailability
