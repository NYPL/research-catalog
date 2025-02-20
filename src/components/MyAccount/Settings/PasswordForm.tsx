import { forwardRef, useContext, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  Banner,
  Flex,
  SkeletonLoader,
  Text,
  TextInput,
} from "@nypl/design-system-react-components"
import SettingsLabel from "./SettingsLabel"
import SaveCancelButtons from "./SaveCancelButtons"
import type { Patron } from "../../../types/myAccountTypes"
import { BASE_URL } from "../../../config/constants"
import EditButton from "./EditButton"

interface PasswordFormProps {
  patronData: Patron
  settingsState
}

interface PasswordFormFieldProps {
  label: string
  handler: (e) => void
  name: string
  isInvalid?: boolean
}

export const passwordFormMessages = {
  INCORRECT: "Incorrect current pin/password.",
  INVALID: "Invalid new pin/password.",
}

const PasswordFormField = forwardRef<TextInputRefType, PasswordFormFieldProps>(
  ({ label, handler, name, isInvalid }: PasswordFormFieldProps, ref) => {
    return (
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        gap={{ base: "xs", lg: "unset" }}
      >
        <SettingsLabel icon="actionLockClosed" text={label} />
        <TextInput
          sx={{
            width: { base: "100%", md: "300px" },
          }}
          ref={ref}
          marginLeft={{ base: "m", lg: 0 }}
          id={name}
          name={name}
          type="password"
          isRequired
          showLabel={false}
          showRequiredLabel={false}
          labelText={label}
          onChange={handler}
          invalidText="Pin/passwords do not match."
          isInvalid={isInvalid}
          isClearable
        />
      </Flex>
    )
  }
)

PasswordFormField.displayName = "PasswordFormField"

const PasswordForm = ({ patronData, settingsState }: PasswordFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordsMatch: true,
  })
  const { setStatus, setStatusMessage, editingField, setEditingField } =
    settingsState
  const editingRef = useRef<HTMLButtonElement | null>()
  const inputRef = useRef<TextInputRefType | null>()

  const cancelEditing = () => {
    setIsEditing(false)
    clearForm()
    setEditingField("")
    setTimeout(() => {
      editingRef.current?.focus()
    }, 0)
  }

  const clearForm = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordsMatch: true,
    })
  }
  const validateForm =
    formData.currentPassword !== "" &&
    formData.newPassword !== "" &&
    formData.confirmPassword !== "" &&
    formData.passwordsMatch

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let updatedFormData = { ...formData }

    updatedFormData = {
      ...updatedFormData,
      [name]: value,
    }
    if (name === "confirmPassword") {
      updatedFormData.passwordsMatch = updatedFormData.newPassword === value
    } else if (name === "newPassword") {
      updatedFormData.passwordsMatch = updatedFormData.confirmPassword === value
    }
    setFormData(updatedFormData)
  }

  const submitForm = async () => {
    setIsLoading(true)
    setIsEditing(false)
    setStatus("")
    try {
      const response = await fetch(
        `${BASE_URL}/api/account/update-pin/${patronData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPin: formData.currentPassword,
            newPin: formData.newPassword,
            barcode: patronData.barcode,
          }),
        }
      )

      const errorMessage = await response.json()
      if (response.status === 200) {
        await getMostUpdatedSierraAccountData()
        setStatus("success")
      } else {
        setStatus("failure")
        if (errorMessage) {
          errorMessage.startsWith("Invalid parameter")
            ? // Returning a more user-friendly error message.
              setStatusMessage(passwordFormMessages.INCORRECT)
            : setStatusMessage(passwordFormMessages.INVALID)
        }
      }
    } catch (error) {
      console.error("Error submitting", error)
    } finally {
      setIsLoading(false)
      clearForm()
      setEditingField("")
    }
  }

  return (
    <>
      {isLoading ? (
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="100%"
        >
          <SettingsLabel icon="actionLockClosed" text="Pin/password" />
          <SkeletonLoader
            sx={{ "> div": { marginTop: "-s" } }}
            contentSize={2}
            showImage={false}
            headingSize={0}
          />
        </Flex>
      ) : isEditing ? (
        <>
          <Flex alignItems="flex-start" flexDir={{ base: "column", lg: "row" }}>
            <Flex
              sx={{
                flexDir: "column",
                gap: "s",
              }}
            >
              <PasswordFormField
                ref={inputRef}
                label="Enter current pin/password"
                name="currentPassword"
                handler={handleInputChange}
              />
              <PasswordFormField
                label="Enter new pin/password"
                name="newPassword"
                handler={handleInputChange}
              />
              <PasswordFormField
                label="Re-enter new pin/password"
                name="confirmPassword"
                handler={handleInputChange}
                isInvalid={!formData.passwordsMatch}
              />
            </Flex>
            <SaveCancelButtons
              inputType="password"
              onCancel={cancelEditing}
              isDisabled={!validateForm}
              onSave={submitForm}
            />
          </Flex>
          <Banner
            sx={{ marginTop: "s", width: { base: "unset", lg: "50%" } }}
            content={
              <>
                <Text
                  size="body1"
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  Use a strong PIN/PASSWORD to protect your security and
                  identity.
                </Text>
                <Text>
                  You have the option of creating a standard PIN (4 characters
                  in length) or the more secure option of creating a PASSWORD up
                  to 32 characters long. <br /> <br /> You can create a
                  PIN/PASSWORD that includes upper or lower case characters
                  (a-z, A-Z), numbers (0-9), and/or special characters limited
                  to the following: ~ ! ? @ # $ % ^ & * ( ) <br /> <br />
                  PINs or PASSWORDS must not contain common patterns, for
                  example: a character that is repeated 3 or more times (0001,
                  aaaa, aaaatf54, x7gp3333), or four characters repeated two or
                  more times (1212, abab, abcabc, ababx7gp, x7gp3434). <br />{" "}
                  <br />
                  PINs and PASSWORDS must NOT contain a period.
                </Text>
              </>
            }
          />
        </>
      ) : (
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="100%"
        >
          <SettingsLabel icon="actionLockClosed" text="Pin/password" />
          <Flex>
            <Text
              sx={{
                width: { base: "200px", sm: "250px" },
                marginTop: "xs",
                marginLeft: { base: "m", lg: "unset" },
                marginBottom: 0,
              }}
            >
              ****
            </Text>
            {editingField === "" && (
              <EditButton
                ref={editingRef}
                buttonLabel="Edit password"
                buttonId="edit-password-button"
                onClick={() => {
                  setIsEditing(true)
                  setEditingField("password")
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 0)
                }}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default PasswordForm
