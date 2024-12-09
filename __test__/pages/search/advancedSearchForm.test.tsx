import React from "react"
import {
  fireEvent,
  render,
  screen,
  waitFor,
  delay,
} from "../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import { textInputFields } from "../../../src/utils/advancedSearchUtils"
import AdvancedSearch, {
  defaultEmptySearchErrorMessage,
} from "../../../pages/search/advanced"
import { searchAggregations } from "../../../src/config/aggregations"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Advanced Search Form", () => {
  beforeEach(async () => {
    render(<AdvancedSearch isAuthenticated={true} />)
  })
  const submit = () => {
    fireEvent.click(screen.getByTestId("submit-advanced-search-button"))
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
      "Author/Contributor",
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
    await delay(100)
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
    screen.getByText(defaultEmptySearchErrorMessage)
  })

  it("can set keyword, contributor, title, subject", async () => {
    await updateAllFields()
    submit()

    expect(mockRouter.asPath).toBe(
      "/search?q=spaghetti&title=strega+nonna&contributor=il+amore+di+pasta&callnumber=12345&standard_number=67890&subject=italian+food"
    )
  })
  it("renders inputs for all text input fields", () => {
    textInputFields.map(({ label }) => {
      const input = screen.getByLabelText(label)
      expect(input).toBeInTheDocument()
    })
  })

  it("can select languages", async () => {
    const languageSelect = screen.getByLabelText("Language")
    await userEvent.selectOptions(languageSelect, "Azerbaijani")
    submit()
    // expect the label for Azerbaijani ("lang:aze") to be in url
    expect(mockRouter.asPath).toBe(
      "/search?q=&filters%5Blanguage%5D=lang%3Aaze"
    )
  })
  it("can check material checkboxes", async () => {
    await userEvent.click(screen.getByLabelText("Notated music"))
    await userEvent.click(screen.getByLabelText("Cartographic"))
    submit()
    // expect the label for notated music and cartographic
    // ("resourcetypes:not", "resourcetypes:car") to be in url
    expect(mockRouter.asPath).toBe(
      "/search?q=&filters%5BmaterialType%5D%5B0%5D=resourcetypes%3Anot&filters%5BmaterialType%5D%5B1%5D=resourcetypes%3Acar"
    )
  })
  it("can check location checkboxes", async () => {
    const location = searchAggregations.buildingLocation[0]
    await userEvent.click(screen.getByLabelText(location.label as string))
    submit()
    expect(mockRouter.asPath).toBe(
      `/search?q=&filters%5BbuildingLocation%5D%5B0%5D=${location.value}`
    )
  })

  it("can clear the form", async () => {
    const notatedMusic = screen.getByLabelText("Notated music")
    await userEvent.click(notatedMusic)
    const cartographic = screen.getByLabelText("Cartographic")
    await userEvent.click(cartographic)
    const selector = screen.getByLabelText("Language")
    await userEvent.selectOptions(selector, "Azerbaijani")
    const schomburg = screen.getByLabelText("Schomburg Center for", {
      exact: false,
    })

    await userEvent.click(schomburg)
    const [subjectInput, keywordInput, titleInput, contributorInput] =
      await updateAllFields()

    await userEvent.click(screen.getByText("Clear fields"))
    ;[notatedMusic, cartographic, schomburg].forEach((input) =>
      expect(input).not.toBeChecked()
    )
    expect(selector).not.toHaveDisplayValue("Azerbaijani")
    ;[subjectInput, keywordInput, titleInput, contributorInput].forEach(
      (input) => {
        expect(input).toBeEmptyDOMElement()
      }
    )

    submit()
    // presence of alert means the form was cleared before hitting submit
    expect(screen.getByText(defaultEmptySearchErrorMessage)).toBeInTheDocument()
  })
})
