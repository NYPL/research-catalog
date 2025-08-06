import React from "react"
import { render, screen } from "@testing-library/react"
import ResultsSort from "./ResultsSort"
import userEvent from "@testing-library/user-event"
import { sortOptions } from "../../utils/searchUtils"
import { browseSortOptions } from "../../utils/browseUtils"

describe("ResultsSort for search", () => {
  it("calls the callback function when changed", async () => {
    const onChange = jest.fn()
    render(
      <ResultsSort
        sortOptions={sortOptions}
        params={{}}
        handleSortChange={onChange}
      />
    )
    const sortSelect = screen.getByLabelText("Sort by")
    expect(sortSelect).toBeInTheDocument()
    await userEvent.selectOptions(sortSelect, "Title (A - Z)")
    expect(sortSelect).toHaveFocus()
    expect(onChange).toHaveBeenCalled()
  })
})

describe("ResultsSort for browse", () => {
  it("displays the browse sort options", async () => {
    const onChange = jest.fn()
    render(
      <ResultsSort
        sortOptions={browseSortOptions}
        params={{}}
        handleSortChange={onChange}
      />
    )
    const sortSelect = screen.getByLabelText("Sort by")
    expect(sortSelect).toBeInTheDocument()
    expect(screen.getByText("Ascending (A - Z)")).toBeInTheDocument()
  })
  it("calls the callback function when changed", async () => {
    const onChange = jest.fn()
    render(
      <ResultsSort
        sortOptions={browseSortOptions}
        params={{}}
        handleSortChange={onChange}
      />
    )
    const sortSelect = screen.getByLabelText("Sort by")
    expect(sortSelect).toBeInTheDocument()
    expect(screen.getByText("Ascending (A - Z)")).toBeInTheDocument()
    await userEvent.selectOptions(sortSelect, "Descending (Z - A)")
    expect(sortSelect).toHaveFocus()
    expect(onChange).toHaveBeenCalled()
  })
})
