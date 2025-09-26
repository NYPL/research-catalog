import React from "react"
import userEvent from "@testing-library/user-event"

import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"
import { render, screen } from "../../utils/testUtils"
import ItemFilters from "./ItemFilters"
import Bib from "../../models/Bib"

describe("ItemFilters", () => {
  let filtersChangeMock: jest.Mock

  describe("ItemFilters with year filter", () => {
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
            status: ["Available"],
            year: [],
          }}
          filtersAreApplied={true}
          showDateFilter={true}
        />
      )
    })

    it("renders the Filter bar container", () => {
      expect(screen.getByTestId("item-filters-container")).toBeInTheDocument()
    })

    it("renders filters container with one MultiSelect per populated checkbox group", async () => {
      expect(screen.getByTestId("item-filters-container")).toBeInTheDocument()
      expect(screen.getByTestId("status-multi-select")).toBeInTheDocument()
    })

    it("renders the year search form when showDateFilter is true", async () => {
      expect(screen.getByLabelText("Search by year")).toBeInTheDocument()
    })

    it("calls the change handler when filter values are changed", async () => {
      await userEvent.click(
        screen.getByRole("button", {
          name: "Location, 1 item currently selected",
        })
      )
      const offsiteCheckbox = screen.getByRole("checkbox", {
        name: "Offsite",
      })

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
          item_status: "Available",
        },
        false
      )
    })
  })
  describe("ItemFilters no year filter", () => {
    it("does not render the year search form when showDateFilter is false", async () => {
      const bib = new Bib(bibWithItems.resource)
      filtersChangeMock = jest.fn()
      render(
        <ItemFilters
          itemAggregations={bib.itemAggregations}
          handleFiltersChange={filtersChangeMock}
          appliedFilters={{
            location: ["Offsite"],
            status: ["Available"],
            year: [],
          }}
          filtersAreApplied={true}
          showDateFilter={false}
        />
      )
      expect(screen.queryByLabelText("Search by year")).not.toBeInTheDocument()
    })
  })
})
