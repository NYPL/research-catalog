import React from "react"
import { render, screen } from "../../utils/testUtils"
import ItemAvailabilityModel from "../../models/ItemAvailability"
import ItemAvailability from "./ItemAvailability"
import Item from "../../models/Item"
import SearchResultsBib from "../../models/SearchResultsBib"
import {
  itemNYPLReCAP,
  itemPhysicallyRequestable,
  itemAvailableOnsite,
  itemUnavailable,
  shelfItemAvailable,
  deskItemAvailable,
  itemUnavailableDueDate,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

const parentBib = new SearchResultsBib(searchResultPhysicalItems)

describe("ItemAvailability", () => {
  describe("special collections", () => {
    it("edge case", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability.key = "edgeCase"
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("contact a librarian")).toBeInTheDocument()
      expect(
        screen.queryByText("Available by appointment")
      ).not.toBeInTheDocument()
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(
        screen.queryByText("Schwarzman Building - Main Reading Room 315")
      ).not.toBeInTheDocument()
    })
    it("onsite YES aeon YES finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: false,
        aeonUrl: "spaghetti.com",
        collectionAccessType: null,
        findingAid: "meatballs.com",
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment")).toBeInTheDocument()
      expect(screen.getByRole("link")).toHaveTextContent(
        "Schwarzman Building - Main Reading Room 315"
      )
    })
    it("recap YES aeon YES finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: true,
        collectionAccessType: null,
        aeonUrl: "spaghetti.com",
        findingAid: "meatballs.com",
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment.")).toBeInTheDocument()
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(
        screen.queryByText("Schwarzman Building - Main Reading Room 315")
      ).not.toBeInTheDocument()
    })
    it("recap YES aeon NO finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: true,
        collectionAccessType: null,
        aeonUrl: "spaghetti.com",
        findingAid: null,
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment.")).toBeInTheDocument()
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(
        screen.queryByText("Schwarzman Building - Main Reading Room 315")
      ).not.toBeInTheDocument()
    })
    it("onsite YES aeon NO finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: false,
        collectionAccessType: null,
        aeonUrl: "spaghetti.com",
        findingAid: null,
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment")).toBeInTheDocument()
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(
        screen.getByText("at Schwarzman Building - Main Reading Room 315.")
      ).toBeInTheDocument()
    })
    it("onsite NO aeon YES finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: false,
        collectionAccessType: null,
        aeonUrl: null,
        findingAid: "meatballs.com",
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment")).toBeInTheDocument()
      expect(screen.queryByRole("link")).toHaveTextContent("finding aid")
      expect(
        screen.getByText(
          "at Schwarzman Building - Main Reading Room 315. See the ",
          { exact: false }
        )
      ).toBeInTheDocument()
    })
    it("recap NO aeon YES finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: true,
        collectionAccessType: null,
        aeonUrl: null,
        findingAid: "meatballs.com",
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment.")).toBeInTheDocument()
      expect(screen.queryByRole("link")).toHaveTextContent("finding aid")
      expect(
        screen.queryByText("Schwarzman Building - Main Reading Room 315", {
          exact: false,
        })
      ).not.toBeInTheDocument()
    })
    it("recap NO aeon NO finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: true,
        collectionAccessType: null,
        aeonUrl: null,
        findingAid: null,
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment.")).toBeInTheDocument()
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(
        screen.queryByText("Schwarzman Building - Main Reading Room 315", {
          exact: false,
        })
      ).not.toBeInTheDocument()
      expect(screen.getByText("contact a librarian")).toBeInTheDocument()
    })
    it("onsite NO aeon NO finding aid", () => {
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        isAvailable: true,
        isReCAP: false,
        aeonUrl: null,
        collectionAccessType: null,
        findingAid: null,
        isSpecRequestable: true,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Available by appointment")).toBeInTheDocument()
      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(
        screen.queryByText("Schwarzman Building - Main Reading Room 315.", {
          exact: false,
        })
      ).toBeInTheDocument()
      expect(screen.getByText("contact a librarian")).toBeInTheDocument()
    })
  })

  it("renders the correct link when item is available, is reCAP, and does not have an aeon url", async () => {
    const item = new Item(itemNYPLReCAP, parentBib)
    render(<ItemAvailability item={item} />)
    expect(
      screen.getByText("How do I pick up this item and when will it be ready?")
    ).toHaveAttribute(
      "href",
      "https://www.nypl.org/help/request-research-materials"
    )
  })
  it("renders the correct text for an available onsite item", async () => {
    const item = new Item(itemAvailableOnsite, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Available")).toBeInTheDocument()
    expect(
      screen.getByText("- Can be used onsite. Please visit", { exact: false })
    ).toBeInTheDocument()
    expect(
      screen.getByText("New York Public Library - Schwarzman Building M2")
    ).toHaveAttribute("href", "https://www.nypl.org/locations/schwarzman")
    expect(
      screen.getByText("to submit a request in person.", { exact: false })
    ).toBeInTheDocument()
  })
  it("renders the correct text for an available shelf reference item", async () => {
    const shelfItem = new Item(shelfItemAvailable, parentBib)
    render(<ItemAvailability item={shelfItem} />)
    expect(
      screen.getByText(/Item located on open reference shelves/)
    ).toBeInTheDocument()
  })
  it("renders the correct text for an available desk reference item", async () => {
    const deskItem = new Item(deskItemAvailable, parentBib)
    render(<ItemAvailability item={deskItem} />)
    expect(screen.getByText(/Item located at service desk/)).toBeInTheDocument()
  })
  it("renders the correct text for unavailable items", async () => {
    const item = new Item(itemUnavailable, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Not available")).toBeInTheDocument()
    expect(
      screen.getByText(/Please contact the division for assistance/)
    ).toBeInTheDocument()
  })
  it("renders the correct text for unavailable NYPL items with a known due date", async () => {
    const item = new Item(itemUnavailableDueDate, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Not available")).toBeInTheDocument()
    // Due date on the item is 2024-07-07.
    expect(
      screen.getByText(
        /In use through July 7, 2024. Please contact the division for assistance/
      )
    ).toBeInTheDocument()
  })
})
