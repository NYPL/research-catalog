import React from "react"
import { fireEvent, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import AdvancedSearch from "../../../pages/search/advanced"

global.console = {
  ...console,
  warn: jest.fn(),
}
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Advanced Search Form", () => {
  const submit = () =>
    fireEvent(
      screen.getByRole("button", { name: "Submit" }),
      new MouseEvent("click")
    )
  xit("displays alert when no fields are submitted", () => {
    render(<AdvancedSearch />)
    submit()
    screen.getByText(
      "Please enter at least one field to submit an advanced search."
    )
  })
  it("can set keyword, contributor, title, subject", async () => {
    render(<AdvancedSearch />)

    const [keywordInput, contributorInput, titleInput, subjectInput] =
      screen.getAllByRole("textbox")
    await act(async () => {
      await userEvent.type(keywordInput, "spaghetti")
      await userEvent.type(contributorInput, "strega nonna")
      await userEvent.type(titleInput, "il amore di pasta")
      await userEvent.type(subjectInput, "italian food")
      submit()
      expect(mockRouter.asPath).toBe(
        "/search?q=spaghetti&contributor=il+amore+di+pasta&title=strega+nonna"
      )
    })
  })
  it("can select languages", async () => {
    render(<AdvancedSearch />)

    const languageSelect = screen.getByRole("combobox", { name: "Language" })
    await act(async () => {
      await userEvent.selectOptions(languageSelect, "Azerbaijani")
      submit()
      expect(mockRouter.asPath).toBe(
        "/search?q=&filters%5Blanguage%5D=lang%3Aaze"
      )
    })
  })
})
