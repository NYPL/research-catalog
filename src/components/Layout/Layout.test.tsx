import React from "react"
import { render, screen, within } from "../../utils/testUtils"
import Layout from "./Layout"
// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Layout", () => {
  const searchLabel = "Search Bar Label"

  it("should render an H1", () => {
    render(<Layout></Layout>)

    const header = screen.getByRole("heading", { level: 1 })

    const headerText = "Research Catalog"
    expect(header).toHaveTextContent(headerText)
  })
  it("should render breadcrumbs", () => {
    render(<Layout></Layout>)
    const breadcrumbs = screen.getByTestId("layout-breadcrumbs")
    const breadcrumbsUrls = within(breadcrumbs).getAllByRole("link")
    expect(breadcrumbsUrls).toHaveLength(3)
  })
  it("should show search", () => {
    render(<Layout activePage="search"></Layout>)
    screen.getByLabelText(searchLabel)
  })
  it("should show search bar on search page", () => {
    render(<Layout activePage="search"></Layout>)
    screen.getByLabelText(searchLabel)
  })
  it("should hide Log Out if user is not logged in", () => {
    render(<Layout isAuthenticated={false}></Layout>)
    const logout = screen.queryByText("Log Out")
    expect(logout).not.toBeInTheDocument()
  })
  it("should show Log Out if user is logged in", () => {
    render(<Layout isAuthenticated={true}></Layout>)
    const logout = screen.queryByText("Log Out")
    expect(logout).toBeInTheDocument()
  })
  it("renders a feedback form component", () => {
    render(<Layout></Layout>)
    expect(screen.getByText("Help and Feedback")).toBeInTheDocument()
  })
})
