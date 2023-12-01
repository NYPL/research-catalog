import React from "react"
import { render, screen } from "@testing-library/react"
import ItemAvailability from "./ItemAvailability"
import Item from "../../models/Item"
import SearchResultsBib from "../../models/SearchResultsBib"
import {
  itemNYPLReCAP,
  itemPhysicallyRequestable,
  itemAvailableOnsite,
  itemUnavailable,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

const parentBib = new SearchResultsBib(searchResultPhysicalItems)

describe("ItemAvailability", () => {
  it("renders the correct link when item is available, is reCAP, and does not have an aeon url", async () => {
    const item = new Item(itemNYPLReCAP, parentBib)
    render(<ItemAvailability item={item} />)
    expect(
      screen.getByRole("link", {
        name: "How do I pick up this item and when will it be ready?",
      })
    ).toHaveAttribute(
      "href",
      "https://www.nypl.org/help/request-research-materials"
    )
  })
  it("renders the correct text when item is available, has an aeon url, and has a location endpoint", async () => {
    const item = new Item(itemPhysicallyRequestable, parentBib)
    render(<ItemAvailability item={item} />)
    screen.getByText(/Available by appointment/)
    expect(
      screen.getByRole("link", {
        name: "Schwarzman Building - Main Reading Room 315",
      })
    ).toHaveAttribute("href", "https://www.nypl.org/locations/schwarzman")
  })
  it("renders the correct text for an available onsite item", async () => {
    const item = new Item(itemAvailableOnsite, parentBib)
    render(<ItemAvailability item={item} />)
    screen.getByText(/Available/)
    screen.getByText(/- Can be used on site. Please visit/)
    expect(
      screen.getByRole("link", {
        name: "New York Public Library - Schwarzman Building M2",
      })
    ).toHaveAttribute("href", "https://www.nypl.org/locations/schwarzman")
    screen.getByText(/to submit a request in person./)
  })
  it("renders the correct text for unavailable items", async () => {
    const item = new Item(itemUnavailable, parentBib)
    render(<ItemAvailability item={item} />)
    screen.getByText(/Not available/)
    screen.getByText(/- Please/)
    screen.getByRole("button", {
      name: "contact a librarian",
    })
    screen.getByText(/for assistance./)
  })
})
