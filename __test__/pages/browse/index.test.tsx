import BrowseIndex from "../../../pages/browse"
import { render, screen } from "../../../src/utils/testUtils"

describe("Browse index page", () => {
  render(<BrowseIndex />)
  it("renders the subnav", () => {
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
