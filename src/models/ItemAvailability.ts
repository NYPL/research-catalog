import { AVAILABILITY_KEYS } from "../config/constants"
import type { ItemCollectionAccess } from "../types/itemTypes"

const {
  NOT_AVAILABLE,
  NOT_AVAILABLE_PARTNER,
  AVAILABLE_SHELF,
  AVAILABLE_DESK,
  AVAILABLE_ONSITE_APPT,
  AVAILABLE_ONSITE_APPT_AEON,
  AVAILABLE_OFFSITE,
  AVAILABLE_CLOSED_STACK_NO_BARCODE,
  AVAILABLE_CLOSED_STACK,
  AVAILABLE_GENERAL,
} = AVAILABILITY_KEYS

/* Availability keys describe an availability status, and correspond to the message displayed
 ** below the request buttons on an item. Note: Many of these do not display a
 ** message (see the corresponding component). */
class ItemAvailability {
  key: string
  isAvailable: boolean
  isReCAP: boolean
  aeonUrl: string
  collectionAccessType: ItemCollectionAccess
  isSpecRequestable?: boolean
  isOnsite: boolean
  hasBarcode: boolean
  isPartnerReCAP: boolean

  constructor({
    isAvailable,
    isReCAP,
    aeonUrl,
    collectionAccessType,
    isSpecRequestable,
    hasBarcode,
    isPartnerReCAP,
  }) {
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.collectionAccessType = collectionAccessType
    this.aeonUrl = aeonUrl
    this.isOnsite = !this.isReCAP
    this.isSpecRequestable = isSpecRequestable
    this.hasBarcode = hasBarcode
    this.isPartnerReCAP = isPartnerReCAP
    this.key = this.buildKey()
  }
  buildKey() {
    // Not available
    if (this.isPartnerReCAP && !this.isAvailable) {
      return NOT_AVAILABLE_PARTNER
    }
    if (!this.isAvailable) {
      return NOT_AVAILABLE
    }

    // Reference, available
    if (this.collectionAccessType === "desk") {
      return AVAILABLE_DESK
    }
    if (this.collectionAccessType === "shelf") {
      return AVAILABLE_SHELF
    }

    // Available
    if (this.isReCAP) {
      return AVAILABLE_OFFSITE
    }

    // General collections, available
    if (!this.isSpecRequestable) {
      return AVAILABLE_GENERAL
    }

    // Special collections, available
    if (this.aeonUrl && this.isOnsite) {
      return AVAILABLE_ONSITE_APPT_AEON
    }
    if (!this.hasBarcode) {
      return AVAILABLE_CLOSED_STACK_NO_BARCODE
    }
    if (this.isSpecRequestable) {
      return AVAILABLE_CLOSED_STACK
    }
    if (!this.aeonUrl && this.isOnsite) {
      return AVAILABLE_ONSITE_APPT
    }
  }
}

export default ItemAvailability
