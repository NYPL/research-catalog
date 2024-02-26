import React from "react"
import { render, screen, within } from "@testing-library/react"

import Layout from "./Layout"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Layout", () => {
  const searchLabel =
    "Search by keyword, title, journal title, or author/contributor"

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
  it("should hide header on 404", () => {
    render(<Layout activePage="404"></Layout>)
    const header = screen.queryByRole("heading", { level: 1 })
    expect(header).not.toBeInTheDocument()
  })
  it("should hide Log Out if user is not logged in", () => {
    render(<Layout isAuthenticated={false}></Layout>)
    const logout = screen.queryByText("Log out")
    expect(logout).not.toBeInTheDocument()
  })
  it("should show Log Out if user is logged in", () => {
    render(<Layout isAuthenticated={true}></Layout>)
    const logout = screen.queryByText("Log out")
    expect(logout).toBeInTheDocument()
  })
})
