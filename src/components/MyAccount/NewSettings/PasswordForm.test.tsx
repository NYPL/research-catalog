import React from "react"
import { render, fireEvent } from "../../../utils/testUtils"
import PasswordForm from "./PasswordForm"
import {
  filteredPickupLocations,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { PatronDataProvider } from "../../../context/PatronDataContext"

const mockSettingsState = {
  setIsSuccess: jest.fn(),
  setIsFailure: jest.fn(),
  isOtherEditing: false,
  setIsOtherEditing: jest.fn(),
}
const component = (
  <PatronDataProvider
    value={{
      patron: processedPatron,
      pickupLocations: filteredPickupLocations,
    }}
  >
    <PasswordForm
      patronData={processedPatron}
      settingsState={mockSettingsState}
    />
  </PatronDataProvider>
)

describe("Pin/password form", () => {
  test("disables submit button if any form field is empty", async () => {
    const { getByText, getByLabelText } = render(component)
    const button = getByText("Edit")
    fireEvent.click(button)

    const submitButton = getByText("Save changes")

    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "wrongPassword" },
    })

    expect(submitButton).toBeDisabled()
  })

  test("disables submit button if passwords don't match", async () => {
    const { getByText, getByLabelText } = render(component)
    const button = getByText("Edit")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(oldPasswordField, { target: { value: "oldPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "wrongPassword" },
    })

    const submitButton = getByText("Save changes")
    expect(submitButton).toBeDisabled()
  })

  test("sets failure if current password is wrong", async () => {
    // Failure response
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      json: async () => "Invalid parameter: Invalid PIN or barcode",
    } as Response)

    const { getByText, getByLabelText } = render(component)
    const button = getByText("Edit")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(oldPasswordField, { target: { value: "wrongPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getByText("Save changes")
    fireEvent.click(submitButton)
  })

  test("sets failure if new password is invalid", async () => {
    // Failure response
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      json: async () => "PIN is not valid : PIN is trivial",
    } as Response)

    const { getByText, getByLabelText } = render(component)
    const button = getByText("Edit")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(oldPasswordField, { target: { value: "wrongPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getByText("Save changes")
    fireEvent.click(submitButton)
  })

  test("sets success if every field is valid", async () => {
    // Failure response
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => "Updated",
    } as Response)

    const { getByText, getByLabelText } = render(component)
    const button = getByText("Edit")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(oldPasswordField, { target: { value: "oldPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getByText("Save changes")
    fireEvent.click(submitButton)
  })
})
