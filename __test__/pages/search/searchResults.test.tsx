import React from "react"
import userEvent from "@testing-library/user-event"
import { render, screen, fireEvent } from "../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import { results } from "../../fixtures/searchResultsManyBibs"
import { noBibs } from "../../fixtures/searchResultsNoBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
const query = "spaghetti"

describe("Search Results page", () => {
  // TODO: describe("focus", () => {})
  describe("More than 50 bibs", () => {
    it("displays many bibs", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isAuthenticated={true}
          results={{ results, status: 200 }}
        />
      )

      const displayingText = screen.getByText(
        `Displaying 1-50 of ${results.totalResults} results for keyword "${query}"`
      )
      expect(displayingText).toBeInTheDocument()

      const cards = screen.getAllByRole("heading", { level: 3 })
      expect(cards).toHaveLength(50)
    })
    it("displays pagination and updates the router on page button clicks", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isAuthenticated={true}
          results={{ results, status: 200 }}
        />
      )
      screen.getByLabelText("Pagination")

      const pageButton = screen.getByLabelText("Page 2")
      fireEvent.click(pageButton)
      expect(mockRouter.asPath).toBe("/?q=spaghetti&page=2")
    })
    it("renders the sort select fields and updates the query string in the url on changes", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isAuthenticated={true}
          results={{ results, status: 200 }}
        />
      )
      const mobileSortBy = screen.getAllByLabelText("Sort by")[0]
      expect(mobileSortBy).toHaveValue("relevance")
      await userEvent.selectOptions(mobileSortBy, "Title (A - Z)")
      expect(mobileSortBy).toHaveValue("title_asc")

      expect(mockRouter.asPath).toBe(
        "/?q=spaghetti&sort=title&sort_direction=asc"
      )

      const desktopSortBy = screen.getAllByLabelText("Sort by")[1]
      expect(desktopSortBy).toHaveValue("title_asc")
      await userEvent.selectOptions(desktopSortBy, "Title (Z - A)")
      expect(desktopSortBy).toHaveValue("title_desc")

      expect(mockRouter.asPath).toBe(
        "/?q=spaghetti&sort=title&sort_direction=desc"
      )
    })
    it("returns the user to the first page on sorting changes", async () => {
      await mockRouter.push(`/search?q=${query}&page=2`)
      render(
        <SearchResults
          isAuthenticated={true}
          results={{ results, status: 200 }}
        />
      )
      const mobileSortBy = screen.getAllByLabelText("Sort by")[0]
      await userEvent.selectOptions(mobileSortBy, "Title (Z - A)")

      expect(mockRouter.asPath).toBe(
        "/?q=spaghetti&sort=title&sort_direction=desc"
      )
    })
  })
  describe("errors", () => {
    it("displays 404 error", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          errorStatus={404}
          results={undefined}
          isAuthenticated={true}
        />
      )
      expect(screen.getByText("No results found")).toBeInTheDocument()
    })
    it("displays server error", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          errorStatus={500}
          results={undefined}
          isAuthenticated={true}
        />
      )
      expect(
        screen.getByText("Something went wrong on our end")
      ).toBeInTheDocument()
    })
    it("displays server error", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          errorStatus={401}
          results={undefined}
          isAuthenticated={true}
        />
      )
      expect(
        screen.getByText("There was an unexpected error")
      ).toBeInTheDocument()
    })
  })
})
