import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import {
  emptyPatron,
  filteredPickupLocations,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { render, screen, within } from "../../../utils/testUtils"
import { useRef } from "react"

const FormWithRef = ({ patron }) => {
  const ref = useRef()
  return (
    <AccountSettingsForm
      pickupLocations={filteredPickupLocations}
      firstInputRef={ref}
      patron={patron}
      setIsFormValid={() => {
        return true
      }}
    />
  )
}

describe("AccountSettingsDisplayOptions", () => {
  describe("Display normal patron", () => {
    beforeEach(() => {
      render(
        <AccountSettingsDisplay
          patron={{ ...processedPatron, notificationPreference: "p" }}
        />
      )
    })
    it("displays patron's home library", () => {
      const homeLibrary = screen.getByText("SNFL (formerly Mid-Manhattan)")
      expect(homeLibrary).toBeInTheDocument()
    })
    it("displays a selector with patron's notification selected", () => {
      const pref = screen.getByTestId("Notification preference")
      const notificationPreference = within(pref).getByText("Phone")
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
    it("displays empty email, phone, or notification preference in edit mode if not specified", () => {
      render(<FormWithRef patron={emptyPatron} />)
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
      render(<FormWithRef patron={processedPatron} />)
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
