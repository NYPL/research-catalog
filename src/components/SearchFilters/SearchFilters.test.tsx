import React from "react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import { screen, render, waitFor } from "../../utils/testUtils"
import Search from "../../../pages/search/index"
import {
  aggregationsResults as aggregations,
  results,
} from "../../../__test__/fixtures/searchResultsManyBibs"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SearchFilters", () => {
  describe("with dates in url query params", () => {
    it("can populate date fields from url", async () => {
      mockRouter.push(
        "/search?q=dog&filters[dateBefore][0]=2000&filters[dateAfter][0]=1990"
      )
      render(
        <Search
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ page: 1, aggregations, results }}
        />
      )
      userEvent.click(screen.getByLabelText(/Date/))
      await waitFor(() => {
        const beforeDateInput = screen.getByDisplayValue("2000")
        const afterDateInput = screen.getByDisplayValue("1990")
        expect(beforeDateInput).toBeInTheDocument()
        expect(afterDateInput).toBeInTheDocument()
      })
    })
  })

  describe("filter functionality", () => {
    it("displays some filters open by default", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(
        <Search
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ page: 1, aggregations, results }}
        />
      )
      const formatMultiselect = screen.getByLabelText(/Format/, {
        selector: "button",
      })
      const subjectMultiselect = screen.getByLabelText(/Subject/, {
        selector: "button",
      })
      const dateMultiselect = screen.getByLabelText(/Date/, {
        selector: "button",
      })
      expect(formatMultiselect).toHaveAttribute("aria-expanded", "true")
      expect(subjectMultiselect).toHaveAttribute("aria-expanded", "false")
      expect(dateMultiselect).toHaveAttribute("aria-expanded", "false")
    })
    it("opens and closes filters", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(
        <Search
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ page: 1, aggregations, results }}
        />
      )
      const subjectMultiselect = screen.getByLabelText(/Subject/, {
        selector: "button",
      })
      expect(subjectMultiselect).toHaveAttribute("aria-expanded", "false")
      const topFilterOption = screen.getByLabelText(
        /Spaghetti Westerns -- History and criticism./,
        {
          selector: "input",
        }
      )
      expect(topFilterOption).not.toBeVisible()
      userEvent.click(subjectMultiselect)
      setTimeout(() => {
        expect(subjectMultiselect).toHaveAttribute("aria-expanded", "true")
        expect(topFilterOption).toBeVisible()
      }, 100)
    })

    it("should update the router query and add filter on checkbox click", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(
        <Search
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ page: 1, aggregations, results }}
        />
      )
      await waitFor(() => {
        expect(screen.getAllByLabelText(/Format/)[0]).toBeInTheDocument()
        expect(screen.getAllByLabelText(/Item location/)[0]).toBeInTheDocument()
      })
      const audioFilter = screen.getByLabelText(/Audio/, { selector: "input" })
      userEvent.click(audioFilter)
      setTimeout(() => {
        expect(mockRouter.query).toStrictEqual({
          "filters[format][0]": "resourcetypes:aud",
          q: "spaghetti",
        })
      }, 100)
    })
    it("should update the router query and remove filter on checkbox de-select", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(
        <Search
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ page: 1, aggregations, results }}
        />
      )
      expect(mockRouter.query).toStrictEqual({
        q: "spaghetti",
      })
      const audioFilter = screen.getByLabelText(/Audio/, { selector: "input" })
      userEvent.click(audioFilter)
      setTimeout(() => {
        expect(audioFilter).toBeChecked()
        expect(mockRouter.query).toStrictEqual({
          "filters[format][0]": "resourcetypes:aud",
          q: "spaghetti",
        })
      }, 100)
      userEvent.click(audioFilter)
      setTimeout(() => {
        expect(mockRouter.query).toStrictEqual({
          q: "spaghetti",
        })
        expect(audioFilter).not.toBeChecked()
      }, 100)
    })
  })
})
