import React from "react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import BrowseForm from "./BrowseForm"
import { fireEvent, render, screen } from "../../utils/testUtils"
import { BrowseProvider, useBrowseContext } from "../../context/BrowseContext"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
const BrowseTypeDebugger = () => {
  const { browseType } = useBrowseContext()
  return <div data-testid="browse-type">{browseType}</div>
}

describe("BrowseForm", () => {
  const submit = () =>
    fireEvent(
      screen.getByText("Search").closest("button"),
      new MouseEvent("click")
    )

  beforeEach(() => {
    mockRouter.push("/", undefined, { shallow: true })
    mockRouter.query = {}
  })

  afterEach(async () => {
    const input = screen.getByRole("textbox")
    await userEvent.clear(input)
  })

  const component = (
    <BrowseProvider>
      <BrowseForm activePage="browse" />
      <BrowseTypeDebugger />
    </BrowseProvider>
  )

  it("submits a browse term by default", async () => {
    render(component)
    const input = screen.getByRole("textbox")

    await userEvent.type(input, "Ornithology")
    submit()
    expect(mockRouter.asPath).toBe(
      "/browse?q=Ornithology&search_scope=has&sort=count&sort_direction=desc"
    )
  })

  it("submits with a different search scope", async () => {
    render(component)
    const input = screen.getByRole("textbox")
    const select = screen.getByLabelText("Select a category")

    await userEvent.type(input, "Vietnam War")
    await userEvent.selectOptions(select, "subject_starts_with")
    submit()
    expect(mockRouter.asPath).toBe(
      "/browse?q=Vietnam+War&search_scope=starts_with&sort=termLabel&sort_direction=asc"
    )
  })

  it("clears the input field", async () => {
    render(component)
    const input = screen.getByRole("textbox")

    await userEvent.type(input, "Clear me")
    expect(input).toHaveValue("Clear me")

    const clearButton = screen.getAllByRole("button")[0]

    await userEvent.click(clearButton)

    expect(input).toHaveValue("")
  })

  it("gets browse term from URL on mount", () => {
    mockRouter.query.q = "history"
    render(component)
    const input = screen.getByDisplayValue("history")
    expect(input).toBeInTheDocument()
  })

  it("gets search scope from URL on mount", () => {
    mockRouter.query.search_scope = "starts_with"
    render(component)
    const select = screen.getByLabelText(
      "Select a category"
    ) as HTMLSelectElement
    expect(select.value).toBe("subject_starts_with")
  })

  it("renders the browse tip", () => {
    render(component)
    const tip = screen.getByText(/browse tip/i)
    expect(tip).toBeInTheDocument()
  })

  it("updates the browse type when changing the dropdown", async () => {
    render(component)

    const select = screen.getByLabelText("Select a category")

    // Default browseType
    expect(screen.getByTestId("browse-type")).toHaveTextContent("subjects")

    // Switch to contributors
    await userEvent.selectOptions(select, "contributor_has")

    expect(screen.getByTestId("browse-type")).toHaveTextContent("contributors")
  })

  it("maintains the search term when changing browse type", async () => {
    render(component)
    const input = screen.getByRole("textbox")
    const select = screen.getByLabelText("Select a category")

    await userEvent.type(input, "Ornithology")
    expect(input).toHaveValue("Ornithology")

    await userEvent.selectOptions(select, "subject_starts_with")

    expect(input).toHaveValue("Ornithology")
  })
})
