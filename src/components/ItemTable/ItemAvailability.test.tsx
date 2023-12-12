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
    expect(screen.getByText("Available by appointment")).toBeInTheDocument()
    expect(
      screen.getByRole("link", {
        name: "Schwarzman Building - Main Reading Room 315",
      })
    ).toHaveAttribute("href", "https://www.nypl.org/locations/schwarzman")
  })
  it("renders the correct text for an available onsite item", async () => {
    const item = new Item(itemAvailableOnsite, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Available")).toBeInTheDocument()
    expect(
      screen.getByText("- Can be used on site. Please visit", { exact: false })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", {
        name: "New York Public Library - Schwarzman Building M2",
      })
    ).toHaveAttribute("href", "https://www.nypl.org/locations/schwarzman")
    expect(
      screen.getByText("to submit a request in person.", { exact: false })
    ).toBeInTheDocument()
  })
  it("renders the correct text for unavailable items", async () => {
    const item = new Item(itemUnavailable, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Not available")).toBeInTheDocument()
    expect(screen.getByText("- Please", { exact: false })).toBeInTheDocument()
    screen.getByRole("button", {
      name: "contact a librarian",
    })
    expect(
      screen.getByText("for assistance.", { exact: false })
    ).toBeInTheDocument()
  })
})
