import { AVAILABILITY_KEYS } from "../../config/constants"
import ItemAvailability from "../ItemAvailability"

describe("ItemAvailabilityFactory", () => {
  it("not available", () => {
    const availability = new ItemAvailability({
      isAvailable: false,
      isReCAP: false,
      aeonUrl: null,
      findingAid: null,
      isSpecRequestable: false,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.NOT_AVAILABLE)
  })
  it("recap not special collections", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: true,
      aeonUrl: null,
      findingAid: null,
      isSpecRequestable: false,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.RECAP_GENERAL_COLLECTIONS)
  })
  it("recap aeon", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: true,
      aeonUrl: "spaghetti.com",
      findingAid: null,
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.RECAP_AEON)
  })
  it("recap aeon finding aid", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: true,
      aeonUrl: "spaghetti.com",
      findingAid: "meatballs.com",
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.RECAP_AEON_FINDING_AID)
  })
  it("onsite aeon", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      aeonUrl: "spaghetti.com",
      findingAid: false,
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.ONSITE_AEON)
  })
  it("onsite aeon finding aid", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      aeonUrl: "spaghetti.com",
      findingAid: "meatballs.com",
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.ONSITE_AEON_FINDING_AID)
  })
  it("onsite finding aid - no aeon", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      aeonUrl: false,
      findingAid: "meatballs.com",
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.ONSITE_FINDING_AID)
  })
  it("recap finding aid - no aeon", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: true,
      aeonUrl: false,
      findingAid: "meatballs.com",
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(AVAILABILITY_KEYS.RECAP_FINDING_AID)
  })
  it("recap no finding aid no aeon", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: true,
      aeonUrl: false,
      findingAid: false,
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(
      AVAILABILITY_KEYS.RECAP_NO_FINDING_AID_NO_AEON
    )
  })
  it("recap no finding aid no aeon", () => {
    const availability = new ItemAvailability({
      isAvailable: true,
      isReCAP: false,
      aeonUrl: false,
      findingAid: false,
      isSpecRequestable: true,
    })
    expect(availability.key).toBe(
      AVAILABILITY_KEYS.ONSITE_NO_FINDING_AID_NO_AEON
    )
  })
})
