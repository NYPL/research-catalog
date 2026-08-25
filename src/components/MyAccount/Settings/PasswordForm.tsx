import { forwardRef, useContext, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import { Box } from "@nypl/design-system-react-components"
import { useNYPLBreakpoints } from "@nypl/design-system-react-components"
import {
  Banner,
  Flex,
  SkeletonLoader,
  Text,
  TextInput,
} from "@nypl/design-system-react-components"
import SaveCancelButtons from "./SaveCancelButtons"
import type { Patron } from "../../../types/myAccountTypes"
import { BASE_URL } from "../../../config/constants"
import EditButton from "./EditButton"
import { STATIC_STATUS_MESSAGES } from "../../../utils/statusUtils"
import { idConstants, useFocusContext } from "../../../context/FocusContext"
import type { IconListElementPropType } from "../IconListElement"
import { buildListElementsWithIcons } from "../IconListElement"

interface PasswordFormProps {
  patron: Patron
  settingsState
}

interface PasswordFormFieldProps {
  label: string
  handler: (e) => void
  name: string
  isInvalid?: boolean
}

const PasswordFormField = forwardRef<TextInputRefType, PasswordFormFieldProps>(
  ({ label, handler, name, isInvalid }: PasswordFormFieldProps, ref) => {
    return (
      <TextInput
        sx={{
          width: { base: "100%", md: "300px" },
        }}
        ref={ref}
        id={name}
        name={name}
        type="password"
        isRequired
        showLabel={false}
        showRequiredLabel={false}
        labelText={label}
        onChange={handler}
        invalidText="PIN/passwords do not match."
        isInvalid={isInvalid}
        isClearable
      />
    )
  }
)

PasswordFormField.displayName = "PasswordFormField"

// Returns IconListElements to be used in the ProfileTab list
const PasswordForm = ({ patron, settingsState }: PasswordFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const { isLargerThanSmallTablet } = useNYPLBreakpoints()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordsMatch: true,
  })
  const { setStatus, editingField, setEditingField } = settingsState
  const editingRef = useRef<HTMLButtonElement | null>()
  const inputRef = useRef<TextInputRefType | null>()
  const { setPersistentFocus } = useFocusContext()

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
    setStatus(null)
    try {
      const response = await fetch(
        `${BASE_URL}/api/account/update-pin/${patron.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPin: formData.currentPassword,
            newPin: formData.newPassword,
            barcode: patron.barcode,
          }),
        }
      )

      const errorMessage = await response.json()
      if (response.status === 200) {
        await getMostUpdatedSierraAccountData()
        setStatus(STATIC_STATUS_MESSAGES.accountSuccess)
        setPersistentFocus(idConstants.accountStatusBanner)
      } else {
        if (errorMessage) {
          errorMessage.startsWith("Invalid parameter")
            ? // Returning a more user-friendly error message.
              setStatus(STATIC_STATUS_MESSAGES.passwordIncorrectFailure)
            : setStatus(STATIC_STATUS_MESSAGES.passwordInvalidFailure)
        }
        setPersistentFocus(idConstants.accountStatusBanner)
      }
    } catch (error) {
      console.error("Error submitting", error)
    } finally {
      setIsLoading(false)
      clearForm()
      setEditingField("")
    }
  }

  const listItemsWithoutIcons = isLoading
    ? [
        {
          term: "PIN/password",
          description: (
            <SkeletonLoader
              sx={{ "> div": { marginTop: "-s" } }}
              contentSize={2}
              showImage={false}
              headingSize={0}
            />
          ),
        },
      ]
    : isEditing
    ? [
        {
          term: "Enter current PIN/password",
          description: (
            <Flex flexDir={{ base: "column", lg: "row" }}>
              <PasswordFormField
                ref={inputRef}
                label="Enter current PIN/password"
                name="currentPassword"
                handler={handleInputChange}
              />
            </Flex>
          ),
        },
        {
          term: "Enter new PIN/password",
          description: (
            <PasswordFormField
              label="Enter new PIN/password"
              name="newPassword"
              handler={handleInputChange}
            />
          ),
        },
        {
          term: "Re-enter new PIN/password",
          description: (
            <>
              <PasswordFormField
                label="Re-enter new PIN/password"
                name="confirmPassword"
                handler={handleInputChange}
                isInvalid={!formData.passwordsMatch}
              />
              <Box
                sx={{
                  marginTop: { lg: "-185px" },
                  right: { lg: 0 },
                }}
              >
                <SaveCancelButtons
                  inputType="password"
                  onCancel={cancelEditing}
                  isDisabled={!validateForm}
                  onSave={submitForm}
                />
              </Box>
              <Banner
                sx={{
                  marginTop: { base: "s", lg: "170px" },
                  width: { base: "unset", lg: "64%" },
                  marginLeft: { md: "-272px" },
                  display: "inline-block",
                }}
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
                      You have the option of creating a standard PIN (4
                      characters in length) or the more secure option of
                      creating a PASSWORD up to 32 characters long. <br />{" "}
                      <br /> You can create a PIN/PASSWORD that includes upper
                      or lower case characters (a-z, A-Z), numbers (0-9), and/or
                      special characters{" "}
                      <span style={{ fontWeight: "bold" }}>
                        limited to the following
                      </span>
                      :
                      <br />~ . ! ? @ # $ % ^ & * ( ) <br /> <br />
                      PINs or PASSWORDS must not contain common patterns, for
                      example: a character that is repeated 3 or more times
                      (0001, aaaa, aaaatf54, x7gp3333), or four characters
                      repeated two or more times (1212, abab, abcabc, ababx7gp,
                      x7gp3434).
                    </Text>
                  </>
                }
              />
            </>
          ),
        },
      ]
    : // !isEditing
      [
        {
          term: "PIN/password",
          description: (
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              alignItems="flex-start"
              width="100%"
            >
              <Flex>
                <Text
                  sx={{
                    width: { base: "200px", sm: "256px" },
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
          ),
        },
      ]

  const listElements = listItemsWithoutIcons
    .map(
      (item) =>
        ({
          icon: "actionLockClosed",
          ...item,
        } as IconListElementPropType)
    )
    .map(buildListElementsWithIcons)

  return <>{listElements}</>
}

export default PasswordForm
