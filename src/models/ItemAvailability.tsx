import { availabilityKeys } from "../config/constants"

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
      return availabilityKeys.NOT_AVAILABLE
    }
    if (this.isReCAP && this.definitelyNotSpecialCollections) {
      return availabilityKeys.RECAP_GENERAL_COLLECTIONS
    }
    if (this.isOnsite && this.definitelyNotSpecialCollections) {
      return availabilityKeys.ONSITE_GENERAL_COLLECTIONS
    }
    // special collections messaging
    if (this.aeonUrl && this.isReCAP && !this.findingAid) {
      return availabilityKeys.RECAP_AEON
    }
    if (this.aeonUrl && this.isReCAP && this.findingAid) {
      return availabilityKeys.RECAP_AEON_FINDING_AID
    }
    if (this.aeonUrl && this.isOnsite && !this.findingAid) {
      return availabilityKeys.ONSITE_AEON
    }
    if (this.isOnsite && this.aeonUrl && this.findingAid) {
      return availabilityKeys.ONSITE_AEON_FINDING_AID
    }
    if (this.isOnsite && this.findingAid && !this.aeonUrl) {
      return availabilityKeys.ONSITE_FINDING_AID
    }
    if (this.isReCAP && this.findingAid && !this.aeonUrl) {
      return availabilityKeys.RECAP_FINDING_AID
    }
    if (
      this.isOnsite &&
      !this.findingAid &&
      !this.aeonUrl &&
      this.specialCollections
    ) {
      return availabilityKeys.ONSITE_NO_FINDING_AID_NO_AEON
    }
    if (
      this.isReCAP &&
      !this.findingAid &&
      !this.aeonUrl &&
      this.specialCollections
    ) {
      return availabilityKeys.RECAP_NO_FINDING_AID_NO_AEON
    } else return availabilityKeys.EDGE_CASE
  }
}

export default ItemAvailability
