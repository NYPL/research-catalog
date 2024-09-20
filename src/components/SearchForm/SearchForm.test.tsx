import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import SearchForm from "./SearchForm"
import { normalAggs } from "../../../__test__/fixtures/testAggregations"
import { getSearchTipForSearchFormOption } from "../../utils/searchUtils"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SearchForm", () => {
  // const searchLabel = getSearchTipForSearchFormOption("all")
  const submit = () =>
    fireEvent(screen.getByText("Search"), new MouseEvent("click"))
  beforeEach(() => {
    mockRouter.query.q = ""
  })
  afterEach(async () => {
    const input = screen.getByRole("textbox")
    await userEvent.clear(input)
  })
  it.todo("searches on an empty keyword after clearing the form")
  it.todo("searches for {TBD} on an empty query")
  it("submits a keyword query by default", async () => {
    render(<SearchForm aggregations={normalAggs} />)
    const input = screen.getByRole("textbox")

    await userEvent.type(input, "spaghetti")
    submit()
    expect(mockRouter.asPath).toBe("/search?q=spaghetti")
  })
  it("submits a journal_title query", async () => {
    render(<SearchForm aggregations={normalAggs} />)
    const input = screen.getByRole("textbox")

    const searchScopeSelect = screen.getByLabelText("Select a category")
    await userEvent.type(input, "spaghetti")
    await userEvent.selectOptions(searchScopeSelect, "journal_title")
    submit()
    expect(mockRouter.asPath).toBe(
      "/search?q=spaghetti&search_scope=journal_title"
    )
  })
  it("gets keyword from url", () => {
    mockRouter.query.q = "spaghetti"
    render(<SearchForm aggregations={normalAggs} />)
    const input = screen.getByDisplayValue("spaghetti")
    expect(input).toBeTruthy()
  })
  describe("search scope options", () => {
    it("updates the search tip when search scope is updated", async () => {
      render(<SearchForm aggregations={normalAggs} />)
      const searchScopeSelect = screen.getByLabelText("Select a category")
      await userEvent.selectOptions(searchScopeSelect, "journal_title")
      let searchTip = screen.getByText(
        getSearchTipForSearchFormOption("journal_title")
      )
      await userEvent.selectOptions(searchScopeSelect, "all")
      searchTip = screen.getByText(getSearchTipForSearchFormOption("all"))
      expect(searchTip).toBeInTheDocument()
    })
  })
})
