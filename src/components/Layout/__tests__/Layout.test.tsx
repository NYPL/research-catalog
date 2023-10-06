import React from "react"
import { render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import Layout from "../Layout"

describe("Layout", () => {
  it("should render an H1", () => {
    render(
      <Layout>
        <></>
      </Layout>
    )

    const header = screen.getByRole("heading", { level: 1 })
    const headerText = "Research Catalog"
    expect(header).toHaveTextContent(headerText)
  })
  it("should render breadcrumbs", () => {
    render(
      <Layout>
        <></>
      </Layout>
    )
    const breadcrumbs = screen.getByTestId("layout-breadcrumbs")
    const breadcrumbsUrls = within(breadcrumbs).getAllByRole("link")
    expect(breadcrumbsUrls).toHaveLength(3)
  })
  it("should show search", () => {
    render(
      <Layout activePage="search">
        <></>
      </Layout>
    )
    screen.getByRole("textbox")
  })
  it("should show search bar on search page", () => {
    render(
      <Layout activePage="search">
        <></>
      </Layout>
    )
    screen.getByRole("textbox")
  })
  it("should hide header on 404", () => {
    render(
      <Layout activePage="404">
        <></>
      </Layout>
    )
    const header = screen.queryByRole("heading", { level: 1 })
    expect(header).not.toBeInTheDocument()
  })
})
