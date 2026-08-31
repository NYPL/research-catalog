import React from "react"
import { render, screen, act, fireEvent } from "../../src/utils/testUtils"
import App from "../../pages/_app"
import mockRouter from "next-router-mock"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.mock("next/script", () => ({ __esModule: true, default: () => null }))

const MockPage = () => <div>page content</div>

describe("App level clientside navigation error handling", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the page component normally", () => {
    render(<App Component={MockPage} pageProps={{}} />)
    expect(screen.getByText("page content")).toBeInTheDocument()
  })

  describe("when routeChangeError fires", () => {
    it("replaces page content with the navigation error page", () => {
      render(<App Component={MockPage} pageProps={{}} />)

      act(() => {
        mockRouter.events.emit(
          "routeChangeError",
          new Error("Unexpected token '<'"),
          "/search?q=toast"
        )
      })

      expect(
        screen.getByText("Something went wrong on our end")
      ).toBeInTheDocument()
      expect(screen.queryByText("page content")).not.toBeInTheDocument()
    })

    it("shows a reload link", () => {
      render(<App Component={MockPage} pageProps={{}} />)

      act(() => {
        mockRouter.events.emit(
          "routeChangeError",
          new Error("Unexpected token '<'"),
          "/search?q=toast"
        )
      })

      expect(
        screen.getByRole("button", { name: "reloading the page" })
      ).toBeInTheDocument()
    })

    it("Reload page button triggers a full server-side reload", () => {
      const reloadMock = jest.fn()
      Object.defineProperty(window, "location", {
        writable: true,
        value: { ...window.location, reload: reloadMock },
      })

      render(<App Component={MockPage} pageProps={{}} />)

      act(() => {
        mockRouter.events.emit(
          "routeChangeError",
          new Error("Unexpected token '<'"),
          "/search?q=toast"
        )
      })

      fireEvent.click(
        screen.getByRole("button", { name: "reloading the page" })
      )
      expect(reloadMock).toHaveBeenCalledTimes(1)
    })

    it("clears the error page when the next navigation completes successfully", () => {
      render(<App Component={MockPage} pageProps={{}} />)

      act(() => {
        mockRouter.events.emit(
          "routeChangeError",
          new Error("Unexpected token '<'"),
          "/search?q=toast"
        )
      })

      expect(
        screen.getByText("Something went wrong on our end")
      ).toBeInTheDocument()

      act(() => {
        mockRouter.events.emit("routeChangeComplete", "/search?q=spaghetti", {
          shallow: false,
        })
      })

      expect(
        screen.queryByText("Something went wrong on our end")
      ).not.toBeInTheDocument()
      expect(screen.getByText("page content")).toBeInTheDocument()
    })
  })
})
