import type Item from "./Item"
import { availabilityKeys } from "../config/constants"

class ItemAvailability {
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
    if (this.isReCAP && !this.specialCollections) {
      return availabilityKeys.RECAP
    }
    if (this.aeonUrl && this.isReCAP) {
      return availabilityKeys.RECAP_AEON
    }
    if (this.aeonUrl && !this.isReCAP) {
      return availabilityKeys.ONSITE_AEON
    }
    if (!this.isReCAP) {
      return availabilityKeys.ONSITE
    }
  }
}

export default ItemAvailability
