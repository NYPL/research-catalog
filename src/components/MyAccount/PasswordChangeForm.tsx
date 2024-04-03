import { useState } from "react"
import {
  Form,
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
    passwordsMatch: true,
  })

  const matchPasswords = (firstPassword, secondPassword) => {
    return firstPassword === secondPassword
  }

  const validateForm = () => {
    return formData.oldPassword === "" ||
      formData.newPassword === "" ||
      formData.confirmPassword === "" ||
      !formData.passwordsMatch
      ? false
      : true
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target

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
      width="50%"
      sx={{ paddingTop: "s", paddingBottom: "m" }}
    >
      <FormField className={styles.formField}>
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
      <FormField className={styles.formField}>
        <TextInput
          id="newPassword"
          type="password"
          className={styles.formTextInput}
          isRequired
          showRequiredLabel={false}
          labelText="Enter new PIN/PASSWORD"
          onChange={handleInputChange}
        />
      </FormField>
      <FormField className={styles.formField}>
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
      <FormField>
        <Button
          className={styles.formButton}
          onClick={handleSubmit}
          id="submit"
          isDisabled={!validateForm()}
        >
          Change PIN/PASSWORD
        </Button>
      </FormField>
    </Form>
  )
}

export default PasswordChangeForm
