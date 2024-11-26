import React from "react"
import { render, fireEvent, waitFor } from "../../../utils/testUtils"
import PasswordForm from "./PasswordForm"
import {
  filteredPickupLocations,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { passwordFormMessages } from "./PasswordForm"

const mockSettingsState = {
  setStatus: jest.fn(),
  setStatusMessage: jest.fn(),
  editingField: "",
  setEditingField: jest.fn(),
}
const accountFetchSpy = jest.fn()

const component = (
  <PatronDataProvider
    testSpy={accountFetchSpy}
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

beforeEach(() => {
  mockSettingsState.setStatus.mockClear()
  mockSettingsState.setStatusMessage.mockClear()
  mockSettingsState.setEditingField.mockClear()
})

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

    const currentPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(currentPasswordField, {
      target: { value: "wrongPassword" },
    })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getByText("Save changes")
    fireEvent.click(submitButton)
    await waitFor(() =>
      expect(mockSettingsState.setStatus).toHaveBeenCalledTimes(2)
    )
    expect(mockSettingsState.setStatusMessage).toHaveBeenCalledWith(
      passwordFormMessages.INCORRECT
    )
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

    const currentPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(currentPasswordField, {
      target: { value: "wrongPassword" },
    })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getByText("Save changes")
    fireEvent.click(submitButton)
    await waitFor(() =>
      expect(mockSettingsState.setStatus).toHaveBeenCalledTimes(2)
    )
    expect(mockSettingsState.setStatus).toHaveBeenNthCalledWith(2, "failure")
    expect(mockSettingsState.setStatusMessage).toHaveBeenCalledWith(
      passwordFormMessages.INVALID
    )
  })

  test("successfully sets patron data if every field is valid", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => "Updated",
    } as Response)

    const { getByText, getByLabelText } = render(component)
    const button = getByText("Edit")
    fireEvent.click(button)

    const currentPasswordField = getByLabelText("Enter current pin/password")
    const newPasswordField = getByLabelText("Enter new pin/password")
    const confirmPasswordField = getByLabelText("Re-enter new pin/password")

    fireEvent.change(currentPasswordField, { target: { value: "oldPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getByText("Save changes")
    fireEvent.click(submitButton)
    await waitFor(() => expect(accountFetchSpy).toHaveBeenCalled())
  })
})
