import React from "react"
import { render, screen } from "@testing-library/react"
import ResultsSort from "./ResultsSort"
import userEvent from "@testing-library/user-event"
import { sortOptions } from "../../utils/searchUtils"
import { browseSubjectSortOptions } from "../../utils/browseUtils"

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
    const sortSelect = screen.getByLabelText("Sort by:", { exact: false })
    expect(sortSelect).toBeInTheDocument()
    await userEvent.click(sortSelect)
    const AZoption = screen.getByText("Title (A - Z)")
    expect(AZoption).toBeInTheDocument()
    await userEvent.click(AZoption)
    expect(onChange).toHaveBeenCalled()
  })
})

describe("ResultsSort for browse", () => {
  it("displays the browse sort options", async () => {
    const onChange = jest.fn()
    render(
      <ResultsSort
        sortOptions={browseSubjectSortOptions}
        params={{}}
        handleSortChange={onChange}
      />
    )
    const sortSelect = screen.getByLabelText("Sort by:", { exact: false })
    expect(sortSelect).toBeInTheDocument()
    await userEvent.click(sortSelect)
    expect(screen.getByText("Subject Heading (A - Z)")).toBeInTheDocument()
  })
  it("calls the callback function when changed", async () => {
    const onChange = jest.fn()
    render(
      <ResultsSort
        sortOptions={browseSubjectSortOptions}
        params={{ sortBy: "count_asc" }}
        handleSortChange={onChange}
      />
    )
    const sortSelect = screen.getByLabelText("Sort by: Count (Low - High)", {
      exact: false,
    })
    expect(sortSelect).toBeInTheDocument()
    await userEvent.click(sortSelect)
    expect(screen.getByText("Subject Heading (A - Z)")).toBeInTheDocument()
    await userEvent.click(screen.getByText("Subject Heading (A - Z)"))
    expect(onChange).toHaveBeenCalled()
  })
})
