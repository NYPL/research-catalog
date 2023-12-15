import React from "react"
import { render, screen, act } from "@testing-library/react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import SearchForm from "../SearchForm/SearchForm"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("RefineSearch", () => {
  describe("with initial creatorLiteral filter", () => {
    const setup = () => {
      mockRouter.push("/search?filters[creatorLiteral]=strega nonna")
      render(<SearchForm />)
    }
    beforeEach(setup)
    it("should add filters and maintain creatorliteral filter and search params", async () => {
      await openRefineSearch()
      await selectSomeFilters()
      await apply()
      expect(mockRouter.asPath).toBe(
        "/search?filters%5BcreatorLiteral%5D%5B0%5D=strega+nonna&filters%5Blanguage%5D%5B0%5D=lang%3Apor&filters%5BmaterialType%5D%5B0%5D=resourcetypes%3Aaud&filters%5BsubjectLiteral%5D%5B0%5D=Cooking%2C+Italian."
      )
    })
    it("should clear refinment filters and creatorliteral filter", async () => {
      await openRefineSearch()
      await selectSomeFilters()
      await apply()
      await openRefineSearch()
      await clear()
      expect(mockRouter.asPath).toBe("/search")
    })
    it("applying no filters should maintain creatorliteral filter", async () => {
      await openRefineSearch()
      await apply()
      expect(mockRouter.query).toStrictEqual({
        "filters[creatorLiteral][0]": "strega nonna",
      })
    })
  })
  describe("with search params", () => {
    const setup = () => {
      mockRouter.push("/search?q=spaghetti")
      render(<SearchForm />)
    }
    beforeEach(setup)
    it("adding filters should maintain search params", async () => {
      await openRefineSearch()
      await selectSomeFilters()
      await apply()
      expect(mockRouter.query.q).toBe("spaghetti")
      expect(mockRouter.query).toStrictEqual({
        "filters[language][0]": "lang:por",
        "filters[materialType][0]": "resourcetypes:aud",
        "filters[subjectLiteral][0]": "Cooking, Italian.",
        q: "spaghetti",
      })
    })
    it("clearing filters should maintain search params", async () => {
      await openRefineSearch()
      await selectSomeFilters()
      await apply()
      await openRefineSearch()
      await clear()
      expect(mockRouter.asPath).toBe("/search?q=spaghetti")
    })
  })
  describe("basic filter functionality", () => {
    const setup = () => {
      mockRouter.push("/search")
      render(<SearchForm />)
    }
    beforeEach(setup)
    it("applying no filters should return to search results", async () => {
      await openRefineSearch()
      await apply()
      expect(mockRouter.asPath).toBe("/search")
    })
    it("applying filters closes refine search bar", async () => {
      await openRefineSearch()
      const applyButton = screen.getByRole("button", { name: "Apply Filters" })
      await selectSomeFilters()
      await apply()
      expect(applyButton).not.toBeInTheDocument()
    })
    it("applying multiple filters should update url and search results", async () => {
      await openRefineSearch()
      await selectSomeFilters()
      await apply()
      expect(mockRouter.query).toStrictEqual({
        "filters[language][0]": "lang:por",
        "filters[materialType][0]": "resourcetypes:aud",
        "filters[subjectLiteral][0]": "Cooking, Italian.",
      })
    })
    it("clearing filters should return to search results", async () => {
      await openRefineSearch()
      const applyButton = screen.getByRole("button", { name: "Apply Filters" })
      await selectSomeFilters()
      await apply()
      await openRefineSearch()
      await clear()
      expect(applyButton).not.toBeInTheDocument()
      expect(mockRouter.asPath).toBe("/search")
    })
    it("cancelling with selected but unapplied filters should close refine search, clear selected filters, and return to search results", async () => {
      await openRefineSearch()
      const applyButton = screen.getByRole("button", { name: "Apply Filters" })
      await selectSomeFilters()
      await act(async () => {
        await userEvent.click(screen.getByRole("button", { name: "Cancel" }))
      })
      expect(applyButton).not.toBeInTheDocument()
      expect(mockRouter.asPath).toBe("/search")
      await openRefineSearch()
      const checkboxes = screen.getAllByRole("checkbox")
      checkboxes.forEach((box) => expect(box).not.toBeChecked())
    })
    it("multiple selections for multiple filters", async () => {
      await openRefineSearch()
      await selectSomeFilters([
        "Cooking, Italian.",
        "Cooking (Pasta)",
        "Spaghetti Westerns.",
        "Audio",
        "Moving image",
        "French",
        "Dutch",
        "Italian",
      ])
      await apply()
      expect(mockRouter.query).toStrictEqual({
        "filters[language][0]": "lang:fre",
        "filters[language][1]": "lang:dut",
        "filters[language][2]": "lang:ita",
        "filters[materialType][0]": "resourcetypes:aud",
        "filters[materialType][1]": "resourcetypes:mov",
        "filters[subjectLiteral][0]": "Cooking, Italian.",
        "filters[subjectLiteral][1]": "Cooking (Pasta)",
        "filters[subjectLiteral][2]": "Spaghetti Westerns.",
      })
    })
  })
  const openRefineSearch = async () => {
    const refineButton = screen.getByRole("button", { name: "Refine Search" })
    await act(async () => await userEvent.click(refineButton))
  }
  const apply = async () => {
    const applyButton = screen.getByRole("button", { name: "Apply Filters" })
    await act(async () => await userEvent.click(applyButton))
  }
  const selectSomeFilters = async (
    labels = ["Portuguese", "Audio", "Cooking, Italian."]
  ) => {
    const checkboxes = labels.map((label) => screen.getByLabelText(label))
    await Promise.all(
      checkboxes.map(async (box) => {
        await act(async () => await userEvent.click(box))
      })
    )
  }
  const clear = async () => {
    const clearButton = screen.getByRole("button", { name: "Clear Filters" })
    await act(async () => await userEvent.click(clearButton))
  }
})
