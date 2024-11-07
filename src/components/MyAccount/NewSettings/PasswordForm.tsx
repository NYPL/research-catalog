import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
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

const PasswordFormField = ({
  label,
  handler,
  name,
  isInvalid,
}: PasswordFormFieldProps) => {
  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      alignItems="flex-start"
      gap={{ base: "xs", lg: "unset" }}
    >
      <SettingsLabel icon="actionLockClosed" text={label} />
      <TextInput
        marginLeft={{ sm: "m", lg: 0 }}
        width="320px"
        id={name}
        name={name}
        type="password"
        isRequired
        showLabel={false}
        isClearable
        showRequiredLabel={false}
        labelText={label}
        onChange={handler}
        invalidText="Pin/passwords do not match."
        isInvalid={isInvalid}
      />
    </Flex>
  )
}

const PasswordForm = ({ patronData, settingsState }: PasswordFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordsMatch: true,
  })
  const { setStatus, editingField, setEditingField } = settingsState

  const cancelEditing = () => {
    setIsEditing(false)
    setEditingField("")
  }

  const validateForm =
    formData.oldPassword !== "" &&
    formData.newPassword !== "" &&
    formData.confirmPassword !== "" &&
    formData.passwordsMatch

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let updatedFormData = { ...formData }

    if (name === "confirmPassword") {
      updatedFormData = {
        ...updatedFormData,
        confirmPassword: value,
        passwordsMatch: updatedFormData.newPassword === value,
      }
    } else if (name === "newPassword") {
      updatedFormData = {
        ...updatedFormData,
        newPassword: value,
        passwordsMatch: updatedFormData.confirmPassword === value,
      }
    } else {
      updatedFormData = {
        ...updatedFormData,
        [name]: value,
      }
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
            oldPin: formData.oldPassword,
            newPin: formData.newPassword,
            barcode: patronData.barcode,
          }),
        }
      )

      if (response.status === 200) {
        setStatus("success")
        await getMostUpdatedSierraAccountData()
      } else {
        setStatus("failure")
      }
    } catch (error) {
      console.error("Error submitting", error)
    } finally {
      setIsLoading(false)
      setEditingField("")
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonLoader contentSize={2} showImage={false} headingSize={0} />
      ) : isEditing ? (
        <>
          <Flex flexDir={{ base: "column", lg: "row" }}>
            <Flex
              sx={{
                marginTop: "xs",
                flexDir: "column",
                gap: "s",
              }}
            >
              <PasswordFormField
                label="Enter current pin/password"
                name="oldPassword"
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
                width: { base: "l", sm: "250px" },
                marginTop: "xs",
                marginLeft: { base: "l", lg: "unset" },
                marginBottom: 0,
              }}
            >
              ****
            </Text>
            {editingField === "" && (
              <EditButton
                buttonId="edit-password-button"
                onClick={() => {
                  setIsEditing(true)
                  setEditingField("password")
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
