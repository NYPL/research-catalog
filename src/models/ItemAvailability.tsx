import type { JsxElement } from "typescript"
import type Item from "./Item"
import AvailableByAppointment from "../components/ItemTable/ItemAvailabilityComponents/AvailableByAppointment"
import AvailableOnsite from "../components/ItemTable/ItemAvailabilityComponents/AvailableOnsite"
import NotAvailable from "../components/ItemTable/ItemAvailabilityComponents/NotAvailable"

class ItemAvailability {
  item: Item
  key: string
  constructor(item: Item) {
    this.item = item
    this.key = this.buildKey()
  }
  buildKey() {
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
  message() {
    switch (this.key) {
      case "availableAeon":
        return <AvailableByAppointment item={this.item} />
      case "availableOnsite":
        return <AvailableOnsite item={this.item} />
      case "notAvailable":
        return <NotAvailable item={this.item} />
    }
  }
}

export default ItemAvailability
