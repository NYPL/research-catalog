// // import { AVAILABILITY_KEYS } from "../config/constants"
// // import type { ItemCollectionAccess } from "../types/itemTypes"

// // const {
// //   NOT_AVAILABLE_NYPL,
// //   NOT_AVAILABLE_PARTNER,
// //   AVAILABLE_SHELF,
// //   AVAILABLE_DESK,
// //   AVAILABLE_ONSITE_APPT_NO_AEON,
// //   AVAILABLE_ONSITE_APPT_AEON,
// //   AVAILABLE_OFFSITE,
// //   AVAILABLE_CLOSED_STACK_NO_BARCODE,
// //   AVAILABLE_CLOSED_STACK,
// //   AVAILABLE_GENERAL,
// // } = AVAILABILITY_KEYS

// // /* Availability keys describe an availability status, and correspond to the message displayed
// //  ** below the request buttons on an item. Note: Many of these do not display a
// //  ** message (see the corresponding component). */
// // class ItemAvailability {
// //   key: string
// //   isAvailable: boolean
// //   isReCAP: boolean
// //   aeonUrl: string
// //   collectionAccessType: ItemCollectionAccess
// //   isSpecRequestable?: boolean
// //   isOnsite: boolean
// //   hasBarcode: boolean
// //   isPartnerReCAP: boolean

// //   constructor({
// //     isAvailable,
// //     isReCAP,
// //     aeonUrl,
// //     collectionAccessType,
// //     isSpecRequestable,
// //     hasBarcode,
// //     isPartnerReCAP,
// //   }) {
// //     this.isReCAP = isReCAP
// //     this.isAvailable = isAvailable
// //     this.collectionAccessType = collectionAccessType
// //     this.aeonUrl = aeonUrl
// //     this.isOnsite = !this.isReCAP
// //     this.isSpecRequestable = isSpecRequestable
// //     this.hasBarcode = hasBarcode
// //     this.isPartnerReCAP = isPartnerReCAP
// //     this.key = this.buildKey()
// //   }
// //   buildKey() {
// //     // Not available
// //     if (this.isPartnerReCAP && !this.isAvailable) {
// //       return NOT_AVAILABLE_PARTNER
// //     }
// //     if (!this.isAvailable) {
// //       return NOT_AVAILABLE_NYPL
// //     }

// //     // General collections, available
// //     if (this.collectionAccessType === "desk") {
// //       return AVAILABLE_DESK
// //     }
// //     if (this.collectionAccessType === "shelf") {
// //       return AVAILABLE_SHELF
// //     }
// //     if (!this.hasBarcode && !this.aeonUrl) {
// //       return AVAILABLE_CLOSED_STACK_NO_BARCODE
// //     }

// //     // Offsite, available
// //     if (this.isReCAP) {
// //       return AVAILABLE_OFFSITE
// //     }

// //     // Special collections, available
// //     if (this.isSpecRequestable && this.aeonUrl && this.isOnsite) {
// //       return AVAILABLE_ONSITE_APPT_AEON
// //     }
// //     if (this.isSpecRequestable && !this.aeonUrl && this.isOnsite) {
// //       return AVAILABLE_ONSITE_APPT_NO_AEON
// //     }

// //     // Catch-all:
// //     return AVAILABLE_GENERAL
// //   }
// // }

// // export default ItemAvailability

// import { AVAILABILITY_KEYS } from "../config/constants"
// import type { ItemCollectionAccess } from "../types/itemTypes"

// const {
//   NOT_AVAILABLE_NYPL,
//   NOT_AVAILABLE_PARTNER,
//   AVAILABLE_SHELF,
//   AVAILABLE_DESK,
//   AVAILABLE_ONSITE_APPT_NO_AEON,
//   AVAILABLE_ONSITE_APPT_AEON,
//   AVAILABLE_OFFSITE,
//   AVAILABLE_CLOSED_STACK_NO_BARCODE,
//   AVAILABLE_GENERAL,
// } = AVAILABILITY_KEYS

