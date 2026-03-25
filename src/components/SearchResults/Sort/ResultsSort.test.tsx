import React from "react"
import ResultsSort from "./ResultsSort"
import userEvent from "@testing-library/user-event"
import { sortOptions } from "../../../utils/searchUtils"
import { render, screen } from "../../../utils/testUtils"

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

  describe("selects the expected sort", () => {
    const mockSortOptions = {
      relevance: "Relevance",
      title_asc: "Title (A - Z)",
      title_desc: "Title (Z - A)",
      callnumber_asc: "Call Number (A - Z)",
    }

    it("defaults to relevance when no params are provided", () => {
      render(
        <ResultsSort
          sortOptions={mockSortOptions}
          params={{}}
          handleSortChange={jest.fn()}
        />
      )
      expect(screen.getByText("Sort by: Relevance")).toBeInTheDocument()
    })

    it("uses sortBy and order from params", () => {
      render(
        <ResultsSort
          sortOptions={mockSortOptions}
          params={{ sortBy: "title", order: "desc" }}
          handleSortChange={jest.fn()}
        />
      )
      expect(screen.getByText("Sort by: Title (Z - A)")).toBeInTheDocument()
    })

    it("defaults to asc if only sortBy is provided", () => {
      render(
        <ResultsSort
          sortOptions={mockSortOptions}
          params={{ sortBy: "title" }}
          handleSortChange={jest.fn()}
        />
      )
      expect(screen.getByText("Sort by: Title (A - Z)")).toBeInTheDocument()
    })

    it("defaults to callnumber_asc if field is callnumber", () => {
      render(
        <ResultsSort
          sortOptions={mockSortOptions}
          params={{ field: "callnumber" }}
          handleSortChange={jest.fn()}
        />
      )
      expect(
        screen.getByText("Sort by: Call Number (A - Z)")
      ).toBeInTheDocument()
    })

    it("defaults to callnumber_asc if callnumber param is provided", () => {
      render(
        <ResultsSort
          sortOptions={mockSortOptions}
          params={{ callnumber: "1234" }}
          handleSortChange={jest.fn()}
        />
      )
      expect(
        screen.getByText("Sort by: Call Number (A - Z)")
      ).toBeInTheDocument()
    })
  })
})
