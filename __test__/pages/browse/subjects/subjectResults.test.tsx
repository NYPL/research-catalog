import SubjectHeadingResults from "../../../../pages/browse/subjects/[...slug]"
import { render, screen } from "../../../../src/utils/testUtils"

describe("Browse subject heading results page", () => {
  render(<SubjectHeadingResults />)
  it("renders the subnav", () => {
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
