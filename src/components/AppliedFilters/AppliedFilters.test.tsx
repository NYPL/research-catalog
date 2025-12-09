import { render, screen } from "../../utils/testUtils"
import {
  results,
  aggregationsResults as aggregations,
  emptyAggregationsResults,
} from "../../../__test__/fixtures/searchResultsManyBibs"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import Search from "../Search/Search"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Applied Filters", () => {
  const component = (
    <Search
      isAuthenticated={true}
      results={{
        status: 200,
        page: 1,
        results,
        aggregations,
      }}
      metadataTitle="Search"
      activePage="search"
      bannerNotification="Search"
      searchParams={{ page: 1 }}
      handlePageChange={() => null}
      handleSortChange={() => null}
    />
  )
  describe("tagset click handler", () => {
    it("can remove one filter", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[format][0]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
      render(component)

      await userEvent.click(screen.getAllByTestId("ds-tagSetFilter-tags")[0])
      expect(decodeURI(mockRouter.asPath)).toBe(
        "/search?q=spaghetti&filters[language][0]=lang%3Afre"
      )
    })
    it("can remove all filters", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[format][0]=resourcetypes%3Atxt&filters[language][0]=lang%3Afre"
      )
      render(component)
      await userEvent.click(screen.getByTestId("ds-tagSetFilter-clear-all"))
      expect(mockRouter.asPath).toBe("/search?q=spaghetti")
    })
    it("can remove one of many field filters", async () => {
      mockRouter.push(
        "/search?q=spaghetti&filters[format][0]=resourcetypes%3Atxt&filters[format][1]=resourcetypes%3Aaud&filters[format][2]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
      render(component)
      await userEvent.click(screen.getAllByTestId("ds-tagSetFilter-tags")[0])
      expect(decodeURI(mockRouter.asPath)).toBe(
        "/search?q=spaghetti&filters[format][0]=resourcetypes%3Aaud&filters[format][1]=resourcetypes%3Amov&filters[language][0]=lang%3Afre"
      )
    })
  })
  it("can handle dates", () => {
    mockRouter.push(
      "/search?q=spaghetti&filters[dateTo][0]=2000&filters[dateFrom][0]=1990"
    )
    render(component)
    expect(screen.getByText("To 2000")).toBeInTheDocument()
    expect(screen.getByText("From 1990")).toBeInTheDocument()
  })
  it("can handle a combination of filters with no results", () => {
    mockRouter.push(
      "/search?q=spaghetti&filters[format][0]=resourcetypes%3Amix&filters[language][0]=lang%3Apol&filters[subjectLiteral][0]=Community life."
    )
    render(
      <Search
        isAuthenticated={true}
        results={{
          status: 200,
          page: 1,
          aggregations: emptyAggregationsResults,
          results: { ...results, totalResults: 0 },
        }}
        metadataTitle="Search"
        activePage="search"
        bannerNotification="Search"
        searchParams={{ page: 1 }}
        handlePageChange={() => null}
        handleSortChange={() => null}
      />
    )
    expect(
      screen.queryByTestId("ds-tagSetFilter-clear-all")
    ).not.toBeInTheDocument()
  })
  it("does not remove locked filter on clear all", async () => {
    mockRouter.push(
      "/browse/subjects/Dogs.?filters%5BbuildingLocation%5D%5B0%5D=rc&filters%5BbuildingLocation%5D%5B1%5D=ma"
    )
    render(component)
    await userEvent.click(screen.getByTestId("ds-tagSetFilter-clear-all"))
    expect(mockRouter.asPath).toBe("/browse/subjects/Dogs.")
  })
})
