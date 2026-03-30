import { AVAILABILITY_KEYS } from "../config/constants"
import type { ItemCollectionAccess } from "../types/itemTypes"

const {
  EDGE_CASE,
  RECAP_GENERAL_COLLECTIONS,
  ONSITE_GENERAL_COLLECTIONS,
  NOT_AVAILABLE,
  DESK_AVAILABLE,
  SHELF_AVAILABLE,
  RECAP_AEON,
  ONSITE_AEON,
  ONSITE_AEON_FINDING_AID,
  RECAP_AEON_FINDING_AID,
  ONSITE_FINDING_AID,
  RECAP_FINDING_AID,
  ONSITE_NO_FINDING_AID_NO_AEON,
  RECAP_NO_FINDING_AID_NO_AEON,
} = AVAILABILITY_KEYS

class ItemAvailability {
  key: string
  isAvailable: boolean
  isReCAP: boolean
  aeonUrl: string
  findingAid: string
  collectionAccessType: ItemCollectionAccess
  isSpecRequestable?: boolean
  isOnsite: boolean

  constructor({
    isAvailable,
    isReCAP,
    aeonUrl,
    collectionAccessType,
    findingAid,
    isSpecRequestable,
  }) {
    this.findingAid = findingAid
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.collectionAccessType = collectionAccessType
    this.aeonUrl = aeonUrl
    this.isOnsite = !this.isReCAP
    this.isSpecRequestable = isSpecRequestable
    this.key = this.buildKey()
  }
  buildKey() {
    // General collections
    if (!this.isAvailable) {
      return NOT_AVAILABLE
    }
    if (this.collectionAccessType === "desk") {
      return DESK_AVAILABLE
    }
    if (this.collectionAccessType === "shelf") {
      return SHELF_AVAILABLE
    }
    if (this.isOnsite && !this.isSpecRequestable) {
      return ONSITE_GENERAL_COLLECTIONS
    }
    if (this.isReCAP && !this.isSpecRequestable) {
      return RECAP_GENERAL_COLLECTIONS
    }
    // Special collections
    if (this.aeonUrl && this.isReCAP && !this.findingAid) {
      return RECAP_AEON
    }
    if (this.aeonUrl && this.isReCAP && this.findingAid) {
      return RECAP_AEON_FINDING_AID
    }
    if (this.aeonUrl && this.isOnsite && !this.findingAid) {
      return ONSITE_AEON
    }
    if (this.isOnsite && this.aeonUrl && this.findingAid) {
      return ONSITE_AEON_FINDING_AID
    }
    if (this.isOnsite && this.findingAid && !this.aeonUrl) {
      return ONSITE_FINDING_AID
    }
    if (this.isReCAP && this.findingAid && !this.aeonUrl) {
      return RECAP_FINDING_AID
    }
    if (
      this.isOnsite &&
      !this.findingAid &&
      !this.aeonUrl &&
      this.isSpecRequestable
    ) {
      return ONSITE_NO_FINDING_AID_NO_AEON
    }
    if (
      this.isReCAP &&
      !this.findingAid &&
      !this.aeonUrl &&
      this.isSpecRequestable
    ) {
      return RECAP_NO_FINDING_AID_NO_AEON
    } else return EDGE_CASE
  }
}

export default ItemAvailability
