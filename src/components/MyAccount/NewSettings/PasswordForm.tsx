import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import {
  Banner,
  Button,
  Flex,
  FormField,
  Icon,
  SkeletonLoader,
  Text,
  TextInput,
} from "@nypl/design-system-react-components"
import SettingsLabel from "./SettingsLabel"
import SaveCancelButtons from "./SaveCancelButtons"
import type { Patron } from "../../../types/myAccountTypes"
import { patron } from "../../../../__test__/fixtures/rawSierraAccountData"
import { BASE_URL } from "../../../config/constants"

interface PasswordFormProps {
  patronData: Patron
  setIsSuccess: (boolean) => void
  setIsFailure: (boolean) => void
}

const PasswordForm = ({
  patronData,
  setIsSuccess,
  setIsFailure,
}: PasswordFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordsMatch: true,
  })

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const submitForm = async () => {
    setIsLoading(true)
    setIsEditing(false)
    setIsSuccess(false)
    setIsFailure(false)
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
        await getMostUpdatedSierraAccountData()
        setIsSuccess(true)
      } else {
        setIsFailure(true)
      }
    } catch (error) {
      console.error("Error submitting", error)
    } finally {
      setIsLoading(false)
    }
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

  return (
    <>
      {isLoading ? (
        <SkeletonLoader contentSize={2} showImage={false} headingSize={0} />
      ) : isEditing ? (
        <Flex flexDir={"row"}>
          <Flex
            sx={{
              marginTop: "xs",
              marginLeft: { base: "l", lg: "unset" },
              flexDir: "column",
              gap: "s",
            }}
          >
            <Flex flexDir={"row"}>
              <SettingsLabel
                icon="actionLockClosed"
                text="Enter current pin/password"
              />
              <TextInput
                maxWidth="320px"
                id="oldPassword"
                name="oldPassword"
                type="password"
                isRequired
                showLabel={false}
                isClearable
                showRequiredLabel={false}
                labelText="Enter current PIN/PASSWORD"
                onChange={handleInputChange}
              />
            </Flex>
            <Flex flexDir={"row"}>
              <SettingsLabel
                icon="actionLockClosed"
                text="Enter new pin/password"
              />
              <TextInput
                maxWidth="320px"
                id="newPassword"
                name="newPassword"
                type="password"
                isRequired
                isClearable
                showRequiredLabel={false}
                showLabel={false}
                labelText="Enter new PIN/PASSWORD"
                onChange={handleInputChange}
              />
            </Flex>
            <Flex flexDir={"row"}>
              <SettingsLabel
                icon="actionLockClosed"
                text="Re-enter new pin/password"
              />
              <TextInput
                isClearable
                width="320px"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                isInvalid={!formData.passwordsMatch}
                invalidText="PIN/PASSWORDS do not match"
                onChange={handleInputChange}
                isRequired
                showLabel={false}
                showRequiredLabel={false}
                labelText="Re-enter new PIN/PASSWORD"
              />
            </Flex>
            <Banner
              sx={{ marginTop: "s" }}
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
                    in length) or the more secure option of creating a PASSWORD
                    up to 32 characters long. <br /> <br /> You can create a
                    PIN/PASSWORD that includes upper or lower case characters
                    (a-z, A-Z), numbers (0-9), and/or special characters limited
                    to the following: ~ ! ? @ # $ % ^ & * ( ) <br /> <br />
                    PINs or PASSWORDS must not contain common patterns, for
                    example: a character that is repeated 3 or more times (0001,
                    aaaa, aaaatf54, x7gp3333), or four characters repeated two
                    or more times (1212, abab, abcabc, ababx7gp, x7gp3434).{" "}
                    <br /> <br />
                    PINs and PASSWORDS must NOT contain a period.
                  </Text>
                </>
              }
            />
          </Flex>
          <SaveCancelButtons
            onCancel={cancelEditing}
            isDisabled={!validateForm}
            onSave={submitForm}
          />
        </Flex>
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
            <Button
              id="edit-password-button"
              buttonType="text"
              onClick={() => setIsEditing(true)}
              sx={{
                paddingLeft: "xs",
                paddingRight: "xs",
                marginLeft: "xxl",
              }}
            >
              <Icon name="editorMode" align="left" size="medium" />
              Edit
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default PasswordForm
