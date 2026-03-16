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
        defaultSort="relevance"
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
        defaultSort="count_desc"
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
        params={{ sortBy: "count", order: "asc" }}
        handleSortChange={onChange}
        defaultSort="count_desc"
      />
    )
    const sortSelect = screen.getByLabelText("Sort by: Results (Low - High)", {
      exact: false,
    })
    expect(sortSelect).toBeInTheDocument()
    await userEvent.click(sortSelect)
    const resultsDescOption = screen.getByText("Results (High - Low)")
    expect(resultsDescOption).toBeInTheDocument()
    await userEvent.click(resultsDescOption)
    expect(onChange).toHaveBeenCalled()
  })
})
