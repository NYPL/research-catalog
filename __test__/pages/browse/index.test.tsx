import Browse from "../../../pages/browse"
import { render, screen } from "../../../src/utils/testUtils"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Browse index page", () => {
  render(
    <Browse
      results={{ status: 200, totalResults: 0, subjects: [] }}
      isAuthenticated={false}
    />
  )
  it("renders the subnav", () => {
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
