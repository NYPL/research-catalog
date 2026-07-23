import { AVAILABILITY_KEYS } from "../config/constants"
import type { ItemCollectionAccess } from "../types/itemTypes"

/* Availability keys describe an availability status, and correspond to the message displayed
 ** below the request buttons on an item. Note: Many of these do not display a
 ** message (see the corresponding component). */

const {
  AVAILABLE_DESK,
  NOT_AVAILABLE_DESK,
  AVAILABLE_SHELF,
  NOT_AVAILABLE_SHELF,
  AVAILABLE_CLOSED_STACK_NO_BARCODE,
  NOT_AVAILABLE_CLOSED_STACK_NO_BARCODE,
  AVAILABLE_OFFSITE_PARTNER,
  NOT_AVAILABLE_OFFSITE_PARTNER,
  AVAILABLE_OFFSITE_NYPL,
  NOT_AVAILABLE_OFFSITE_NYPL,
  AVAILABLE_APPT_AEON,
  NOT_AVAILABLE_APPT_AEON,
  AVAILABLE_APPT_NO_AEON,
  NOT_AVAILABLE_APPT_NO_AEON,
  AVAILABLE_EDGE_CASE,
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
    if (this.collectionAccessType === "desk" && this.isAvailable) {
      return AVAILABLE_DESK
    }
    if (this.collectionAccessType === "desk" && !this.isAvailable) {
      return NOT_AVAILABLE_DESK
    }
    if (
      this.collectionAccessType === "shelf" &&
      this.isAvailable &&
      this.isOnsite
    ) {
      return AVAILABLE_SHELF
    }
    if (
      this.collectionAccessType === "shelf" &&
      !this.isAvailable &&
      this.isOnsite
    ) {
      return NOT_AVAILABLE_SHELF
    }
    if (!this.hasBarcode && this.isOnsite && this.isAvailable) {
      return AVAILABLE_CLOSED_STACK_NO_BARCODE
    }
    if (!this.hasBarcode && this.isOnsite && !this.isAvailable) {
      return NOT_AVAILABLE_CLOSED_STACK_NO_BARCODE
    }

    if (this.isReCAP && this.isAvailable && this.isPartnerReCAP) {
      return AVAILABLE_OFFSITE_PARTNER
    }
    if (this.isReCAP && !this.isAvailable && this.isPartnerReCAP) {
      return NOT_AVAILABLE_OFFSITE_PARTNER
    }

    if (this.isReCAP && this.isAvailable && !this.isPartnerReCAP) {
      return AVAILABLE_OFFSITE_NYPL
    }
    if (this.isReCAP && !this.isAvailable && !this.isPartnerReCAP) {
      return NOT_AVAILABLE_OFFSITE_NYPL
    }

    if (this.aeonUrl && this.isAvailable && this.isSpecRequestable) {
      return AVAILABLE_APPT_AEON
    }
    if (this.aeonUrl && !this.isAvailable && this.isSpecRequestable) {
      return NOT_AVAILABLE_APPT_AEON
    }
    if (!this.aeonUrl && this.isAvailable && this.isSpecRequestable) {
      return AVAILABLE_APPT_NO_AEON
    }
    if (!this.aeonUrl && !this.isAvailable && this.isSpecRequestable) {
      return NOT_AVAILABLE_APPT_NO_AEON
    }

    // Catch-all:
    return AVAILABLE_EDGE_CASE
  }
}

export default ItemAvailability
