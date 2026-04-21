import React from "react"
import { render, screen, fireEvent } from "../../utils/testUtils"
import { QueryBanner } from "./QueryBanner"

describe("QueryBanner", () => {
  beforeEach(() => {
    // clear the cookie before each test
    document.cookie = "seenQueryBanner=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  })

  it("renders the banner when the cookie is absent", () => {
    render(<QueryBanner />)

    expect(screen.getByText("Got it")).toBeInTheDocument()
    expect(screen.getByText(/Search using queries/i)).toBeInTheDocument()
  })

  it("does not render the banner when the cookie is present", () => {
    document.cookie = "seenQueryBanner=true"
    render(<QueryBanner />)

    expect(screen.queryByText("Got it")).not.toBeInTheDocument()
  })

  it("dismisses the banner and sets the cookie when 'Got it' is clicked", () => {
    render(<QueryBanner />)

    const dismissLink = screen.getByText("Got it")
    fireEvent.click(dismissLink)

    expect(screen.queryByText("Got it")).not.toBeInTheDocument()

    // cookie should now be set in the mock document
    expect(document.cookie).toContain("seenQueryBanner=true")
  })
})
