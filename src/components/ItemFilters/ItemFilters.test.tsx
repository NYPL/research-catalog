import React from "react"
import { render, screen } from "@testing-library/react"

import FiltersContainer from "./FiltersContainer"
import userEvent from "@testing-library/user-event"

import { normalAggs } from "../../../__test__/fixtures/testAggregations"

describe("Filters container", () => {
  it("renders a single filter", () => {
    render(<FiltersContainer itemAggregations={[normalAggs[0]]} />)
    const filters = screen.getAllByTestId(/item-filter/)
    expect(filters.length).toBe(1)
  })
  it("renders three filter boxes", () => {
    render(<FiltersContainer itemAggregations={normalAggs} />)
    const filters = screen.getAllByTestId(/item-filter/)
    expect(filters.length).toBe(3)
  })

  it("renders the correct checkboxes for the applied filters", async () => {
    render(
      <FiltersContainer
        itemAggregations={normalAggs}
        appliedFilters={{
          location: ["Offsite"],
          format: ["Text"],
          status: ["status:a"],
          year: ["2005"],
        }}
      />
    )
    const { locationFilterButton, statusFilterButton, formatFilterButton } =
      filterButtons()
    await filterHasSelected(locationFilterButton, ["Offsite"])
    await filterHasSelected(formatFilterButton, ["Text"])
    await filterHasSelected(statusFilterButton, ["Available"])
  })

  it("closes open filters when user clicks outside of the filter", async () => {
    render(<FiltersContainer itemAggregations={normalAggs} />)
    const { locationFilterButton } = filterButtons()
    const outsideOfTheFilter = screen.getByTestId("year-filter-label")

    await userEvent.click(locationFilterButton)
    const offsiteCheckbox = screen.getByLabelText("Offsite")
    await userEvent.click(offsiteCheckbox)
    await userEvent.click(outsideOfTheFilter)
    expect(offsiteCheckbox).not.toBeInTheDocument()
  })
})

const filterHasSelected = async (
  checkboxGroupButton: Element,
  values: string[]
) => {
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
