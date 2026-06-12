import React from "react"
import { render, screen, fireEvent } from "../../utils/testUtils"
import { FeaturePopup } from "./FeaturePopup"

describe("FeaturePopup", () => {
  beforeEach(() => {
    // clear the cookie before each test
    document.cookie = "seenTestId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  })
  const component = (
    <FeaturePopup id="TestId" title="Test title" content="Test content" />
  )

  it("renders when the cookie is absent", () => {
    render(component)

    expect(screen.getByText("Got it")).toBeInTheDocument()
    expect(screen.getByText(/Test title/i)).toBeInTheDocument()
  })

  it("does not render when the cookie is present", () => {
    document.cookie = "seenTestId=true"
    render(component)

    expect(screen.queryByText("Got it")).not.toBeInTheDocument()
  })

  it("dismisses the banner and sets the cookie when 'Got it' is clicked", () => {
    render(component)

    const dismissLink = screen.getByText("Got it")
    fireEvent.click(dismissLink)

    expect(screen.queryByText("Got it")).not.toBeInTheDocument()

    // cookie should now be set in the mock document
    expect(document.cookie).toContain("seenTestId=true")
  })
})
