import { render, screen } from "../../utils/testUtils"
import {
  results,
  aggregationsResults as aggregations,
  emptyAggregationsResults,
} from "../../../__test__/fixtures/searchResultsManyBibs"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import Search from "../../../pages/search"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Applied Filters", () => {
  describe("tagset click handler", () => {
    it("can remove one filter", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
      render(
        <Search
          isAuthenticated={true}
          results={{
            page: 1,
            results,
            aggregations,
          }}
        />
      )

      await userEvent.click(screen.getAllByTestId("filter-tags")[0])
      expect(decodeURI(mockRouter.asPath)).toBe(
        "/search?q=spaghetti&filters[language][0]=lang%3Afre"
      )
    })
    it("can remove all filters", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Atxt&filters[language][0]=lang%3Afre"
      )
      render(
        <Search
          isAuthenticated={true}
          results={{
            page: 1,
            aggregations,
            results,
          }}
        />
      )
      await userEvent.click(screen.getByTestId("filter-clear-all"))
      expect(mockRouter.asPath).toBe("/search?q=spaghetti")
    })
    it("can remove one of many field filters", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Atxt&filters[materialType][1]=resourcetypes%3Aaud&filters[materialType][2]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
      render(
        <Search
          isAuthenticated={true}
          results={{
            page: 1,
            aggregations,
            results,
          }}
        />
      )
      await userEvent.click(screen.getAllByTestId("filter-tags")[0])
      expect(decodeURI(mockRouter.asPath)).toBe(
        "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Aaud&filters[materialType][1]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
    })
  })
  it("can handle dates", () => {
    mockRouter.push(
      "/search?q=spaghetti&filters[dateBefore][0]=2000&filters[dateAfter][0]=1990"
    )
    render(
      <Search
        isAuthenticated={true}
        results={{
          page: 1,
          aggregations,
          results,
        }}
      />
    )
    expect(screen.getByText("Before 2000")).toBeInTheDocument()
    expect(screen.getByText("After 1990")).toBeInTheDocument()
  })
  it("can handle a combination of filters with no results", () => {
    mockRouter.push(
      "/search?q=spaghetti&filters[materialType][0]=resourcetypes%3Amix&filters[language][0]=lang%3Apol&filters[subjectLiteral][0]=Community life."
    )
    render(
      <Search
        isAuthenticated={true}
        results={{
          page: 1,
          aggregations: emptyAggregationsResults,
          results: { ...results, totalResults: 0 },
        }}
      />
    )
    expect(screen.queryByTestId("filter-clear-all")).not.toBeInTheDocument()
  })
})
