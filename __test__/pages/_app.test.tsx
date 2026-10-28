import React from "react"
import { render, screen } from "../../src/utils/testUtils"
import App from "../../pages/_app"

jest.mock("next/script", () => ({ __esModule: true, default: () => null }))

const MockPage = () => <div>page content</div>

describe("App", () => {
  it("renders the page component", () => {
    render(<App Component={MockPage} pageProps={{}} />)
    expect(screen.getByText("page content")).toBeInTheDocument()
  })
})
