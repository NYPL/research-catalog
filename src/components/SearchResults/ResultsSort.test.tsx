import React from "react"
import { render, screen } from "@testing-library/react"
import ResultsSort from "./ResultsSort"
import userEvent from "@testing-library/user-event"
import { sortOptions } from "../../utils/searchUtils"

describe("Search results sort menu", () => {
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
