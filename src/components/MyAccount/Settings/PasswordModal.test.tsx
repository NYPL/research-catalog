import React from "react"

import { render, fireEvent, waitFor } from "../../../utils/testUtils"
import PasswordModal from "./PasswordModal"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"

describe("PasswordModal", () => {
  test("renders", () => {
    const { getByText } = render(<PasswordModal patron={processedPatron} />)
    expect(getByText("Change pin/password")).toBeInTheDocument()
  })

  test("opens modal on button click", () => {
    const { getByText, getByRole } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)
    const modal = getByRole("dialog")
    expect(modal).toBeInTheDocument()
  })

  test("closes modal when clicking cancel button", () => {
    const { getByText, queryByRole } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)
    const cancelButton = getByText("Cancel")
    fireEvent.click(cancelButton)
    expect(queryByRole("dialog")).toBeNull()
  })

  test("displays success modal when form is valid and submitted", async () => {
    // Successful response
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => "Updated",
    } as Response)

    const { getByText, getAllByText, getByLabelText, queryByText } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current PIN/PASSWORD")
    const newPasswordField = getByLabelText("Enter new PIN/PASSWORD")
    const confirmPasswordField = getByLabelText("Re-enter new PIN/PASSWORD")

    fireEvent.change(oldPasswordField, { target: { value: "oldPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getAllByText("Change PIN/PASSWORD")[1]
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        queryByText("Your PIN/PASSWORD has been changed.")
      ).toBeInTheDocument()
    })

    fireEvent.click(getByText("OK"))

    await waitFor(() => {
      expect(queryByText("Your PIN/PASSWORD has been changed.")).toBeNull()
    })
  })

  test("disables submit button if any form field is empty", async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)

    const submitButton = getAllByText("Change PIN/PASSWORD")[1]

    const newPasswordField = getByLabelText("Enter new PIN/PASSWORD")
    const confirmPasswordField = getByLabelText("Re-enter new PIN/PASSWORD")

    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "wrongPassword" },
    })

    expect(submitButton).toBeDisabled()
  })

  test("disables submit button if passwords don't match", async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current PIN/PASSWORD")
    const newPasswordField = getByLabelText("Enter new PIN/PASSWORD")
    const confirmPasswordField = getByLabelText("Re-enter new PIN/PASSWORD")

    fireEvent.change(oldPasswordField, { target: { value: "oldPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "wrongPassword" },
    })

    const submitButton = getAllByText("Change PIN/PASSWORD")[1]
    expect(submitButton).toBeDisabled()
  })

  test("displays failure modal if current password is wrong", async () => {
    // Failure response
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      json: async () => "Invalid parameter: Invalid PIN or barcode",
    } as Response)

    const { getByText, getAllByText, getByLabelText, queryByText } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current PIN/PASSWORD")
    const newPasswordField = getByLabelText("Enter new PIN/PASSWORD")
    const confirmPasswordField = getByLabelText("Re-enter new PIN/PASSWORD")

    fireEvent.change(oldPasswordField, { target: { value: "wrongPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getAllByText("Change PIN/PASSWORD")[1]
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        queryByText(
          "We were unable to change your PIN/PASSWORD: Current PIN/PASSWORD is incorrect."
        )
      ).toBeInTheDocument()
    })
  })

  test("displays failure modal if new password is invalid", async () => {
    // Failure response
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      json: async () => "PIN is not valid : PIN is trivial",
    } as Response)

    const { getByText, getAllByText, getByLabelText, queryByText } = render(
      <PasswordModal patron={processedPatron} />
    )
    const button = getByText("Change pin/password")
    fireEvent.click(button)

    const oldPasswordField = getByLabelText("Enter current PIN/PASSWORD")
    const newPasswordField = getByLabelText("Enter new PIN/PASSWORD")
    const confirmPasswordField = getByLabelText("Re-enter new PIN/PASSWORD")

    fireEvent.change(oldPasswordField, { target: { value: "wrongPassword" } })
    fireEvent.change(newPasswordField, { target: { value: "newPassword" } })
    fireEvent.change(confirmPasswordField, {
      target: { value: "newPassword" },
    })

    const submitButton = getAllByText("Change PIN/PASSWORD")[1]
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        queryByText(
          "We were unable to change your PIN/PASSWORD: New PIN/PASSWORD is invalid."
        )
      ).toBeInTheDocument()
    })
  })
})
