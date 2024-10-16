import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
  SkeletonLoader,
  Form,
} from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SaveCancelButtons from "./SaveCancelButtons"
import SettingsLabel from "./SettingsLabel"

const EmailForm = ({ patronData, setIsSuccess, setIsFailure }) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [emails, setEmails] = useState(patronData?.emails || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)

  const [tempEmails, setTempEmails] = useState([...emails])

  const validateEmail = (currentEmail, emails) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/
    const isEmailUnique =
      emails.filter((email) => email === currentEmail).length === 1
    return emailRegex.test(currentEmail) && isEmailUnique
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    const updatedEmails = [...tempEmails]
    updatedEmails[index] = value
    setTempEmails(updatedEmails)

    const firstEmailEmpty = index === 0

    if (firstEmailEmpty && (!value || !validateEmail(value, updatedEmails))) {
      setError(true)
    } else {
      const hasInvalidEmail = updatedEmails.some(
        (email) => !validateEmail(email, updatedEmails)
      )
      setError(hasInvalidEmail)
    }
  }

  const handleRemoveEmail = (index) => {
    const updatedEmails = tempEmails.filter((_, i) => i !== index)
    setTempEmails(updatedEmails)

    // Immediately revalidate remaining emails.
    const hasInvalidEmail = updatedEmails.some(
      (email) => !validateEmail(email, updatedEmails)
    )
    setError(hasInvalidEmail)
  }

  const handleAddEmail = () => {
    const updatedEmails = [...tempEmails, ""]
    setTempEmails(updatedEmails)

    // Immediately revalidate all emails.
    const hasInvalidEmail = updatedEmails.some(
      (email) => !validateEmail(email, updatedEmails)
    )
    setError(hasInvalidEmail)
  }

  const handleClearableCallback = (index) => {
    const updatedEmails = [...tempEmails]
    updatedEmails[index] = ""
    setTempEmails(updatedEmails)
    setError(true)
  }

  const cancelEditing = () => {
    setTempEmails([...emails])
    setIsEditing(false)
    setError(false)
  }

  const submitEmails = async () => {
    setIsLoading(true)
    setIsEditing(false)
    const validEmails = tempEmails.filter((email) =>
      validateEmail(email, tempEmails)
    )
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/settings/${patronData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emails: validEmails }),
        }
      )

      if (response.status === 200) {
        await getMostUpdatedSierraAccountData()
        setIsSuccess(true)
      } else {
        setIsFailure(true)
        setTempEmails([...emails])
      }
    } catch (error) {
      console.error("Error submitting emails:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonLoader contentSize={2} showImage={false} headingSize={0} />
      ) : (
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="100%"
        >
          <SettingsLabel icon="communicationEmail" text="Email" />
          {isEditing ? (
            <Flex
              marginLeft={{ base: "l", lg: "unset" }}
              marginTop={{ base: "xs", lg: "unset" }}
              flexDir="column"
              width="-webkit-fill-available"
            >
              {tempEmails.map((email, index) => (
                <Form id="email-form" key={index} gap={"grid.xxs"}>
                  <Flex mb="s" width="fill">
                    <TextInput
                      sx={{
                        width: {
                          base: "87%",
                          md: "300px",
                        },
                      }}
                      name={`email-${index}`}
                      value={email}
                      id={`email-text-input-${index}`}
                      key={index}
                      labelText="Update email"
                      showLabel={false}
                      isInvalid={error && !validateEmail(email, tempEmails)}
                      invalidText={
                        "Please enter a valid and unique email address."
                      }
                      onChange={(e) => handleInputChange(e, index)}
                      isRequired
                      isClearable
                      isClearableCallback={() => handleClearableCallback(index)}
                    />
                    {index !== 0 && (
                      <Button
                        aria-label="Remove email"
                        buttonType="text"
                        id="remove-email-btn"
                        onClick={() => handleRemoveEmail(index)}
                      >
                        {" "}
                        <Icon name="actionDelete" size="large" />
                      </Button>
                    )}
                  </Flex>
                </Form>
              ))}
              <Button
                id="add-button"
                buttonType="text"
                onClick={handleAddEmail}
                size="large"
                sx={{
                  justifyContent: "flex-start",
                  width: { base: "87%", md: "300px" },
                  padding: "xxs",
                }}
              >
                + Add an email address
              </Button>
            </Flex>
          ) : (
            <Flex
              marginLeft={{ base: "l", lg: "unset" }}
              flexDir="row"
              alignItems="flex-start"
            >
              <Flex flexDir="column" alignItems="flex-start">
                {tempEmails.map((email, index) => (
                  <Text
                    key={index}
                    sx={{ paddingTop: "xs", marginBottom: "xs" }}
                  >
                    {email}{" "}
                    {index === 0 && emails.length > 1 && (
                      <Text
                        sx={{
                          display: "inline",
                          padding: 0,
                          margin: 0,
                          color: "ui.gray.semi-dark",
                        }}
                      >
                        (P)
                      </Text>
                    )}
                  </Text>
                ))}
              </Flex>
              <Button
                id="edit-email-button"
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
          )}
          {isEditing && (
            <SaveCancelButtons
              onCancel={cancelEditing}
              onSave={submitEmails}
              isDisabled={error}
            />
          )}
        </Flex>
      )}
    </>
  )
}

export default EmailForm
