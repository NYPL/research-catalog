import React from "react"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../utils/testUtils"
import BrowseResultsSort from "./BrowseResultsSort"
import { browseSubjectSortOptions } from "../../../utils/browseUtils"

describe("Browse results sort menu", () => {
  it("calls the callback function when changed", async () => {
    const onChange = jest.fn()
    render(
      <BrowseResultsSort
        sortOptions={browseSubjectSortOptions}
        params={{}}
        handleSortChange={onChange}
      />
    )
    const sortSelect = screen.getByLabelText("Sort by:", { exact: false })
    expect(sortSelect).toBeInTheDocument()
    await userEvent.click(sortSelect)
    const AZoption = screen.getByText("Subject Heading (A - Z)")
    expect(AZoption).toBeInTheDocument()
    await userEvent.click(AZoption)
    expect(onChange).toHaveBeenCalled()
  })

  describe("selects the expected sort", () => {
    it("defaults to descending count when no params are provided", () => {
      render(
        <BrowseResultsSort
          sortOptions={browseSubjectSortOptions}
          params={{}}
          handleSortChange={jest.fn()}
        />
      )
      expect(
        screen.getByText("Sort by: Results (High - Low)")
      ).toBeInTheDocument()
    })

    it("uses sortBy and order from params", () => {
      render(
        <BrowseResultsSort
          sortOptions={browseSubjectSortOptions}
          params={{ sortBy: "termLabel", order: "desc" }}
          handleSortChange={jest.fn()}
        />
      )
      expect(
        screen.getByText("Sort by: Subject Heading (Z - A)")
      ).toBeInTheDocument()
    })
  })
})
