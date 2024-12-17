import type Item from "./Item"

class ItemAvailability {
  item: Item
  availabilityKey: string
  constructor(item: Item) {
    this.item = item
    this.availabilityKey = this.buildAvailabilityKey()
  }
  buildAvailabilityKey() {
    if (this.item.isAvailable && this.item.isReCAP && !this.item.aeonUrl) {
      return "availableRecap"
    }
    if (
      this.item.isAvailable &&
      this.item.aeonUrl &&
      this.item.location?.endpoint
    ) {
      return "availableAeon"
    }
    if (this.item.isAvailable && !this.item.isReCAP) {
      return "availableOnsite"
    }
    if (!this.item.isAvailable) {
      return "notAvailable"
    }
  }
}

export default ItemAvailability
