import React from "react"
import userEvent from "@testing-library/user-event"

import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"
import { render, screen } from "../../utils/testUtils"
import ItemFilters from "./ItemFilters"
import Bib from "../../models/Bib"

describe("ItemFilters", () => {
  let filtersChangeMock: jest.Mock
  beforeEach(() => {
    const bib = new Bib(bibWithItems.resource)
    filtersChangeMock = jest.fn()
    render(
      <ItemFilters
        itemAggregations={bib.itemAggregations}
        handleFiltersChange={filtersChangeMock}
        appliedFilters={{
          location: ["Offsite"],
          format: ["Text"],
          status: ["Available"],
          year: [],
        }}
        filtersAreApplied={true}
      />
    )
  })

  it("renders the Filter bar container", () => {
    expect(screen.getByTestId("item-filters-container")).toBeInTheDocument()
  })

  it("renders filters container with one MultiSelect per populated checkbox group", async () => {
    expect(screen.getByTestId("item-filters-container")).toBeInTheDocument()
    expect(screen.getByTestId("format-multi-select")).toBeInTheDocument()
    expect(screen.getByTestId("status-multi-select")).toBeInTheDocument()
  })

  it("renders the year search form", async () => {
    expect(screen.getByLabelText("Search by year")).toBeInTheDocument()
  })

  it("closes open filters when user clicks outside of the filter", async () => {
    const outsideOfTheFilter = screen.getByLabelText("Search by year")

    const locationFilterButton = screen
      .getByTestId("location-multi-select")
      .querySelector("button")
    await userEvent.click(locationFilterButton)

    expect(locationFilterButton).toHaveAttribute("aria-expanded", "true")

    await userEvent.click(outsideOfTheFilter)
    expect(locationFilterButton).toHaveAttribute("aria-expanded", "false")
  })

  it("calls the change handler when filter values are changed", async () => {
    await userEvent.click(screen.getByTestId("location-multi-select"))
    const offsiteCheckbox = screen.getByLabelText("Offsite")

    await userEvent.click(offsiteCheckbox)

    expect(filtersChangeMock).toHaveBeenCalledTimes(1)

    await userEvent.click(offsiteCheckbox)
    expect(filtersChangeMock).toHaveBeenCalledTimes(2)
  })

  it("renders TagSet data when filters are applied and removes the filter when tag is clicked", async () => {
    expect(screen.queryByText("Active filters")).toBeInTheDocument()
    await userEvent.click(
      screen.getByLabelText("Location > Offsite, click to remove filter")
    )
    expect(filtersChangeMock).toHaveBeenCalledWith(
      {
        item_format: "Text",
        item_status: "Available",
      },
      false
    )
  })
})
