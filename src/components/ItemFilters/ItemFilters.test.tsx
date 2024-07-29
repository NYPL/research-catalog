import React from "react"

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

  it("renders multi select container with 3 multi selects corresponding to filter categories", async () => {
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
})
