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
  AVAILABLE_GENERAL_NO_BARCODE,
  NOT_AVAILABLE_GENERAL_NO_BARCODE,
  AVAILABLE_PARTNER,
  NOT_AVAILABLE_PARTNER,
  AVAILABLE_OFFSITE_NYPL,
  NOT_AVAILABLE_OFFSITE_NYPL,
  AVAILABLE_APPT_AEON,
  NOT_AVAILABLE_APPT_AEON,
  AVAILABLE_APPT_NO_AEON_FINDING_AID,
  NOT_AVAILABLE_APPT_NO_AEON_FINDING_AID,
  AVAILABLE_APPT_NO_AEON_NO_FINDING_AID,
  NOT_AVAILABLE_APPT_NO_AEON_NO_FINDING_AID,
  NOT_AVAILABLE_EDGE_CASE,
  AVAILABLE_EDGE_CASE,
  AVAILABLE_EDGE_CASE_NOT_REQUESTABLE,
} = AVAILABILITY_KEYS

class ItemAvailability {
  key: string
  isAvailable: boolean
  isReCAP: boolean
  aeonUrl: string
  isInCollection: boolean
  hasFindingAid: boolean
  collectionAccessType: ItemCollectionAccess
  isSpecRequestable: boolean
  isOnsite: boolean
  hasBarcode: boolean
  isPartnerReCAP: boolean
  isPhysicallyRequestable: boolean
  isEDDRequestable: boolean

  constructor({
    isAvailable,
    isReCAP,
    aeonUrl,
    collectionAccessType,
    isSpecRequestable,
    hasBarcode,
    isPartnerReCAP,
    hasFindingAid,
    // defaults
    isPhysicallyRequestable = false,
    isEDDRequestable = false,
  }) {
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.collectionAccessType = collectionAccessType
    this.aeonUrl = aeonUrl
    this.isOnsite = !this.isReCAP
    this.isSpecRequestable = isSpecRequestable
    this.hasBarcode = hasBarcode
    this.isPartnerReCAP = isPartnerReCAP
    this.hasFindingAid = hasFindingAid
    this.isPhysicallyRequestable = isPhysicallyRequestable
    this.isEDDRequestable = isEDDRequestable
    this.key = this.buildKey()
  }
  buildKey() {
    if (
      this.collectionAccessType === "desk" &&
      this.isAvailable &&
      !this.isReCAP
    ) {
      return AVAILABLE_DESK
    }
    if (
      this.collectionAccessType === "desk" &&
      !this.isAvailable &&
      !this.isReCAP
    ) {
      return NOT_AVAILABLE_DESK
    }
    if (
      this.collectionAccessType === "shelf" &&
      this.isAvailable &&
      !this.isReCAP
    ) {
      return AVAILABLE_SHELF
    }
    if (
      this.collectionAccessType === "shelf" &&
      !this.isAvailable &&
      !this.isReCAP
    ) {
      return NOT_AVAILABLE_SHELF
    }

    if (this.aeonUrl && this.isAvailable && this.isSpecRequestable) {
      return AVAILABLE_APPT_AEON
    }
    if (this.aeonUrl && !this.isAvailable && this.isSpecRequestable) {
      return NOT_AVAILABLE_APPT_AEON
    }
    if (!this.aeonUrl && this.isAvailable && this.isSpecRequestable) {
      return this.hasFindingAid
        ? AVAILABLE_APPT_NO_AEON_FINDING_AID
        : AVAILABLE_APPT_NO_AEON_NO_FINDING_AID
    }
    if (!this.aeonUrl && !this.isAvailable && this.isSpecRequestable) {
      return this.hasFindingAid
        ? NOT_AVAILABLE_APPT_NO_AEON_FINDING_AID
        : NOT_AVAILABLE_APPT_NO_AEON_NO_FINDING_AID
    }

    if (
      !this.hasBarcode &&
      !this.isReCAP &&
      !this.isSpecRequestable &&
      this.isAvailable
    ) {
      return AVAILABLE_GENERAL_NO_BARCODE
    }
    if (
      !this.hasBarcode &&
      !this.isReCAP &&
      !this.isSpecRequestable &&
      !this.isAvailable
    ) {
      return NOT_AVAILABLE_GENERAL_NO_BARCODE
    }

    if (this.isReCAP && this.isAvailable && this.isPartnerReCAP) {
      return AVAILABLE_PARTNER
    }
    if (this.isReCAP && !this.isAvailable && this.isPartnerReCAP) {
      return NOT_AVAILABLE_PARTNER
    }

    if (this.isReCAP && this.isAvailable && !this.isPartnerReCAP) {
      return AVAILABLE_OFFSITE_NYPL
    }
    if (this.isReCAP && !this.isAvailable && !this.isPartnerReCAP) {
      return NOT_AVAILABLE_OFFSITE_NYPL
    }

    // If it's an availability edge case AND no request buttons will display:
    if (
      !this.aeonUrl &&
      !this.isPhysicallyRequestable &&
      !this.isEDDRequestable
    ) {
      return AVAILABLE_EDGE_CASE_NOT_REQUESTABLE
    }

    // Catch-alls:
    return !this.isAvailable ? NOT_AVAILABLE_EDGE_CASE : AVAILABLE_EDGE_CASE
  }
}

export default ItemAvailability
