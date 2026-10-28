import React from "react"
import { render, screen } from "../../src/utils/testUtils"
import App from "../../pages/_app"

jest.mock("next/script", () => ({ __esModule: true, default: () => null }))

const MockPage = () => <div>page content</div>

const ThrowingPage = () => {
  throw new Error("eek")
}

describe("App", () => {
  it("renders the page component", () => {
    render(<App Component={MockPage} pageProps={{}} />)
    expect(screen.getByText("page content")).toBeInTheDocument()
  })

  it("renders the error page when a page component throws", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {})
    render(<App Component={ThrowingPage} pageProps={{}} />)
    expect(
      screen.getByText("Something went wrong on our end")
    ).toBeInTheDocument()
  })
})
