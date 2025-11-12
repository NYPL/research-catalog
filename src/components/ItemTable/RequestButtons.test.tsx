import React from "react"
import { render, screen } from "@testing-library/react"
import RequestButtons from "./RequestButtons"
import Item from "../../models/Item"
import SearchResultsBib from "../../models/SearchResultsBib"
import {
  itemPhysicallyRequestable,
  itemAvailableOnsite,
  itemEddRequestable,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

const parentBib = new SearchResultsBib(searchResultPhysicalItems)

describe("RequestButtons", () => {
  it("renders an appointment request link when aeon url is present", async () => {
    const item = new Item(itemPhysicallyRequestable, parentBib)
    render(<RequestButtons item={item} />)
    expect(
      screen.getByRole("link", {
        name: "Request Appointment, A history of spaghetti eating and cooking for: spaghetti dinner., no. 4 (2001)",
      })
    ).toHaveAttribute(
      "href",
      "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&Form=30&Title=Spaghetti+westerns.&Site=LPAMRAMI&CallNumber=*LDC+14245&ItemPlace=[New+York?]+:&ItemPublisher=DRG+Records+Inc.,&Date=p1995.&ItemInfo3=https://catalog.nypl.org/record=b19028235&ReferenceNumber=b190282356&ItemInfo1=USE+IN+LIBRARY&ItemNumber=33433085319782&ItemISxN=i265238791&Genre=Music+CD&Location=Performing+Arts+Music+Division"
    )
  })
  it("renders an onsite use request link when aeon url is not present and item is available", async () => {
    const item = new Item(itemAvailableOnsite, parentBib)
    render(<RequestButtons item={item} />)
    expect(
      screen.getByRole("link", {
        name: "Request for onsite use, A history of spaghetti eating and cooking for: spaghetti dinner.",
      })
    ).toHaveAttribute("href", "/hold/request/b12810991-i14119377")
  })
  it("renders an an request scan link if item is EDD requestable", async () => {
    const item = new Item(itemEddRequestable, parentBib)
    render(<RequestButtons item={item} />)
    expect(
      screen.getByRole("link", {
        name: "Request Scan, A history of spaghetti eating and cooking for: spaghetti dinner.",
      })
    ).toHaveAttribute("href", "/hold/request/b12810991-i15550040/edd")
  })
})
