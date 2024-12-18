import { availabilityKeys } from "../../config/constants"
import ItemAvailability from "../ItemAvailability"

describe("ItemAvailabilityFactory", () => {
  it("not available", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: false,
      isReCAP: false,
      aeonUrl: null,
      findingAid: null,
      itemMetadata: null,
      specialCollections: false,
    })
    expect(availability.key).toBe(availabilityKeys.NOT_AVAILABLE)
  })
  it("recap not special collections", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: true,
      aeonUrl: null,
      findingAid: null,
      itemMetadata: null,
      specialCollections: false,
    })
    expect(availability.key).toBe(availabilityKeys.RECAP_GENERAL_COLLECTIONS)
  })
  it("recap aeon", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: true,
      aeonUrl: "spaghetti.com",
      findingAid: null,
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.RECAP_AEON)
  })
  it("recap aeon finding aid", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: true,
      aeonUrl: "spaghetti.com",
      findingAid: "meatballs.com",
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.RECAP_AEON_FINDING_AID)
  })
  it("onsite aeon", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: false,
      aeonUrl: "spaghetti.com",
      findingAid: false,
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.ONSITE_AEON)
  })
  it("onsite aeon finding aid", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: false,
      aeonUrl: "spaghetti.com",
      findingAid: "meatballs.com",
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.ONSITE_AEON_FINDING_AID)
  })
  it("onsite finding aid - no aeon", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: false,
      aeonUrl: false,
      findingAid: "meatballs.com",
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.ONSITE_FINDING_AID)
  })
  it("recap finding aid - no aeon", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: true,
      aeonUrl: false,
      findingAid: "meatballs.com",
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.RECAP_FINDING_AID)
  })
  it("recap no finding aid no aeon", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: true,
      aeonUrl: false,
      findingAid: false,
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(availabilityKeys.RECAP_NO_FINDING_AID_NO_AEON)
  })
  it("recap no finding aid no aeon", () => {
    const availability = new ItemAvailability({
      location: { endpoint: "abc", prefLabel: "spaghetti" },
      dueDate: "tomorrow",
      isAvailable: true,
      isReCAP: false,
      aeonUrl: false,
      findingAid: false,
      itemMetadata: null,
      specialCollections: true,
    })
    expect(availability.key).toBe(
      availabilityKeys.ONSITE_NO_FINDING_AID_NO_AEON
    )
  })
})
