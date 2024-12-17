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
    this.specialCollections = specialCollections

    this.key = this.buildKey()
    console.log(this)
  }
  buildKey() {
    // All unavailable records have the same messaging.
    // general collections messages
    if (!this.isAvailable) {
      return availabilityKeys.NOT_AVAILABLE
    }
    if (this.isReCAP && !this.specialCollections) {
      return availabilityKeys.RECAP
    }
    if (!this.isReCAP && !this.specialCollections) {
      return availabilityKeys.ONSITE
    }
    // special collections messaging
    if (this.aeonUrl && this.isReCAP && !this.findingAid) {
      return availabilityKeys.RECAP_AEON
    }
    if (this.aeonUrl && this.isReCAP && this.findingAid) {
      return availabilityKeys.RECAP_AEON_FINDING_AID
    }
    if (this.aeonUrl && !this.isReCAP && !this.findingAid) {
      return availabilityKeys.ONSITE_AEON
    }
  }
}

export default ItemAvailability
