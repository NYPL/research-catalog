import SubjectHeadingResults from "../../../../pages/browse/subjects/[...slug]"
import { render, screen } from "../../../../src/utils/testUtils"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Browse subject heading results page", () => {
  render(<SubjectHeadingResults />)
  it("renders the subnav", () => {
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
