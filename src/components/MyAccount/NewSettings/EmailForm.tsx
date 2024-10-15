import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SaveCancelButtons from "./SaveCancelButtons"

const EmailForm = ({ patronData, setIsSuccess, setIsFailure }) => {
  const { patronDataLoading, getMostUpdatedSierraAccountData } =
    useContext(PatronDataContext)
  const [emails, setEmails] = useState(patronData?.emails || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)

  const [tempEmails, setTempEmails] = useState([...emails])

  const validateEmail = (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    const updatedEmails = [...tempEmails]
    updatedEmails[index] = value
    setTempEmails(updatedEmails)

    const firstEmailEmpty = index === 0

    if (firstEmailEmpty && (!value || !validateEmail(value))) {
      setError(true)
    } else {
      const hasInvalidEmail = updatedEmails.some(
        (email) => !validateEmail(email)
      )
      setError(hasInvalidEmail)
    }
  }

  const handleRemoveEmail = (index) => {
    const updatedEmails = tempEmails.filter((_, i) => i !== index)
    setTempEmails(updatedEmails)

    // Immediately revalidate remaining emails.
    const hasInvalidEmail = updatedEmails.some((email) => !validateEmail(email))
    setError(hasInvalidEmail)
  }

  const handleAddEmail = () => {
    const updatedEmails = [...tempEmails, ""]
    setTempEmails(updatedEmails)

    // Immediately revalidate all emails.
    const hasInvalidEmail = updatedEmails.some((email) => !validateEmail(email))
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
    const validEmails = tempEmails.filter((email) => validateEmail(email))

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
        setIsEditing(false)
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
      {patronDataLoading || isLoading ? (
        <SkeletonLoader contentSize={2} showImage={false} headingSize={0} />
      ) : (
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="100%"
        >
          <Flex gap="xs" alignItems="center" paddingLeft="xs" paddingTop="xs">
            <Icon name="communicationEmail" size="medium" />
            <Text
              size="body1"
              sx={{
                fontWeight: "500",
                marginBottom: 0,
                marginRight: { base: "l", lg: "200px" },
              }}
            >
              Email
            </Text>
          </Flex>
          {isEditing ? (
            <Flex
              marginLeft={{ base: "l", lg: "unset" }}
              marginTop={{ base: "xs", lg: "unset" }}
              flexDir="column"
              width="-webkit-fill-available"
            >
              {tempEmails.map((email, index) => (
                <Flex key={index} mb="s" width="fill">
                  <TextInput
                    sx={{
                      width: { base: "-webkit-fill-available", md: "300px" },
                    }}
                    name={`email-${index}`}
                    value={email}
                    id={`email-text-input-${index}`}
                    labelText="Update email"
                    showLabel={false}
                    isInvalid={error && !validateEmail(email)}
                    invalidText="Please enter a valid email address."
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
                      width="20px"
                      marginLeft="xs"
                      onClick={() => handleRemoveEmail(index)}
                    >
                      {" "}
                      <Icon name="actionDelete" size="large" />
                    </Button>
                  )}
                </Flex>
              ))}
              <Button
                id="add-button"
                buttonType="text"
                onClick={handleAddEmail}
                size="large"
                sx={{
                  justifyContent: "flex-start",
                  width: { base: "-webkit-fill-available", md: "300px" },
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
                {emails.map((email, index) => (
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
              error={error}
            />
          )}
        </Flex>
      )}
    </>
  )
}

export default EmailForm