// /* Availability keys describe an availability status, and correspond to the message displayed
//  ** below the request buttons on an item. Note: Many of these do not display a
//  ** message (see the corresponding component). */
// class ItemAvailability {
//   key: string
//   isAvailable: boolean
//   isReCAP: boolean
//   aeonUrl: string
//   collectionAccessType: ItemCollectionAccess
//   isSpecRequestable?: boolean
//   isOnsite: boolean
//   hasBarcode: boolean
//   isPartnerReCAP: boolean

//   constructor({
//     isAvailable,
//     isReCAP,
//     aeonUrl,
//     collectionAccessType,
//     isSpecRequestable,
//     hasBarcode,
//     isPartnerReCAP,
//   }) {
//     this.isReCAP = isReCAP
//     this.isAvailable = isAvailable
//     this.collectionAccessType = collectionAccessType
//     this.aeonUrl = aeonUrl
//     this.isOnsite = !this.isReCAP
//     this.isSpecRequestable = isSpecRequestable
//     this.hasBarcode = hasBarcode
//     this.isPartnerReCAP = isPartnerReCAP
//     this.key = this.buildKey()
//   }
//   buildKey() {
//     // Not available
//     if (this.isPartnerReCAP && !this.isAvailable) {
//       return NOT_AVAILABLE_PARTNER
//     }
//     if (!this.isAvailable) {
//       return NOT_AVAILABLE_NYPL
//     }

//     // General collections, available
//     if (this.collectionAccessType === "desk") {
//       return AVAILABLE_DESK
//     }
//     if (this.collectionAccessType === "shelf") {
//       return AVAILABLE_SHELF
//     }
//     if (!this.hasBarcode && !this.aeonUrl) {
//       return AVAILABLE_CLOSED_STACK_NO_BARCODE
//     }

//     // Offsite, available
//     if (this.isReCAP) {
//       return AVAILABLE_OFFSITE
//     }

//     // Special collections, available
//     if (this.isSpecRequestable && this.aeonUrl && this.isOnsite) {
//       return AVAILABLE_ONSITE_APPT_AEON
//     }
//     if (this.isSpecRequestable && !this.aeonUrl && this.isOnsite) {
//       return AVAILABLE_ONSITE_APPT_NO_AEON
//     }

//     // Catch-all:
//     return AVAILABLE_GENERAL
//   }
// }

// export default ItemAvailability

/* Availability keys describe an availability status, and correspond to the message displayed
 ** below the request buttons on an item. Note: Many of these do not display a
 ** message (see the corresponding component). */
// class ItemAvailability {
//   key: string
//   isAvailable: boolean
//   isReCAP: boolean
//   aeonUrl: string
//   collectionAccessType: ItemCollectionAccess
//   isSpecRequestable?: boolean
//   isOnsite: boolean
//   hasBarcode: boolean
//   isPartnerReCAP: boolean

