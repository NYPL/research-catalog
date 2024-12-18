import React from "react"
import { render, screen } from "../../utils/testUtils"
import userEvent from "@testing-library/user-event"

import ItemAvailabilityModel from "../../models/ItemAvailability"

import ItemAvailability from "./ItemAvailability"
import Item from "../../models/Item"
import SearchResultsBib from "../../models/SearchResultsBib"
import FeedbackForm from "../FeedbackForm/FeedbackForm"
import {
  itemNYPLReCAP,
  itemPhysicallyRequestable,
  itemAvailableOnsite,
  itemUnavailable,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

const parentBib = new SearchResultsBib(searchResultPhysicalItems)

describe("ItemAvailability", () => {
  describe("special collections", () => {
    it("recap aeon", () => {
      // this item's metadata is not being used at all. it is here to satisfy
      const item = new Item(itemPhysicallyRequestable, parentBib)
      item.availability = new ItemAvailabilityModel({
        location: { endpoint: "abc", prefLabel: "spaghetti" },
        dueDate: "tomorrow",
        isAvailable: true,
        isReCAP: true,
        aeonUrl: "spaghetti.com",
        findingAid: null,
        itemMetadata: null,
        specialCollections: true,
      })
      render(<ItemAvailability item={item} />)
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
      screen.getByText("- Can be used on site. Please visit", { exact: false })
    ).toBeInTheDocument()
    expect(
      screen.getByText("New York Public Library - Schwarzman Building M2")
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
    expect(screen.getByText("contact a librarian")).toBeInTheDocument()
    expect(
      screen.getByText("for assistance.", { exact: false })
    ).toBeInTheDocument()
  })
  it("pre-populates the metadata in the feedback form for unavailable items", async () => {
    const item = new Item(itemUnavailable, parentBib)
    render(
      <>
        <ItemAvailability item={item} />
        <FeedbackForm />
      </>
    )
    const feedbackButton = screen.getByText("contact a librarian")
    await userEvent.click(feedbackButton)

    expect(
      screen.getByText(
        "You are asking for help or information about NCOV 2803 in this record."
      )
    ).toBeInTheDocument()
  })
})
