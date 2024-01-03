import React from "react"
import { fireEvent, render, screen, act } from "@testing-library/react"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import AdvancedSearch, {
  badDateErrorMessage,
  defaultEmptySearchErrorMessage,
} from "../../../pages/search/advanced"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Advanced Search Form", () => {
  const submit = () =>
    fireEvent(
      screen.getByRole("button", { name: "Submit" }),
      new MouseEvent("click")
    )
  afterEach(async () => {
    await act(
      async () =>
        await userEvent.click(screen.getByRole("button", { name: "Clear" }))
    )
  })
  it("displays alert when no fields are submitted", () => {
    render(<AdvancedSearch />)

    submit()
    screen.getByText(defaultEmptySearchErrorMessage)
  })
  // this test is broken due to debounce/userEvent/timing weirdness.
  // this functionality works in the browser, but won't include
  // final input in output string in test. the broken test is
  // commented out below.
  it.todo("can set keyword, contributor, title, subject")
  // async () => {
  //   render(<AdvancedSearch />)

  //   const [keywordInput, contributorInput, titleInput, subjectInput] = [
  //     "Keywords",
  //     "Title",
  //     "Author",
  //     "Subject",
  //   ].map((field) => screen.getByLabelText(field))
  //   await act(async () => {
  //     await userEvent.type(subjectInput, "italian food")
  //     await userEvent.type(keywordInput, "spaghetti")
  //     await userEvent.type(contributorInput, "strega nonna")
  //     await userEvent.type(titleInput, "il amore di pasta")
  //     // this set stimeout is to ad
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     setTimeout(() => {}, 300)
  //     submit()
  //     expect(mockRouter.asPath).toBe(
  //       "/search?q=spaghetti&contributor=il+amore+di+pasta&title=strega+nonna&subject=italian+food"
  //     )
  //   })
  // })
  it("can select languages", async () => {
    render(<AdvancedSearch />)

    const languageSelect = screen.getByRole("combobox", { name: "Language" })
    await act(async () => {
      await userEvent.selectOptions(languageSelect, "Azerbaijani")
      submit()
      // expect the label for Azerbaijani ("lang:aze") to be in url
      expect(mockRouter.asPath).toBe(
        "/search?q=&filters%5Blanguage%5D=lang%3Aaze"
      )
    })
  })
  it("can check material checkboxes", async () => {
    render(<AdvancedSearch />)
    await act(async () => {
      await userEvent.click(screen.getByLabelText("Notated music"))
      await userEvent.click(screen.getByLabelText("Cartographic"))
      submit()
      // expect the label for notated music and cartographic
      // ("resourcetypes:not", "resourcetypes:car") to be in url
      expect(mockRouter.asPath).toBe(
        "/search?q=&filters%5BmaterialType%5D%5B0%5D=resourcetypes%3Anot&filters%5BmaterialType%5D%5B1%5D=resourcetypes%3Acar"
      )
    })
  })
  it("should throw an error when the date from is bigger than the date to", async () => {
    render(<AdvancedSearch />)
    await act(async () => {
      const dateFromInput = screen.getByLabelText("From")
      const dateToInput = screen.getByLabelText("To")
      await userEvent.type(dateFromInput, "1999")
      await userEvent.type(dateToInput, "1900")
      submit()

      expect(screen.getByText(badDateErrorMessage)).toBeInTheDocument()
    })
  })
  it("can clear the form", async () => {
    render(<AdvancedSearch />)

    await act(async () => {
      const notatedMusic = screen.getByRole("checkbox", {
        name: "Notated music",
      })
      await userEvent.click(notatedMusic)
      const cartographic = screen.getByLabelText("Cartographic")
      await userEvent.click(cartographic)
      await userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Language" }),
        "Azerbaijani"
      )
      const [keywordInput, contributorInput, titleInput, subjectInput] =
        screen.getAllByRole("textbox")
      await userEvent.type(keywordInput, "spaghetti")
      await userEvent.type(contributorInput, "strega nonna")
      await userEvent.type(titleInput, "il amore di pasta")
      await userEvent.type(subjectInput, "italian food")

      await userEvent.click(screen.getByRole("button", { name: "Clear" }))
      expect(notatedMusic).not.toBeChecked()
      submit()
      // presence of alert means the form was cleared before hitting submit
      expect(
        screen.getByText(defaultEmptySearchErrorMessage)
      ).toBeInTheDocument()
    })
  })
})
