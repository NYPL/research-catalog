import { AVAILABILITY_KEYS } from "../../config/constants"
import ItemAvailability from "../ItemAvailability"

describe("ItemAvailability model", () => {
  it("returns NOT_AVAILABLE_PARTNER for unavailable partner ReCAP items", () => {
    const availability = new ItemAvailability({
      isAvailable: false,
      isReCAP: true,
      isPartnerReCAP: true,
      aeonUrl: null,
      collectionAccessType: null,
      isSpecRequestable: false,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_PARTNER)
  })

  it("returns NOT_AVAILABLE for unavailable NYPL items", () => {
    const availability = new ItemAvailability({
      isAvailable: false,
      isReCAP: false,
      isPartnerReCAP: false,
      aeonUrl: null,
      collectionAccessType: null,
      isSpecRequestable: false,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE)
  })

  it("returns AVAILABLE_DESK for desk collection access items", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      isPartnerReCAP: false,
      aeonUrl: null,
      collectionAccessType: "desk",
      isSpecRequestable: false,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_DESK)
  })

  it("returns AVAILABLE_SHELF for shelf collection access items", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      isPartnerReCAP: false,
      aeonUrl: null,
      collectionAccessType: "shelf",
      isSpecRequestable: false,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_SHELF)
  })

  it("returns AVAILABLE_OFFSITE for offsite/ReCAP items", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: true,
      isPartnerReCAP: false,
      aeonUrl: null,
      collectionAccessType: null,
      isSpecRequestable: false,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_OFFSITE)
  })

  it("returns AVAILABLE_GENERAL for available general collections items", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      isPartnerReCAP: false,
      aeonUrl: null,
      collectionAccessType: null,
      isSpecRequestable: false,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_GENERAL)
  })

  it("returns AVAILABLE_ONSITE_APPT_AEON for onsite special collections items with Aeon URLs", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      isPartnerReCAP: false,
      aeonUrl: "https://specialcollections.nypl.org/aeon",
      collectionAccessType: null,
      isSpecRequestable: true,
      hasBarcode: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_ONSITE_APPT_AEON)
  })

  it("returns AVAILABLE_CLOSED_STACK_NO_BARCODE for onsite special collections items without barcodes", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      isPartnerReCAP: false,
      aeonUrl: null,
      collectionAccessType: null,
      isSpecRequestable: true,
      hasBarcode: false,
    })
    expect(availability.key).toBe(
      AVAILABILITY_KEYS.AVAILABLE_CLOSED_STACK_NO_BARCODE
    )
  })

  // it("returns AVAILABLE_CLOSED_STACK for onsite special collections items with barcodes", () => {
  //   const availability = new ItemAvailability({
  //     isAvailable: true,
  //     isReCAP: false,
  //     isPartnerReCAP: false,
  //     aeonUrl: null,
  //     collectionAccessType: null,
  //     isSpecRequestable: true,
  //     hasBarcode: true,
  //   })
  //   expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_CLOSED_STACK)
  // })
})
