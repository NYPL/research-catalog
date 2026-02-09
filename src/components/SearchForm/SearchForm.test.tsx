import React from "react"

import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import SearchForm from "./SearchForm"
import { normalAggs } from "../../../__test__/fixtures/testAggregations"
import { SEARCH_FORM_OPTIONS } from "../../config/constants"
import { fireEvent, render, screen } from "../../utils/testUtils"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SearchForm", () => {
  const submit = () =>
    fireEvent(
      screen.getByText("Search").closest("button"),
      new MouseEvent("click")
    )
  beforeEach(() => {
    mockRouter.query.q = ""
  })
  afterEach(async () => {
    const input = screen.getByRole("textbox")
    await userEvent.clear(input)
  })
  const component = (
    <SearchForm
      searchResultsCount={20}
      aggregations={normalAggs}
      activePage="search"
    />
  )
  it.todo("searches on an empty keyword after clearing the form")
  it.todo("searches for {TBD} on an empty query")
  it("submits a keyword query by default", async () => {
    render(component)
    const input = screen.getByRole("textbox")

    await userEvent.type(input, "spaghetti")
    submit()
    expect(mockRouter.asPath).toBe("/search?q=spaghetti")
  })
  it("submits a journal_title query", async () => {
    render(component)
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
    render(component)
    const input = screen.getByDisplayValue("spaghetti")
    expect(input).toBeTruthy()
  })
  describe("search scope options", () => {
    it("updates the search tip when search scope is updated", async () => {
      render(component)
      const searchScopeSelect = screen.getByLabelText("Select a category")
      await userEvent.selectOptions(searchScopeSelect, "journal_title")
      let searchTip = screen.getByText(
        SEARCH_FORM_OPTIONS.journal_title.searchTip
      )
      await userEvent.selectOptions(searchScopeSelect, "all")
      searchTip = screen.getByText(SEARCH_FORM_OPTIONS.all.searchTip)
      expect(searchTip).toBeInTheDocument()
    })
  })
})
