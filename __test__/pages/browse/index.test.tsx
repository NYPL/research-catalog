import Browse from "../../../pages/browse"
import { render, screen } from "../../../src/utils/testUtils"

describe("Browse index page", () => {
  render(
    <Browse subjects={{ status: 200, subjects: [] }} isAuthenticated={false} />
  )
  it("renders the subnav", () => {
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
