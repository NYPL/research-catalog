import React from "react"
import { render, screen } from "@testing-library/react"
import SearchResultsSort from "./SortResults"
import userEvent from "@testing-library/user-event"

describe("SearchResultsSort", () => {
  it("calls the callback function when changed", async () => {
    const onChange = jest.fn()
    render(<SearchResultsSort searchParams={{}} handleSortChange={onChange} />)
    const sortSelect = screen.getByLabelText("Sort by")
    expect(sortSelect).toBeInTheDocument()
    await userEvent.selectOptions(sortSelect, "Title (A - Z)")
    expect(sortSelect).toHaveFocus()
    expect(onChange).toHaveBeenCalled()
  })
})
