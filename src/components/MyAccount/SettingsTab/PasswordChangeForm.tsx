import { useState } from "react"
import {
  Form,
  FormField,
  TextInput,
  Button,
} from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { BASE_URL } from "../../../config/constants"
import type { Patron } from "../../../types/myAccountTypes"

const PasswordChangeForm = ({
  patron,
  updateModal,
}: {
  patron: Patron
  updateModal: (errorMessage?: string) => void
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordsMatch: true,
  })

  const validateForm =
    formData.oldPassword !== "" &&
    formData.newPassword !== "" &&
    formData.confirmPassword !== "" &&
    formData.passwordsMatch

  const handleInputChange = (e) => {
    const { id, value } = e.target
    let updatedFormData = { ...formData }

    if (id === "confirmPassword") {
      updatedFormData = {
        ...updatedFormData,
        confirmPassword: value,
        passwordsMatch: updatedFormData.newPassword === value,
      }
    } else if (id === "newPassword") {
      updatedFormData = {
        ...updatedFormData,
        newPassword: value,
        passwordsMatch: updatedFormData.confirmPassword === value,
      }
    } else {
      updatedFormData = {
        ...updatedFormData,
        [id]: value,
      }
    }

    setFormData(updatedFormData)
  }

  const handleSubmit = async () => {
    const res = await fetch(`${BASE_URL}/api/account/update-pin/${patron.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPin: formData.oldPassword,
        newPin: formData.newPassword,
        barcode: patron.barcode,
      }),
    })
    const errorMessage = await res.json()
    res.status === 200 ? updateModal() : updateModal(errorMessage)
  }

  return (
    <Form id="pw-form" gap="grid.s">
      <FormField>
        <TextInput
          id="oldPassword"
          name="oldPassword"
          type="password"
          className={styles.formTextInput}
          isRequired
          showRequiredLabel={false}
          labelText="Enter current PIN/PASSWORD"
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <TextInput
          id="newPassword"
          name="newPassword"
          type="password"
          className={styles.formTextInput}
          isRequired
          showRequiredLabel={false}
          labelText="Enter new PIN/PASSWORD"
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <TextInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          isInvalid={!formData.passwordsMatch}
          invalidText="PIN/PASSWORDS do not match"
          onChange={handleInputChange}
          isRequired
          className={styles.formTextInput}
          showRequiredLabel={false}
          labelText="Re-enter new PIN/PASSWORD"
        />
      </FormField>
      <FormField>
        <Button
          className={styles.formButton}
          onClick={handleSubmit}
          id="submit"
          isDisabled={!validateForm}
        >
          Change PIN/PASSWORD
        </Button>
      </FormField>
    </Form>
  )
}

export default PasswordChangeForm
