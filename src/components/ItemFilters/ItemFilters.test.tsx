import React from "react"
import { render, screen } from "@testing-library/react"
import mockRouter from "next-router-mock"

import FiltersContainer from "./FiltersContainer"
import userEvent from "@testing-library/user-event"

import { normalAggs } from "../../../__test__/fixtures/testAggregations"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Filters container", () => {
  beforeEach(() => {
    mockRouter.query = {}
  })

  it("renders a single filter", () => {
    render(<FiltersContainer itemAggs={[normalAggs[0]]} />)
    const filters = screen.getAllByTestId(/item-filter/)
    expect(filters.length).toBe(1)
  })
  it("renders three filter boxes", () => {
    render(<FiltersContainer itemAggs={normalAggs} />)
    const filters = screen.getAllByTestId(/item-filter/)
    expect(filters.length).toBe(3)
  })

  it("loads the query into state", async () => {
    mockRouter.query = {
      item_location: "loc:rc2ma",
      item_format: "Text",
      item_status: "status:a",
    }
    render(<FiltersContainer itemAggs={normalAggs} />)
    const { locationFilterButton, statusFilterButton, formatFilterButton } =
      filterButtons()
    await filterHasSelected(locationFilterButton, ["Offsite"])
    await filterHasSelected(formatFilterButton, ["Text"])
    await filterHasSelected(statusFilterButton, ["Available"])
  })

  it("closes open filters when user clicks outside of the filter", async () => {
    render(<FiltersContainer itemAggs={normalAggs} />)
    const { locationFilterButton } = filterButtons()
    const outsideOfTheFilter = screen.getByTestId("filter-text")

    await userEvent.click(locationFilterButton)
    const offsiteCheckbox = screen.getByRole("checkbox", {
      name: "Offsite",
    })
    await userEvent.click(offsiteCheckbox)
    await userEvent.click(outsideOfTheFilter)
    expect(offsiteCheckbox).not.toBeInTheDocument()
  })

  it("clears selection per filter", async () => {
    mockRouter.query = {
      item_location: "loc:rc2ma",
      item_format: "Text",
      item_status: "status:a,status:na",
    }
    render(<FiltersContainer itemAggs={normalAggs} />)
    const { locationFilterButton, statusFilterButton, formatFilterButton } =
      filterButtons()

    // the values start selected
    await filterHasSelected(locationFilterButton, ["Offsite"])
    await filterHasSelected(formatFilterButton, ["Text"])
    await filterHasSelected(statusFilterButton, ["Available", "Not available"])
    const clearStatusButton = screen.getByTestId("clear-status-button")

    await userEvent.click(clearStatusButton)
    // these filters should be unchanged
    await filterHasSelected(locationFilterButton, ["Offsite"])
    await filterHasSelected(formatFilterButton, ["Text"])

    // Status values should be unchecked
    await filterHasNotSelected(statusFilterButton, [
      "Available",
      "Not available",
    ])
  })

  it("does not persist selection if filter closes without applying", async () => {
    render(<FiltersContainer itemAggs={normalAggs} />)
    const { locationFilterButton, statusFilterButton } = filterButtons()
    await userEvent.click(locationFilterButton)
    const checkbox = screen.getAllByRole("checkbox")[0]
    await userEvent.click(checkbox)

    // clicking other filter label closes the location filter
    await userEvent.click(statusFilterButton)
    await userEvent.click(locationFilterButton)
    const applyButton = screen.getByTestId("clear-location-button")
    expect(applyButton).toBeDisabled()
  })

  it("persists previously applied selection after closing filter without applying", async () => {
    mockRouter.query = {
      item_location: "loc:rc2ma",
      item_format: "Text",
      item_status: "status:a,status:na",
    }
    render(<FiltersContainer itemAggs={normalAggs} />)
    const { locationFilterButton, statusFilterButton } = filterButtons()
    await userEvent.click(locationFilterButton)
    const checkbox = screen.getByLabelText(/Main Reading Room/)
    const offsiteCheckbox = screen.getByLabelText("Offsite")
    // uncheck Offsite (set from query parsing)
    await userEvent.click(offsiteCheckbox)
    // check another location
    await userEvent.click(checkbox)
    // don't apply

    // clicking other filter label closes the location filter
    await userEvent.click(statusFilterButton)
    await userEvent.click(locationFilterButton)

    filterHasSelected(locationFilterButton, ["Offsite"])
    filterHasNotSelected(locationFilterButton, [
      "Schwarzman Building - Main Reading Room 315",
    ])
  })
})

const filterHasSelected = async (checkboxGroupButton, values: string[]) => {
  await userEvent.click(checkboxGroupButton)
  const selectedValues = values.map((label) => screen.getByLabelText(label))
  const checkboxes = screen.getAllByRole("checkbox", { checked: true })
  expect(checkboxes.length).toBe(values.length)
  selectedValues.forEach((checkbox) => {
    expect(checkbox).toBeChecked()
  })
}

const filterButtons = () => {
  const locationFilterButton = screen.getByTestId("location-item-filter")
  const statusFilterButton = screen.getByTestId("status-item-filter")
  const formatFilterButton = screen.getByTestId("format-item-filter")

  return {
    locationFilterButton,
    statusFilterButton,
    formatFilterButton,
  }
}

const filterHasNotSelected = async (checkboxGroupButton, values: string[]) => {
  await userEvent.click(checkboxGroupButton)
  const selectedValues = values.map((label) => screen.getByLabelText(label))
  selectedValues.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked()
  })
}
