import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import mockRouter from "next-router-mock"

import SearchForm from "./SearchForm"
import userEvent from "@testing-library/user-event"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SearchForm", () => {
  const submit = () =>
    fireEvent(
      screen.getByRole("button", { name: "Search" }),
      new MouseEvent("click")
    )
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
    render(<SearchForm />)
    const input = screen.getByRole("textbox")
    await act(async () => {
      await userEvent.type(input, "spaghetti")
      submit()
      expect(mockRouter.asPath).toBe("/search?q=spaghetti")
    })
  })
  it("submits a journal_title query", async () => {
    render(<SearchForm />)
    const input = screen.getByRole("textbox")
    const searchScopeSelect = screen.getByRole("combobox")
    await act(async () => {
      await userEvent.type(input, "spaghetti")
      await userEvent.selectOptions(searchScopeSelect, "journal_title")
      submit()
      expect(mockRouter.asPath).toBe(
        "/search?q=spaghetti&search_scope=journal_title"
      )
    })
  })
  it("gets keyword from url", () => {
    mockRouter.query.q = "spaghetti"
    render(<SearchForm />)
    const input = screen.getByDisplayValue("spaghetti")
    expect(input).toBeTruthy()
  })
})
