import { availabilityKeys } from "../config/constants"

const {
  EDGE_CASE,
  RECAP_GENERAL_COLLECTIONS,
  ONSITE_GENERAL_COLLECTIONS,
  NOT_AVAILABLE,
  // special collections availability keys
  RECAP_AEON,
  ONSITE_AEON,
  ONSITE_AEON_FINDING_AID,
  RECAP_AEON_FINDING_AID,
  ONSITE_FINDING_AID,
  RECAP_FINDING_AID,
  ONSITE_NO_FINDING_AID_NO_AEON,
  RECAP_NO_FINDING_AID_NO_AEON,
} = availabilityKeys

class ItemAvailability {
  key: string
  isAvailable: boolean
  isReCAP: boolean
  aeonUrl: string
  findingAid: string
  specialCollections?: boolean
  isOnsite: boolean
  definitelyNotSpecialCollections: boolean

  constructor({
    isAvailable,
    isReCAP,
    aeonUrl,
    findingAid,
    specialCollections,
  }) {
    this.findingAid = findingAid
    this.isReCAP = isReCAP
    this.isAvailable = isAvailable
    this.aeonUrl = aeonUrl
    this.isOnsite = !this.isReCAP
    this.specialCollections = specialCollections
    const practicallySpecialCollections = !!(findingAid || aeonUrl)
    this.definitelyNotSpecialCollections =
      !this.specialCollections && !practicallySpecialCollections
    this.key = this.buildKey()
  }
  buildKey() {
    // All unavailable records have the same messaging.
    // general collections messages
    if (!this.isAvailable) {
      return NOT_AVAILABLE
    }
    if (this.isReCAP && this.definitelyNotSpecialCollections) {
      return RECAP_GENERAL_COLLECTIONS
    }
    if (this.isOnsite && this.definitelyNotSpecialCollections) {
      return ONSITE_GENERAL_COLLECTIONS
    }
    // special collections messaging
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
      this.specialCollections
    ) {
      return ONSITE_NO_FINDING_AID_NO_AEON
    }
    if (
      this.isReCAP &&
      !this.findingAid &&
      !this.aeonUrl &&
      this.specialCollections
    ) {
      return RECAP_NO_FINDING_AID_NO_AEON
    } else return EDGE_CASE
  }
}

export default ItemAvailability
