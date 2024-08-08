import React from "react"
import userEvent from "@testing-library/user-event"

import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"
import { render, screen } from "../../utils/testUtils"
import ItemFilters from "./ItemFilters"
import Bib from "../../models/Bib"

describe("ItemFilters", () => {
  beforeEach(() => {
    const bib = new Bib(bibWithItems.resource)
    const filtersChangeMock = jest.fn()
    render(
      <ItemFilters
        itemAggregations={bib.itemAggregations}
        handleFiltersChange={filtersChangeMock}
        appliedFilters={{ location: [], format: [], status: [], year: [] }}
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
    expect(screen.getByLabelText("Search by Year")).toBeInTheDocument()
  })

  it("renders apply filters button", async () => {
    expect(
      screen.getByText("Apply filters", { selector: "button" })
    ).toBeInTheDocument()
  })

  it.skip("closes open filters when user clicks outside of the filter", async () => {
    const outsideOfTheFilter = screen.getByTestId("year-filter-label")

    await userEvent.click(screen.getByTestId("location-item-filter"))
    const offsiteCheckbox = screen.getByLabelText("Offsite")
    await userEvent.click(offsiteCheckbox)
    await userEvent.click(outsideOfTheFilter)
    expect(offsiteCheckbox).not.toBeInTheDocument()
  })
})
