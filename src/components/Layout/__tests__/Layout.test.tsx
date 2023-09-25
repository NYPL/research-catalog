import React from "react"
import { render, screen } from "@testing-library/react"
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
})
