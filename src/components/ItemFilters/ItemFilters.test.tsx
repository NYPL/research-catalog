import React from "react"
import { render, screen, act } from "@testing-library/react"
import mockRouter from "next-router-mock"

import FiltersContainer from "./FiltersContainer"
import userEvent from "@testing-library/user-event"

import aggs from "../../../__test__/fixtures/testAggregations"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Filters container", () => {
  beforeEach(() => {
    mockRouter.query = {}
  })

  it("renders a single filter", () => {
    render(<FiltersContainer itemAggs={[aggs[0]]} />)
    const filters = screen.getAllByTestId(/item-filter/)
    expect(filters.length).toBe(1)
  })
  it("renders three filter boxes", () => {
    render(<FiltersContainer itemAggs={aggs} />)
    const filters = screen.getAllByTestId(/item-filter/)
    expect(filters.length).toBe(3)
  })

  it("loads the query into state", async () => {
    mockRouter.query = {
      item_location: "loc:rc2ma",
      item_format: "Text",
      item_status: "status:a",
    }
    render(<FiltersContainer itemAggs={aggs} />)
    const [
      locationCheckboxGroupButton,
      statusCheckboxGroupButton,
      formatCheckboxGroupButton,
    ] = filterButtons()
    await filterHasSelected(locationCheckboxGroupButton, ["Offsite"])
    await filterHasSelected(formatCheckboxGroupButton, ["Text"])
    await filterHasSelected(statusCheckboxGroupButton, ["Available"])
  })

  it("clears selection per filter", async () => {
    mockRouter.query = {
      item_location: "loc:rc2ma",
      item_format: "Text",
      item_status: "status:a,status:na",
    }
    render(<FiltersContainer itemAggs={aggs} />)
    const [
      locationCheckboxGroupButton,
      statusCheckboxGroupButton,
      formatCheckboxGroupButton,
    ] = filterButtons()

    // the values start selected
    await filterHasSelected(locationCheckboxGroupButton, ["Offsite"])
    await filterHasSelected(formatCheckboxGroupButton, ["Text"])
    await filterHasSelected(statusCheckboxGroupButton, [
      "Available",
      "Not available",
    ])
    const clearStatusButton = screen.getByTestId("clear-status-button")

    await act(async () => {
      await userEvent.click(clearStatusButton)
      // these filters should be unchanged
      await filterHasSelected(locationCheckboxGroupButton, ["Offsite"])
      await filterHasSelected(formatCheckboxGroupButton, ["Text"])

      // Status values should be unchecked
      await filterNotSelected(statusCheckboxGroupButton, [
        "Available",
        "Not available",
      ])
    })
  })

  it("does not persist selection if filter closes without applying", async () => {
    render(<FiltersContainer itemAggs={aggs} />)
    const [locationCheckboxGroupButton, statusCheckboxGroupButton] =
      filterButtons()
    await act(async () => {
      await userEvent.click(locationCheckboxGroupButton)
      const checkbox = screen.getAllByRole("checkbox")[0]
      await userEvent.click(checkbox)

      // clicking other filter label closes the location filter
      await userEvent.click(statusCheckboxGroupButton)
      await userEvent.click(locationCheckboxGroupButton)
      console.log("open location second time")
      const applyButton = screen.getByTestId("clear-location-button")
      expect(applyButton).toBeDisabled()
    })
  })
})

const filterHasSelected = async (checkboxGroupButton, values: string[]) => {
  await act(async () => {
    await userEvent.click(checkboxGroupButton)
    const selectedValues = values.map((label) => screen.getByLabelText(label))
    const checkboxes = screen.getAllByRole("checkbox", { checked: true })
    expect(checkboxes.length).toBe(values.length)
    selectedValues.forEach((checkbox) => {
      expect(checkbox).toBeChecked()
    })
  })
}

const filterButtons = () => {
  const locationCheckboxGroupButton = screen.getByTestId("location-item-filter")
  const statusCheckboxGroupButton = screen.getByTestId("status-item-filter")
  const formatCheckboxGroupButton = screen.getByTestId("format-item-filter")

  return [
    locationCheckboxGroupButton,
    statusCheckboxGroupButton,
    formatCheckboxGroupButton,
  ]
}

const filterNotSelected = async (checkboxGroupButton, values: string[]) => {
  await act(async () => {
    await userEvent.click(checkboxGroupButton)
    const selectedValues = values.map((label) => screen.getByLabelText(label))
    selectedValues.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })
}
