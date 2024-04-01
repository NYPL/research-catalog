import { useState } from "react"
import {
  Form,
  FormRow,
  FormField,
  TextInput,
  Button,
} from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"
import { BASE_URL } from "../../config/constants"

const PasswordChangeForm = ({ patron, setModal }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordValid: true,
    passwordsMatch: true,
  })

  function validatePassword(input) {
    let isValid = true
    // Check if string length is 4 or less
    if (input.length <= 4) {
      // Check if it's all numbers
      if (!/^\d+$/.test(input)) {
        isValid = false
      }
      // Check if number is repeated 3 or more times
      const repeatedPattern = /(\d)\1{2,}/
      if (repeatedPattern.test(input)) {
        isValid = false
      }
    } else if (input.length > 32) {
      // Check if string length is longer than 32
      isValid = false
    } else {
      // Check if it has repeating patterns of 2 or 3 characters
      const repeatingPattern = /(.{2,3})\1/
      if (repeatingPattern.test(input)) {
        isValid = false
      }
      // Check if it has periods
      if (input.includes(".")) {
        isValid = false
      }
    }
    formData.passwordValid = isValid
    setFormData({ ...formData })
  }

  const matchPasswords = (firstPassword, secondPassword) => {
    return firstPassword === secondPassword
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === "newPassword") {
      validatePassword(value)
    }
    if (id === "confirmPassword") {
      formData.passwordsMatch = matchPasswords(formData.newPassword, value)
    }
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async () => {
    console.log(formData.oldPassword, formData.newPassword, patron.barcode)
    const response = await fetch(
      `${BASE_URL}/api/account/update-pin/${patron.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPin: formData.oldPassword,
          newPin: formData.newPassword,
          barcode: patron.barcode,
        }),
      }
    )
    if (response.status === 200) {
      setModal("success")
    } else {
      setModal("failure")
    }
  }

  return (
    <Form
      id="pw-form"
      gap="grid.s"
      sx={{ paddingTop: "s", paddingBottom: "m" }}
    >
      <FormRow>
        <FormField>
          <TextInput
            id="oldPassword"
            type="password"
            className={styles.formTextInput}
            isRequired
            showRequiredLabel={false}
            labelText="Enter current PIN/PASSWORD"
            onChange={handleInputChange}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField>
          <TextInput
            id="newPassword"
            type="password"
            className={styles.formTextInput}
            isInvalid={!formData.passwordValid}
            invalidText="PIN/PASSWORD is invalid"
            isRequired
            showRequiredLabel={false}
            labelText="Enter new PIN/PASSWORD"
            onChange={handleInputChange}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField>
          <TextInput
            id="confirmPassword"
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
      </FormRow>
      <FormField>
        <Button
          className={styles.formButton}
          onClick={handleSubmit}
          id={"submit"}
        >
          Change PIN/PASSWORD
        </Button>
      </FormField>
    </Form>
  )
}

export default PasswordChangeForm
