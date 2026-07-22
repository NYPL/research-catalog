import React from "react"
import { render, screen } from "../../utils/testUtils"
import ItemAvailability from "./ItemAvailability"
import Item from "../../models/Item"
import SearchResultsBib from "../../models/SearchResultsBib"
import { AVAILABILITY_KEYS } from "../../config/constants"
import {
  itemNYPLReCAP,
  itemPhysicallyRequestable,
  itemAvailableOnsite,
  itemUnavailable,
  shelfItemAvailable,
  deskItemAvailable,
  itemUnavailableDueDate,
  itemUnavailablePartner,
  itemSpecialCollectionsAppt,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

const parentBib = new SearchResultsBib(searchResultPhysicalItems)

describe("ItemAvailability", () => {
  it("renders the correct text for an available offsite item", async () => {
    const item = new Item(itemNYPLReCAP, parentBib)
    render(<ItemAvailability item={item} />)
    expect(
      screen.getByText("Item stored offsite and must be requested in advance.")
    ).toBeInTheDocument()
  })

  it("renders nothing for an available onsite general item", async () => {
    const item = new Item(itemAvailableOnsite, parentBib)
    const { container } = render(<ItemAvailability item={item} />)
    expect(container).toBeEmptyDOMElement()
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

  it("renders the correct text for unavailable NYPL items", async () => {
    const item = new Item(itemUnavailable, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Not available")).toBeInTheDocument()
    expect(
      screen.getByText(/Please contact the division for assistance/)
    ).toBeInTheDocument()
  })

  it("renders the correct text for unavailable partner items", async () => {
    const item = new Item(itemUnavailablePartner, parentBib)
    render(<ItemAvailability item={item} />)
    expect(screen.getByText("Not available")).toBeInTheDocument()
    expect(screen.getByText(/contact a librarian/)).toBeInTheDocument()
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

  it("renders the correct text for available onsite special collections items requiring an appointment", async () => {
    const item = new Item(itemSpecialCollectionsAppt, parentBib)
    item.availability.key = AVAILABILITY_KEYS.AVAILABLE_ONSITE_APPT_NO_AEON
    render(<ItemAvailability item={item} />)
    expect(
      screen.getByText(
        "Please contact the division to schedule an appointment."
      )
    ).toBeInTheDocument()
  })

  it("renders nothing for available onsite special collections items with aeon link", async () => {
    const aeonItem = { ...itemPhysicallyRequestable, specRequestable: true }
    const item = new Item(aeonItem, parentBib)
    const { container } = render(<ItemAvailability item={item} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders the correct text for available closed stack items without barcode", async () => {
    const noBarcodeItem = {
      ...itemAvailableOnsite,
      idBarcode: undefined,
      specRequestable: true,
    }
    const item = new Item(noBarcodeItem, parentBib)
    render(<ItemAvailability item={item} />)
    expect(
      screen.getByText("Please contact the division to request this item.")
    ).toBeInTheDocument()
  })
})
