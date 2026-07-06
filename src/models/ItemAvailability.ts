import { AVAILABILITY_KEYS } from "../config/constants"
import type { ItemCollectionAccess } from "../types/itemTypes"

const {
  NOT_AVAILABLE,
  AVAILABLE_SHELF,
  AVAILABLE_DESK,
  AVAILABLE_ONSITE_APPT,
  AVAILABLE_OFFSITE,
  AVAILABLE_CLOSED_STACK_NO_BARCODE,
} = AVAILABILITY_KEYS

class ItemAvailability {
  key: string
  isAvailable: boolean
  isReCAP: boolean
  aeonUrl: string
  collectionAccessType: ItemCollectionAccess
  isSpecRequestable?: boolean
  isOnsite: boolean
  hasBarcode: boolean

  constructor({
    isAvailable,
    isReCAP,
    aeonUrl,
    collectionAccessType,
    isSpecRequestable,
    hasBarcode,
  }) {
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.collectionAccessType = collectionAccessType
    this.aeonUrl = aeonUrl
    this.isOnsite = !this.isReCAP
    this.isSpecRequestable = isSpecRequestable
    this.key = this.buildKey()
    this.hasBarcode = hasBarcode
  }
  buildKey() {
    // Not available
    if (!this.isAvailable) {
      return NOT_AVAILABLE
    }

    // General collections, available
    if (this.collectionAccessType === "desk") {
      return AVAILABLE_DESK
    }
    if (this.collectionAccessType === "shelf") {
      return AVAILABLE_SHELF
    }

    // Special collections, available
    if (!this.aeonUrl && this.isOnsite) {
      return AVAILABLE_ONSITE_APPT
    }
    if (this.isReCAP) {
      return AVAILABLE_OFFSITE
    }
    if (!this.hasBarcode) {
      return AVAILABLE_CLOSED_STACK_NO_BARCODE
    }
  }
}

export default ItemAvailability
