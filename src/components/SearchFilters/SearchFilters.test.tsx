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
  const component = (
    <Search
      isAuthenticated={true}
      results={{ page: 1, aggregations, results, status: 200 }}
    />
  )
  describe("with dates in url query params", () => {
    it("can populate date fields from url", async () => {
      mockRouter.push(
        "/search?q=dog&filters[dateTo][0]=2000&filters[dateFrom][0]=1990"
      )
      render(component)
      userEvent.click(screen.getAllByLabelText(/Date/)[0])
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
      render(component)
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
      expect(dateMultiselect).toHaveAttribute("aria-expanded", "true")
    })
    it("opens and closes filters", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(component)
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

    it("searches filter options", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(component)
      const formatMultiselect = screen.getByLabelText(/Format/, {
        selector: "button",
      })
      expect(formatMultiselect).toHaveAttribute("aria-expanded", "true")
      const formatFilterSearch = screen.getByLabelText(/Search Format/, {
        selector: "input",
      })
      const audioFilter = screen.getByLabelText(/Audio/, {
        selector: "input",
      })
      const notatedMusicFilter = screen.getByLabelText(/Notated music/, {
        selector: "input",
      })
      expect(audioFilter).toBeInTheDocument()
      expect(notatedMusicFilter).toBeInTheDocument()
      userEvent.type(formatFilterSearch, "Notated")
      setTimeout(() => {
        expect(audioFilter).not.toBeInTheDocument()
        expect(notatedMusicFilter).toBeInTheDocument()
      }, 100)
    })

    it("should update the router query and add filter on checkbox click", async () => {
      mockRouter.push("/search?q=spaghetti")
      render(component)
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
      render(component)
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
    it("does display subject filter on search with query and SH filter", async () => {
      mockRouter.push(
        "/search?q=hello&search_scope=callnumber&filters%5BsubjectLiteral%5D%5B0%5D=French+fiction."
      )
      render(component)
      expect(mockRouter.query).toStrictEqual({
        q: "hello",
        search_scope: "callnumber",
        "filters[subjectLiteral][0]": "French fiction.",
      })
      const subjectMultiselect = screen.queryAllByLabelText(/Subject/, {
        selector: "button",
      })[0]
      const dateMultiselect = screen.queryAllByLabelText(/Date/, {
        selector: "button",
      })[0]
      expect(subjectMultiselect).toBeInTheDocument()
      expect(dateMultiselect).toBeInTheDocument()
    })
    it("does not display subject filter on search with no query and SH filter", async () => {
      mockRouter.push(
        "/search?q=&search_scope=callnumber&filters%5BsubjectLiteral%5D%5B0%5D=French+fiction."
      )
      render(component)
      expect(mockRouter.query).toStrictEqual({
        q: "",
        search_scope: "callnumber",
        "filters[subjectLiteral][0]": "French fiction.",
      })
      const subjectMultiselect = screen.queryByLabelText(/Subject/, {
        selector: "button",
      })
      const dateMultiselect = screen.queryByLabelText(/Date/, {
        selector: "button",
      })
      expect(subjectMultiselect).not.toBeInTheDocument()
      expect(dateMultiselect).toBeInTheDocument()
    })
    it("does not display subject filter on browse SH results page", async () => {
      mockRouter.push(
        "/browse/subjects/Southern%20States%20--%20Social%20conditions."
      )
      render(component)
      const subjectMultiselect = screen.queryByLabelText(/Subject/, {
        selector: "button",
      })
      const dateMultiselect = screen.queryByLabelText(/Date/, {
        selector: "button",
      })
      expect(subjectMultiselect).not.toBeInTheDocument()
      expect(dateMultiselect).toBeInTheDocument()
    })
  })
})
