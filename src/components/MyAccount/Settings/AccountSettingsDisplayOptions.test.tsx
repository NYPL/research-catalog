import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import {
  emptyPatron,
  mockPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { render, screen } from "../../../utils/testUtils"

describe("AccountSettingsDisplayOptions", () => {
  describe("Display normal patron", () => {
    beforeEach(() => {
      render(
        <AccountSettingsDisplay
          patron={{ ...mockPatron, notificationPreference: "Mobile" }}
        />
      )
    })
    it("displays a selector with patron's home library selected", () => {
      const homeLibrary = screen.getByText("SNFL (formerly Mid-Manhattan)")
      expect(homeLibrary).toBeInTheDocument()
    })
    it("displays a selector with patron's notification selected", () => {
      const notificationPreference = screen.getByText("Mobile")
      expect(notificationPreference).toBeInTheDocument()
    })
    it("displays a text input with patron's primary email displayed", () => {
      const primaryEmail = screen.getByText("streganonna@gmail.com")
      expect(primaryEmail).toBeInTheDocument()
    })
    it("displays a text input with patron's primary phone displayed", () => {
      const phone = screen.getByText("123-456-7890")
      expect(phone).toBeInTheDocument()
    })
    it("displays password mask", () => {
      const pin = screen.getByText("****")
      expect(pin).toBeInTheDocument()
    })
  })
  describe("empty patron", () => {
    it("doesn't display email, phone, or notification preference if not specified", () => {
      render(<AccountSettingsDisplay patron={emptyPatron} />)
      const missingFields = ["Email", "Phone", "Notification preference"].map(
        (name) => {
          return screen.queryByLabelText(name)
        }
      )
      missingFields.forEach((field) => expect(field).not.toBeInTheDocument())
    })
    it("displays empty email, phone, or notification preference if not specified", () => {
      render(<AccountSettingsForm patron={emptyPatron} />)
      const missingFields = [
        "Update email",
        "Update phone number",
        "Update notification preference",
      ].map((name) => {
        return screen.queryByLabelText(name)
      })
      missingFields.forEach((field) => expect(field).toBeInTheDocument())
    })
  })
  describe("Update", () => {
    beforeEach(() => {
      render(<AccountSettingsForm patron={mockPatron} />)
    })
    it("displays a selector with patron's home library selected", () => {
      const homeLibraryCode = screen.getByDisplayValue(
        "SNFL (formerly Mid-Manhattan)"
      )
      expect(homeLibraryCode).toBeInTheDocument()
    })
    it("displays a selector with patron's notification selected", () => {
      const notificationPreference = screen.getByLabelText("Update email")
      expect(notificationPreference).toBeInTheDocument()
    })
    it("displays a text input with patron's primary email displayed", () => {
      const primaryEmail = screen.getByDisplayValue("streganonna@gmail.com")
      expect(primaryEmail).toBeInTheDocument()
    })
    it("displays a text input with patron's primary phone displayed", () => {
      const phone = screen.getByDisplayValue("123-456-7890")
      expect(phone).toBeInTheDocument()
    })
    it("displays password mask", () => {
      const pin = screen.getByText("****")
      expect(pin).toBeInTheDocument()
    })
  })
})
