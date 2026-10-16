import { AVAILABILITY_KEYS } from "../../config/constants"
import ItemAvailability from "../ItemAvailability"

describe("ItemAvailability model", () => {
  describe("desk items", () => {
    it("returns AVAILABLE_DESK for available desk items", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: "desk",
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
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
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_DESK)
    })
  })

  describe("shelf items", () => {
    it("returns AVAILABLE_SHELF for available onsite shelf items", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: "shelf",
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
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
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_SHELF)
    })
  })

  describe("special collections appt needed with Aeon link", () => {
    it("returns AVAILABLE_APPT_AEON for available special collections items with an Aeon URL", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: "https://specialcollections.nypl.org/aeon",
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
        hasFindingAid: false,
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
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_APPT_AEON)
    })
  })

  describe("special collections appt needed without Aeon link", () => {
    it("returns AVAILABLE_APPT_NO_AEON_FINDING_AID when the bib has a finding aid", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
        hasFindingAid: true,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.AVAILABLE_APPT_NO_AEON_FINDING_AID
      )
    })

    it("returns AVAILABLE_APPT_NO_AEON_NO_FINDING_AID when the bib does not have finding aid", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.AVAILABLE_APPT_NO_AEON_NO_FINDING_AID
      )
    })

    it("returns NOT_AVAILABLE_APPT_NO_AEON_FINDING_AID when the bib does not have finding aid", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
        hasFindingAid: true,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_APPT_NO_AEON_FINDING_AID
      )
    })

    it("returns NOT_AVAILABLE_APPT_NO_AEON_NO_FINDING_AID when the bib does not have finding aid", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: true,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_APPT_NO_AEON_NO_FINDING_AID
      )
    })
  })

  describe("General collections, no barcode", () => {
    it("returns AVAILABLE_GENERAL_NO_BARCODE for available, onsite, general collections items without barcodes", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: false,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.AVAILABLE_GENERAL_NO_BARCODE
      )
    })

    it("returns NOT_AVAILABLE_GENERAL_NO_BARCODE for unavailable, onsite, general collections items without barcodes", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: false,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_GENERAL_NO_BARCODE
      )
    })
  })

  describe("Partner items", () => {
    it("returns AVAILABLE_PARTNER for available partner items (always in recap)", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: true,
        isPartnerReCAP: true,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_PARTNER)
    })

    it("returns NOT_AVAILABLE_PARTNER for unavailable partner items (always in recap)", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: true,
        isPartnerReCAP: true,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_PARTNER)
    })
  })

  describe("NYPL ReCAP", () => {
    it("returns AVAILABLE_OFFSITE_NYPL for available NYPL items stored in recap", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: true,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_OFFSITE_NYPL)
    })

    it("returns NOT_AVAILABLE_OFFSITE_NYPL for unavailable NYPL items stored in recap", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: true,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(
        AVAILABILITY_KEYS.NOT_AVAILABLE_OFFSITE_NYPL
      )
    })
  })

  describe("catch alls", () => {
    it("returns AVAILABLE_EDGE_CASE when no other rule matches an available item", () => {
      const availability = new ItemAvailability({
        isAvailable: true,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.AVAILABLE_EDGE_CASE)
    })

    it("returns NOT_AVAILABLE_EDGE_CASE when no other rule matches an unavailable item", () => {
      const availability = new ItemAvailability({
        isAvailable: false,
        isReCAP: false,
        isPartnerReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        isSpecRequestable: false,
        hasBarcode: true,
        hasFindingAid: false,
      })
      expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE_EDGE_CASE)
    })
  })
})
