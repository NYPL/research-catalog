import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import SearchForm from "./SearchForm"
import { normalAggs } from "../../../__test__/fixtures/testAggregations"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SearchForm", () => {
  const searchLabel =
    "Search by keyword, title, journal title, or author/contributor"
  const submit = () =>
    fireEvent(screen.getByText("Search"), new MouseEvent("click"))
  beforeEach(() => {
    mockRouter.query.q = ""
  })
  afterEach(async () => {
    const input = screen.getByLabelText(searchLabel)
    await userEvent.clear(input)
  })
  it.todo("searches on an empty keyword after clearing the form")
  it.todo("searches for {TBD} on an empty query")
  it("submits a keyword query by default", async () => {
    render(<SearchForm aggregations={normalAggs} />)
    const input = screen.getByLabelText(searchLabel)
    await userEvent.type(input, "spaghetti")
    submit()
    expect(mockRouter.asPath).toBe("/search?q=spaghetti")
  })
  it("submits a journal_title query", async () => {
    render(<SearchForm aggregations={normalAggs} />)
    const input = screen.getByLabelText(searchLabel)
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
})
