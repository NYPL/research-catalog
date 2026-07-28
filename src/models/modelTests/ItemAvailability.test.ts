import { AVAILABILITY_KEYS } from "../../config/constants"
import ItemAvailability from "../ItemAvailability"

describe("ItemAvailability model", () => {
  describe("Desk collection access", () => {
    it("returns AVAILABLE_DESK for available desk items", () => {
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

    it("returns NOT_AVAILABLE_DESK for unavailable desk items", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: "desk",
        isSpecRequestable: false,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_DESK)
    })
  })

  describe("Shelf collection access", () => {
    it("returns AVAILABLE_SHELF for available onsite shelf items", () => {
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

    it("returns NOT_AVAILABLE_SHELF for unavailable onsite shelf items", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: "shelf",
        isSpecRequestable: false,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_SHELF)
    })
  })

  describe("General collections closed stack no barcode", () => {
    it("returns AVAILABLE_CLOSED_STACK_NO_BARCODE for available, onsite, general collections items without barcodes", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.AVAILABLE_CLOSED_STACK_NO_BARCODE
      )
    })

    it("returns NOT_AVAILABLE_CLOSED_STACK_NO_BARCODE for unavailable, onsite, general collections items without barcodes", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_CLOSED_STACK_NO_BARCODE
      )
    })
  })

  describe("Partner ReCAP", () => {
    it("returns AVAILABLE_OFFSITE_PARTNER for available partner ReCAP items", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: true,
        isPartnerReCAP: true,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_OFFSITE_PARTNER)
    })

    it("returns NOT_AVAILABLE_OFFSITE_PARTNER for unavailable partner ReCAP items", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: true,
        isPartnerReCAP: true,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_OFFSITE_PARTNER
      )
    })
  })

  describe("NYPL ReCAP", () => {
    it("returns AVAILABLE_OFFSITE_NYPL for available NYPL ReCAP items (special or general)", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: true,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_OFFSITE_NYPL)
    })

    it("returns NOT_AVAILABLE_OFFSITE_NYPL for unavailable NYPL ReCAP items (special or general)", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: true,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_OFFSITE_NYPL
      )
    })
  })

  describe("special collections appt needed", () => {
    it("returns AVAILABLE_APPT_AEON for available special collections items with an Aeon URL", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: "https://specialcollections.nypl.org/aeon",
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_APPT_AEON)
    })

    it("returns NOT_AVAILABLE_APPT_AEON for unavailable special collections items with an Aeon URL", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: "https://specialcollections.nypl.org/aeon",
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_APPT_AEON)
    })
  })

  describe("special collections appt needed no aeon link", () => {
    it("returns AVAILABLE_APPT_NO_AEON for available special collections items without an Aeon URL", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_APPT_NO_AEON)
    })

    it("returns NOT_AVAILABLE_APPT_NO_AEON for unavailablespecial collections items without an Aeon URL", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_APPT_NO_AEON
      )
    })
  })
})
