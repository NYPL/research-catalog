import { patron } from "../../../../__test__/fixtures/rawSierraAccountData"
import AccountSettingsTab from "./AccountSettingsTab"
import MyAccount from "../../../models/MyAccount"
import { fireEvent, render, screen } from "../../../utils/testUtils"
import * as helpers from "../../../../pages/api/account/helpers"
import userEvent from "@testing-library/user-event"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"

jest.spyOn(helpers, "updatePatronSettings")

describe("AccountSettingsTab", () => {
  it("can render a complete patron", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron(patron)
    render(
      <AccountSettingsTab
        pickupLocations={filteredPickupLocations}
        settingsData={myAccountPatron}
      />
    )

    const emailLabel = screen.getAllByText("Email")[0]
    const email = screen.getByText("streganonna@gmail.com")
    expect(email).toBeInTheDocument()
    expect(emailLabel).toBeInTheDocument()

    const phone = screen.getByText("Phone")
    const phoneNumber = screen.getByText("123-456-7890")
    expect(phone).toBeInTheDocument()
    expect(phoneNumber).toBeInTheDocument()

    const homeLibrary = screen.getByText("Home library")
    const snfl = screen.getByText("SNFL (formerly Mid-Manhattan)")
    expect(homeLibrary).toBeInTheDocument()
    expect(snfl).toBeInTheDocument()

    const pin = screen.getByText("Pin/Password")
    const maskedPin = screen.getByText("****")
    expect(pin).toBeInTheDocument()
    expect(maskedPin).toBeInTheDocument()
  })
  it("can render a patron with no email or phone", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron({
      ...patron,
      emails: [],
      phones: [],
    })
    render(
      <AccountSettingsTab
        pickupLocations={filteredPickupLocations}
        settingsData={myAccountPatron}
      />
    )
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
      .mockResolvedValueOnce({
        json: async () => console.log("updated"),
        status: 200,
      } as Response)
    it("clicking edit focuses on first input and cancel focuses on edit", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(
        <AccountSettingsTab
          pickupLocations={filteredPickupLocations}
          settingsData={myAccountPatron}
        />
      )
      await userEvent.click(screen.getByText("Edit account settings"))
      const inputs = screen.getAllByRole("textbox")
      expect(inputs[0]).toHaveFocus()
      await userEvent.click(screen.getByText("Cancel"))
      expect(screen.getByText("Edit account settings")).toHaveFocus()
    })
    it("clicking the edit button opens the form, \nclicking submit opens modal on success,\n closing modal toggles display", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(
        <AccountSettingsTab
          pickupLocations={filteredPickupLocations}
          settingsData={myAccountPatron}
        />
      )
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

    it("clicking the edit button opens the form, \nclicking submit triggers error message on error response,\n closing modal toggles display", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(
        <AccountSettingsTab
          pickupLocations={filteredPickupLocations}
          settingsData={myAccountPatron}
        />
      )
      await userEvent.click(screen.getByText("Edit account settings"))
      await userEvent.click(screen.getByText("Save Changes"))
      expect(
        screen.queryByText("We were unable to update your account settings.", {
          exact: false,
        })
      ).toBeInTheDocument()
      await userEvent.click(screen.getAllByText("OK")[0])
      expect(screen.queryByText("Save changes")).not.toBeInTheDocument()
    })

    it("prevents users from submitting empty fields according to notification preference", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(
        <AccountSettingsTab
          pickupLocations={filteredPickupLocations}
          settingsData={myAccountPatron}
        />
      )
      // open account settings
      await userEvent.click(screen.getByText("Edit account settings"))
      const saveButton = screen
        .getByText("Save Changes", { exact: false })
        .closest("button")
      expect(saveButton).not.toBeDisabled()
      // confirm patron has email ("z") selected
      expect(
        screen.getByLabelText("Update notification preference")
      ).toHaveValue("z")
      const emailField = screen.getByLabelText("Update email")
      // update email to empty string
      fireEvent.change(emailField, { target: { value: "" } })

      expect(saveButton).toBeDisabled()
      fireEvent.change(emailField, { target: { value: "email@email" } })
      expect(saveButton).not.toBeDisabled()
      await userEvent.click(screen.getByText("Save Changes"))
      await userEvent.click(screen.getAllByText("OK")[0])
    })
    it("prevents users from submitting empty fields after changing notification preference", async () => {
      const myAccountPatron = MyAccount.prototype.buildPatron({
        ...patron,
      })
      render(
        <AccountSettingsTab
          pickupLocations={filteredPickupLocations}
          settingsData={myAccountPatron}
        />
      )
      // open account settings
      await userEvent.click(screen.getByText("Edit account settings"))
      const saveButton = screen
        .getByText("Save Changes", { exact: false })
        .closest("button")
      expect(saveButton).not.toBeDisabled()
      const notificationPreferenceSelector = screen.getByLabelText(
        "Update notification preference"
      )
      expect(
        screen.getByLabelText("Update notification preference")
      ).toHaveValue("z")
      // update phone number to empty
      const phoneField = screen.getByLabelText("Update phone number")
      fireEvent.change(phoneField, { target: { value: "" } })
      // save button should be enabled because email is still selected as
      // notification preference
      expect(saveButton).not.toBeDisabled()
      // make phone the prefered notifier
      fireEvent.change(notificationPreferenceSelector, {
        target: { value: "p" },
      })
      // now that phone is notification preference, but phone input is empty,
      // user should not be able to save preferences.
      expect(saveButton).toBeDisabled()
    })
  })
})
