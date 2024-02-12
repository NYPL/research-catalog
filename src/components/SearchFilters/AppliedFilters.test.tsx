import { render, screen } from "@testing-library/react"
import { aggregationsResults } from "../../../__test__/fixtures/searchResultsManyBibs"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import { SearchResultsAggregationsContext } from "../../../pages/search/SearchResultsAggregationsContext"
import SearchForm from "../SearchForm/SearchForm"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Applied Filters", () => {
  describe("tagset click handler", () => {
    it("can remove one filter", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Atxt&filters[language][0]=lang%3Afre"
      )
      render(
        <SearchResultsAggregationsContext.Provider
          value={aggregationsResults.itemListElement}
        >
          <SearchForm />
        </SearchResultsAggregationsContext.Provider>
      )

      await userEvent.click(screen.getByText("Text"))
      expect(decodeURI(mockRouter.asPath)).toBe(
        "/search?q=spaghetti&filters[language][0]=lang%3Afre"
      )
    })
    it("can remove all filters", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Atxt&filters[language][0]=lang%3Afre"
      )
      render(
        <SearchResultsAggregationsContext.Provider
          value={aggregationsResults.itemListElement}
        >
          <SearchForm />
        </SearchResultsAggregationsContext.Provider>
      )
      await userEvent.click(screen.getByText("Clear Filters"))
      expect(mockRouter.asPath).toBe("/search?q=spaghetti")
    })
    it("can remove one of many field filters", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Atxt&filters[materialType][1]=resourcetypes%3Aaud&filters[materialType][2]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
      render(
        <SearchResultsAggregationsContext.Provider
          value={aggregationsResults.itemListElement}
        >
          <SearchForm />
        </SearchResultsAggregationsContext.Provider>
      )
      await userEvent.click(screen.getByText("Text"))
      expect(decodeURI(mockRouter.asPath)).toBe(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Aaud&filters[materialType][1]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
    })
  })
  it.todo("can handle a combination of filters with no results")
})