//   constructor({
//     isAvailable,
//     isReCAP,
//     aeonUrl,
//     collectionAccessType,
//     isSpecRequestable,
//     hasBarcode,
//     isPartnerReCAP,
//   }) {
//     this.isReCAP = isReCAP
//     this.isAvailable = isAvailable
//     this.collectionAccessType = collectionAccessType
//     this.aeonUrl = aeonUrl
//     this.isOnsite = !this.isReCAP
//     this.isSpecRequestable = isSpecRequestable
//     this.hasBarcode = hasBarcode
//     this.isPartnerReCAP = isPartnerReCAP
//     this.key = this.buildKey()
//   }
//   buildKey() {
//     if (
//       this.collectionAccessType === "desk" &&
//       this.isAvailable &&
//       this.isOnsite
//     ) {
//       return AVAILABLE_DESK
//     }
//     if (
//       this.collectionAccessType === "desk" &&
//       !this.isAvailable &&
//       this.isOnsite
//     ) {
//       return NOT_AVAILABLE_DESK
//     }
//     if (
//       this.collectionAccessType === "shelf" &&
//       this.isAvailable &&
//       this.isOnsite
//     ) {
//       return AVAILABLE_SHELF
//     }
//     if (
//       this.collectionAccessType === "shelf" &&
//       !this.isAvailable &&
//       this.isOnsite
//     ) {
//       return NOT_AVAILABLE_SHELF
//     }
//     if (
//       !this.hasBarcode &&
//       !this.aeonUrl &&
//       this.isOnsite &&
//       this.isAvailable
//     ) {
//       return AVAILABLE_CLOSED_STACK_NO_BARCODE
//     }
//     if (
//       !this.hasBarcode &&
//       !this.aeonUrl &&
//       this.isOnsite &&
//       !this.isAvailable
//     ) {
//       return NOT_AVAILABLE_CLOSED_STACK_NO_BARCODE
//     }

//     if (this.isReCAP && this.isAvailable && this.isPartnerReCAP) {
//       return AVAILABLE_OFFSITE_PARTNER
//     }
//     if (this.isReCAP && !this.isAvailable && this.isPartnerReCAP) {
//       return NOT_AVAILABLE_OFFSITE_PARTNER
//     }

//     if (
//       this.isReCAP &&
//       this.isAvailable &&
//       !this.isPartnerReCAP &&
//       !this.isSpecRequestable
//     ) {
//       return AVAILABLE_OFFSITE_NYPL
//     }
//     if (
//       this.isReCAP &&
//       !this.isAvailable &&
//       !this.isPartnerReCAP &&
//       !this.isSpecRequestable
//     ) {
//       return NOT_AVAILABLE_OFFSITE_NYPL
//     }

//     if (
//       this.isSpecRequestable &&
//       !this.aeonUrl &&
//       this.isReCAP &&
//       !this.isPartnerReCAP &&
//       this.isAvailable
//     ) {
//       return AVAILABLE_OFFSITE_NYPL_APPT_NO_AEON
//     }
//     if (
//       this.isSpecRequestable &&
//       !this.aeonUrl &&
//       this.isReCAP &&
//       !this.isAvailable
//     ) {
//       return NOT_AVAILABLE_OFFSITE_NYPL_APPT_NO_AEON
//     }

//     if (
//       this.isSpecRequestable &&
//       this.aeonUrl &&
//       this.isReCAP &&
//       !this.isPartnerReCAP &&
//       this.isAvailable
//     ) {
//       return AVAILABLE_OFFSITE_NYPL_APPT_AEON
//     }
//     if (
//       this.isSpecRequestable &&
//       this.aeonUrl &&
//       this.isReCAP &&
//       !this.isAvailable
//     ) {
//       return NOT_AVAILABLE_OFFSITE_NYPL_APPT_AEON
//     }

//     if (
//       this.isSpecRequestable &&
//       this.aeonUrl &&
//       this.isOnsite &&
//       this.isAvailable
//     ) {
//       return AVAILABLE_ONSITE_APPT_AEON
//     }
//     if (
//       this.isSpecRequestable &&
//       this.aeonUrl &&
//       this.isOnsite &&
//       !this.isAvailable
//     ) {
//       return NOT_AVAILABLE_ONSITE_APPT_AEON
//     }
//     if (
//       this.isSpecRequestable &&
//       !this.aeonUrl &&
//       this.isOnsite &&
//       this.isAvailable
//     ) {
//       return AVAILABLE_ONSITE_APPT_NO_AEON
//     }
//     if (
//       this.isSpecRequestable &&
//       !this.aeonUrl &&
//       this.isOnsite &&
//       !this.isAvailable
//     ) {
//       return NOT_AVAILABLE_ONSITE_APPT_NO_AEON
//     }
//   }
// }

// export default ItemAvailability
