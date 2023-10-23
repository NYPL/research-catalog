import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import mockRouter from "next-router-mock"

import SearchForm from "./SearchForm"
import userEvent from "@testing-library/user-event"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SubNav", () => {
  const submit = () =>
    fireEvent(
      screen.getByRole("button", { name: "Search" }),
      new MouseEvent("click")
    )
  it("submits a keyword query", async () => {
    render(<SearchForm />)
    const input = screen.getByRole("textbox")
    await act(async () => {
      await userEvent.type(input, "spaghetti")
      submit()
      expect(mockRouter.asPath).toBe("/search?q=spaghetti")
    })
  })
})
