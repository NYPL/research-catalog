import { patron } from "../../../../__test__/fixtures/rawSierraAccountData"
import AccountSettingsTab from "./AccountSettingsTab"
import MyAccount from "../../../models/MyAccount"
import { fireEvent, render, screen } from "../../../utils/testUtils"
import * as helpers from "../../../../pages/api/account/helpers"
import userEvent from "@testing-library/user-event"

jest.spyOn(helpers, "updatePatronSettings")

describe("AccountSettingsTab", () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: async () => console.log("updated"),
      status: 200,
    } as Response)
    .mockResolvedValueOnce({
      json: async () => console.log("not updated"),
      status: 500,
    } as Response)

  it("can render a complete patron", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron(patron)
    render(<AccountSettingsTab settingsData={myAccountPatron} />)

    const email = screen.getByText("streganonna@gmail.com")
    expect(email).toBeInTheDocument()
    const phone = screen.getByText("Phone")
    expect(phone).toBeInTheDocument()
    const homeLibrary = screen.getByText("Home library")
    expect(homeLibrary).toBeInTheDocument()
    const pin = screen.getByText("Pin/Password")
    expect(pin).toBeInTheDocument()
  })
  it("can render a patron with no email or phone", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron({
      ...patron,
      emails: [],
      phones: [],
    })
    render(<AccountSettingsTab settingsData={myAccountPatron} />)
    ;["Notification preference", "Home library", "Pin/Password"].forEach(
      (patronInfo) => {
        const element = screen.queryByText(patronInfo)
        if (patronInfo === "Email" || patronInfo === "Phone") {
          expect(element).not.toBeInTheDocument()
        } else expect(element).toBeInTheDocument()
      }
    )
  })
  describe("editing", () => {
    it("clicking the edit button opens the form, \nclicking submit opens modal on success,\n closing modal toggles display", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(<AccountSettingsTab settingsData={myAccountPatron} />)
      // open account settings
      await userEvent.click(screen.getByText("Edit account settings"))
      // verify inputs are present
      const textInputs = screen.getAllByRole("textbox")
      expect(textInputs).toHaveLength(2)
      const dropdowns = screen.getAllByRole("combobox")
      expect(dropdowns).toHaveLength(2)
      // save changes
      await userEvent.click(screen.getByText("Save Changes"))
      expect(
        screen.queryByText("Your account settings were successfully updated.", {
          exact: false,
        })
      ).toBeInTheDocument()
      await userEvent.click(screen.getAllByText("OK")[0])
      textInputs.forEach((input) => expect(input).not.toBeInTheDocument())
    })

    it("clicking the edit button opens the form, \nclicking submit triggers error message on error response", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(<AccountSettingsTab settingsData={myAccountPatron} />)
      await userEvent.click(screen.getByText("Edit account settings"))
      const textInputs = screen.getAllByRole("textbox")
      expect(textInputs).toHaveLength(2)
      const dropdowns = screen.getAllByRole("combobox")
      expect(dropdowns).toHaveLength(2)
      await userEvent.click(screen.getByText("Save Changes"))
      expect(
        screen.queryByText("We were unable to update your account settings.", {
          exact: false,
        })
      ).toBeInTheDocument()
    })
  })
})
