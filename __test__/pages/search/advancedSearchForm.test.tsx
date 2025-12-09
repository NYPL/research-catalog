import React from "react"
import { fireEvent, render, screen, delay } from "../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import { textInputFields } from "../../../src/utils/advancedSearchUtils"
import AdvancedSearch, {
  defaultEmptySearchErrorMessage,
} from "../../../pages/search/advanced"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Advanced search form", () => {
  beforeEach(async () => {
    render(<AdvancedSearch isAuthenticated={true} />)
  })
  const submit = () => {
    fireEvent.click(screen.getByTestId("submit-advanced-search-button"))
  }
  const getDateInputs = () => {
    const fromInput = screen.getByRole("textbox", { name: /From/ })
    const toInput = screen.getByRole("textbox", { name: /To/ })
    return { fromInput, toInput }
  }
  const updateAllFields = async () => {
    const [
      keywordInput,
      contributorInput,
      titleInput,
      subjectInput,
      callNumberInput,
      uniqueIdentifierInput,
    ] = [
      "Keyword",
      "Title",
      "Author/contributor",
      "Subject",
      "Call number",
      "Unique identifier",
    ].map((field) => screen.getByLabelText(field))
    fireEvent.change(subjectInput, { target: { value: "italian food" } })
    fireEvent.change(keywordInput, { target: { value: "spaghetti" } })
    fireEvent.change(contributorInput, { target: { value: "strega nonna" } })
    fireEvent.change(titleInput, { target: { value: "il amore di pasta" } })
    fireEvent.change(callNumberInput, { target: { value: "12345" } })
    fireEvent.change(uniqueIdentifierInput, { target: { value: "67890" } })

    // without this delay, the input is not updated until after submit is called.
    await delay(500)
    return [
      keywordInput,
      contributorInput,
      titleInput,
      subjectInput,
      callNumberInput,
      uniqueIdentifierInput,
    ]
  }
  afterEach(async () => {
    await userEvent.click(screen.getByText("Clear fields"))
  })
  it("displays alert when no fields are submitted", () => {
    submit()
    expect(screen.getByText(defaultEmptySearchErrorMessage)).toBeInTheDocument()
  })

  it("can set keyword, contributor, title, subject", async () => {
    await updateAllFields()
    submit()

    expect(mockRouter.asPath).toBe(
      "/search?q=spaghetti&title=strega+nonna&contributor=il+amore+di+pasta&callnumber=12345&standard_number=67890&subject=italian+food&searched_from=advanced"
    )
  })
  it("renders inputs for all text input fields", () => {
    textInputFields.map(({ label }) => {
      const input = screen.getByLabelText(label)
      expect(input).toBeInTheDocument()
    })
  })
  it("can select languages", async () => {
    const languageMultiselect = screen.getByLabelText(/Language/, {
      selector: "button",
    })
    expect(languageMultiselect).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(languageMultiselect)
    expect(languageMultiselect).toHaveAttribute("aria-expanded", "true")
    const languageFilter = screen.getByLabelText(/Afrikaans/, {
      selector: "input",
    })
    await userEvent.click(languageFilter)
    submit()
    // expect the label for Afrikaans (afr) to be in url
    expect(mockRouter.asPath).toBe(
      "/search?q=&filters%5Blanguage%5D%5B0%5D=lang%3Aafr&searched_from=advanced"
    )
  })
  it("can search and select collection checkboxes", async () => {
    const collectionMultiselect = screen.getByLabelText(/Collection/, {
      selector: "button",
    })
    expect(collectionMultiselect).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(collectionMultiselect)
    expect(collectionMultiselect).toHaveAttribute("aria-expanded", "true")

    const collectionFilterSearch = screen.getByLabelText(/Search collections/, {
      selector: "input",
    })
    const milsteinDivisionOption = screen.getByLabelText(/Milstein Division/, {
      selector: "input",
    })
    expect(milsteinDivisionOption).toBeInTheDocument()
    await userEvent.type(collectionFilterSearch, "Jean")
    expect(milsteinDivisionOption).not.toBeInTheDocument()
    await userEvent.click(
      screen.getByLabelText(
        "Jean Blackwell Hutson Research and Reference Division"
      )
    )
    submit()
    // expect Jean Blackwell Hutson collection code (scf) in url
    expect(mockRouter.asPath).toBe(
      "/search?q=&filters%5Bcollection%5D%5B0%5D=scf&searched_from=advanced"
    )
  })

  it("can clear the form", async () => {
    const collectionMultiselect = screen.getByLabelText(/Collection/, {
      selector: "button",
    })
    await userEvent.click(collectionMultiselect)
    const milsteinDivisionOption = screen.getByLabelText(/Milstein Division/, {
      selector: "input",
    })
    await userEvent.click(milsteinDivisionOption)

    const [subjectInput, keywordInput, titleInput, contributorInput] =
      await updateAllFields()

    expect(collectionMultiselect).toHaveAttribute(
      "aria-label",
      "Collection multiselect, 1 item selected"
    )
    await userEvent.click(screen.getByText("Clear fields"))
    ;[subjectInput, keywordInput, titleInput, contributorInput].forEach(
      (input) => {
        expect(input).toBeEmptyDOMElement()
      }
    )
    expect(collectionMultiselect).toHaveAttribute(
      "aria-label",
      "Collection multiselect, 0 items selected"
    )

    submit()
    // presence of alert means the form was cleared before hitting submit
    expect(screen.getByText(defaultEmptySearchErrorMessage)).toBeInTheDocument()
  })

  it("submits with valid dates", async () => {
    const { fromInput, toInput } = getDateInputs()
    fireEvent.change(fromInput, { target: { value: "2000" } })
    fireEvent.change(toInput, { target: { value: "2020" } })

    submit()

    expect(mockRouter.asPath).toBe(
      "/search?q=&filters%5BdateTo%5D=2020&filters%5BdateFrom%5D=2000&searched_from=advanced"
    )
  })

  it("shows date error", async () => {
    const { fromInput, toInput } = getDateInputs()
    fireEvent.change(fromInput, { target: { value: "abcd" } })
    fireEvent.change(toInput, { target: { value: "2020" } })

    submit()
    // not mocking useDateFilter, so only the generic date error text appears
    expect(
      screen.getByText(/Please enter a valid date format/)
    ).toBeInTheDocument()
  })

  it("shows error if 'to' date is before 'from' date", async () => {
    const { fromInput, toInput } = getDateInputs()
    fireEvent.change(fromInput, { target: { value: "2020" } })
    fireEvent.change(toInput, { target: { value: "2010" } })

    submit()

    // not mocking useDateFilter, so only the generic date error text appears
    expect(
      screen.getByText(/Please enter a valid date format/)
    ).toBeInTheDocument()
  })

  it("clears date inputs when 'Clear fields' is clicked", async () => {
    const { fromInput, toInput } = getDateInputs()
    fireEvent.change(fromInput, { target: { value: "2000" } })
    fireEvent.change(toInput, { target: { value: "2020" } })

    await userEvent.click(screen.getByText("Clear fields"))

    expect(fromInput).toHaveValue("")
    expect(toInput).toHaveValue("")
  })
})
