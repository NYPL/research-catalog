import React from "react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import { screen, render } from "../../utils/testUtils"

import Search from "../../../pages/search/index"
import {
  aggregationsResults as aggregations,
  results,
} from "../../../__test__/fixtures/searchResultsManyBibs"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const openRefineSearch = async () => {
  const refineButton = screen.getByText("Refine Search")
  await userEvent.click(refineButton)
}
const apply = async () => {
  const applyButton = screen.getByText("Apply Filters")
  await userEvent.click(applyButton)
}
const selectSomeFilters = async (
  labels = ["Portuguese (1)", "Audio (37)", "Cooking, Italian. (19)"]
) => {
  await Promise.all(
    labels
      .map((label) => screen.getByLabelText(label))
      .map(async (box) => {
        await userEvent.click(box)
      })
  )
}
const clear = async () => {
  const clearButton = screen.getByTestId("clear-filters-button")
  await userEvent.click(clearButton)
}

describe("RefineSearch", () => {
  describe("with initial creatorLiteral filter", () => {
    const setup = () => {
      mockRouter.push("/search?filters[creatorLiteral]=Gaberscek, Carlo.")
      render(
        <Search isAuthenticated={true} results={{ aggregations, results }} />
      )
    }
    beforeEach(setup)
    it("should add filters and maintain creatorliteral filter and search params", async () => {
      await openRefineSearch()
      await selectSomeFilters()
      await apply()
      expect(mockRouter.asPath).toBe(
        "/search?filters%5BcreatorLiteral%5D%5B0%5D=Gaberscek%2C+Carlo.&filters%5Blanguage%5D%5B0%5D=lang%3Apor&filters%5BmaterialType%5D%5B0%5D=resourcetypes%3Aaud&filters%5BsubjectLiteral%5D%5B0%5D=Cooking%2C+Italian."
      )
    })
    it("should clear refinement filters and creatorliteral filter", async () => {
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
        "filters[creatorLiteral][0]": "Gaberscek, Carlo.",
      })
    })
  })
  describe("with search params", () => {
    const setup = () => {
      mockRouter.push("/search?q=spaghetti")
      render(
        <Search isAuthenticated={true} results={{ aggregations, results }} />
      )
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
      render(
        <Search isAuthenticated={true} results={{ aggregations, results }} />
      )
    }
    beforeEach(setup)
    it("should transform labels based on mapping", async () => {
      await openRefineSearch()
      expect(
        screen.queryByLabelText("Greek, Modern (1453- ) (4)")
      ).not.toBeInTheDocument()
      expect(
        screen.queryByLabelText("Greek, Modern (1453-present) (4)")
      ).toBeInTheDocument()
    })
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
    it("applying multiple filters should router query and search results", async () => {
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
      const applyButton = screen.getByText("Apply Filters")
      await selectSomeFilters()
      await apply()
      await openRefineSearch()
      expect(mockRouter.asPath).not.toBe("/search")
      await clear()
      expect(applyButton).not.toBeInTheDocument()
      expect(mockRouter.asPath).toBe("/search")
    })
    it("cancelling with selected but unapplied filters should close refine search, clear selected filters, and return to search results", async () => {
      await openRefineSearch()
      const applyButton = screen.getByText("Apply Filters")
      await selectSomeFilters()
      await userEvent.click(screen.getByText("Cancel"))

      expect(applyButton).not.toBeInTheDocument()
      expect(mockRouter.asPath).toBe("/search")
      await openRefineSearch()
      const previouslySelectedCheckboxes = [
        "Portuguese (1)",
        "Audio (37)",
        "Cooking, Italian. (19)",
      ].map((label) => screen.getByLabelText(label))
      previouslySelectedCheckboxes.forEach((box) =>
        expect(box).not.toBeChecked()
      )
    })
    it("multiple selections for multiple filters", async () => {
      await openRefineSearch()
      await selectSomeFilters([
        "Audio (37)",
        "Moving image (8)",
        "French (34)",
        "Dutch (4)",
        "Italian (59)",
      ])
      await apply()
      expect(mockRouter.query).toStrictEqual({
        "filters[language][0]": "lang:fre",
        "filters[language][1]": "lang:dut",
        "filters[language][2]": "lang:ita",
        "filters[materialType][0]": "resourcetypes:aud",
        "filters[materialType][1]": "resourcetypes:mov",
      })
    })
    it("deselecting and applying removes filters", async () => {
      mockRouter.push({
        pathname: "/search",
        query: {
          "filters[language][0]": "lang:por",
          "filters[language][1]": "lang:ita",
          "filters[materialType][0]": "resourcetypes:aud",
          "filters[subjectLiteral][0]": "Cooking, Italian.",
        },
      })
      await openRefineSearch()
      // this should actually deselect the filters as it is just clicking on filters
      await selectSomeFilters(["Italian (59)", "Audio (37)"])
      await apply()
      expect(mockRouter.query).toStrictEqual({
        "filters[language][0]": "lang:por",
        "filters[subjectLiteral][0]": "Cooking, Italian.",
      })
    })
  })
})
