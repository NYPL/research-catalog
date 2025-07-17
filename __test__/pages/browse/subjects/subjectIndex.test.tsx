import SubjectHeadingIndex from "../../../../pages/browse/subjects"
import { render, screen } from "../../../../src/utils/testUtils"

describe("Browse subject heading index page", () => {
  render(<SubjectHeadingIndex />)
  it("renders the subnav", () => {
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
