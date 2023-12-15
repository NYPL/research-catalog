import React from "react"
import { fireEvent, render, screen, act } from "@testing-library/react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import SearchForm from "../SearchForm/SearchForm"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("RefineSearch", () => {
  const openRefineSearch = async () => {
    mockRouter.push("/search")
    render(<SearchForm />)
    const refineButton = screen.getByRole("button", { name: "Refine Search" })
    await act(async () => await userEvent.click(refineButton))
  }
  const apply = async () => {
    const applyButton = screen.getByRole("button", { name: "Apply Filters" })
    await act(async () => await userEvent.click(applyButton))
  }
  describe("with initial creatorLiteral filter and search query", () => {
    it.todo(
      "should add filters and maintain creatorliteral filter and search params"
    )
    it.todo(
      "should clear refinment filters and creatorliteral filter, but clear search params"
    )
    it.todo(
      "applying no filters should maintain creatorliteral filter and search params"
    )
  })
  describe("basic filter functionality", () => {
    it("applying no filters should return to search results", async () => {
      await openRefineSearch()
      await apply()
      expect(mockRouter.asPath).toBe("/search")
    })
    xit("applying multiple filters should update url and search results", async () => {
      await openRefineSearch()
      const filters = screen.getAllByLabelText("checkbox")
    })
    it.todo("clearing filters should return to search results")
    it.todo(
      "cancelling with selected but unapplied filters should close refine search, clear selected filters, and return to search results"
    )
  })
})
