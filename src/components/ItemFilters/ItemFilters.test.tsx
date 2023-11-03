import React from "react"
import { render, screen, act } from "@testing-library/react"
import mockRouter from "next-router-mock"

import FiltersContainer from "./FiltersContainer"
import userEvent from "@testing-library/user-event"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

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

describe("Filters container", () => {
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
})

const aggs = [
  {
    "@type": "nypl:Aggregation",
    "@id": "res:location",
    id: "location",
    field: "location",
    values: [
      {
        value: "loc:mal82",
        count: 572,
        label: "Schwarzman Building - Main Reading Room 315",
      },
      {
        value: "loc:makk3",
        count: 133,
        label: "Schwarzman Building - Dewitt Wallace Reference Desk Room 108",
      },
      {
        value: "loc:rc2ma",
        count: 66,
        label: "Offsite",
      },
      {
        value: "loc:rcma2",
        count: 66,
        label: "Offsite",
      },
    ],
  },
  {
    "@type": "nypl:Aggregation",
    "@id": "res:format",
    id: "format",
    field: "format",
    values: [
      {
        value: "Text",
        count: 704,
        label: "Text",
      },
      {
        value: "AUG. 23, 2021-CURRENT",
        count: 109,
        label: "AUG. 23, 2021-CURRENT",
      },
      {
        value: "FEB. 15/22, 2021 - AUG. 16, 2021",
        count: 24,
        label: "FEB. 15/22, 2021 - AUG. 16, 2021",
      },
    ],
  },
  {
    "@type": "nypl:Aggregation",
    "@id": "res:status",
    id: "status",
    field: "status",
    values: [
      {
        value: "status:a",
        count: 826,
        label: "Available",
      },
      {
        value: "status:na",
        count: 6,
        label: "Not available",
      },
      {
        value: "status:co",
        count: 4,
        label: "Loaned",
      },
      {
        value: "status:oh",
        count: 1,
        label: "On Holdshelf",
      },
    ],
  },
]
