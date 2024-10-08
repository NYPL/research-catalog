import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
} from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"

const EmailForm = ({ patronData, setIsLoading, setIsSuccess }) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [emails, setEmails] = useState(patronData?.emails || [])
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)

  const [tempEmails, setTempEmails] = useState([...emails])

  const validateEmail = (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/
    return emailRegex.test(email)
  }

  const handleRemoveEmail = (index) => {
    const updatedEmails = tempEmails.filter((_, i) => i !== index)
    setTempEmails(updatedEmails)

    // Immediately revalidate remaining emails.
    const hasInvalidEmail = updatedEmails.some((email) => !validateEmail(email))
    setError(hasInvalidEmail)
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    const updatedEmails = [...tempEmails]
    updatedEmails[index] = value
    setTempEmails(updatedEmails)

    // The first email entry cannot be empty.
    if (index === 0 && (!value || !validateEmail(value))) {
      setError(true)
    } else {
      const hasInvalidEmail = updatedEmails.some(
        (email) => !validateEmail(email)
      )
      setError(hasInvalidEmail)
    }
  }

  const handleClearableCallback = (index) => {
    const updatedEmails = [...tempEmails]
    updatedEmails[index] = ""
    setTempEmails(updatedEmails)
    setError(true)
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
        setTempEmails([...emails])
      }
    } catch (error) {
      console.error("Error submitting emails:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const cancelEditing = () => {
    setTempEmails([...emails])
    setIsEditing(false)
    setError(false)
  }

  const addEmailField = () => {
    const updatedEmails = [...tempEmails, ""]
    setTempEmails(updatedEmails)

    // Immediately revalidate all emails.
    const hasInvalidEmail = updatedEmails.some((email) => !validateEmail(email))
    setError(hasInvalidEmail)
  }

  return (
    <Flex flexDir="row" alignItems="flex-start" width="100%">
      <Flex gap="xs" alignItems={"center"} sx={{ paddingTop: "xs" }}>
        <Icon name="communicationEmail" size="medium" />
        <Text
          size="body1"
          sx={{
            fontWeight: "500",
            width: "256px",
            marginBottom: 0,
          }}
        >
          Email
        </Text>
      </Flex>
      {isEditing ? (
        <Flex flexDir={"column"}>
          {tempEmails.map((email, index) => (
            <Flex key={index} mb="s">
              <TextInput
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
                sx={{ width: "300px" }}
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
          ))}
          <Button
            id="add-button"
            buttonType="text"
            onClick={addEmailField}
            size="large"
            sx={{
              justifyContent: "flex-start",
              width: "300px",
              padding: "xxs",
            }}
          >
            + Add an email address
          </Button>
        </Flex>
      ) : (
        <Flex flexDir="row" alignItems="flex-start">
          <Flex flexDir="column" alignItems="flex-start">
            {emails.map((email, index) => (
              <Text key={index} sx={{ paddingTop: "xs", marginBottom: "xs" }}>
                {email}{" "}
                {index === 0 && <span style={{ color: "gray" }}>(P)</span>}
              </Text>
            ))}
          </Flex>
          <Button
            id="edit-email-button"
            buttonType="text"
            onClick={() => setIsEditing(true)}
            sx={{ paddingLeft: "xs", paddingRight: "xs", marginLeft: "xxl" }}
          >
            <Icon name="editorMode" align="left" size="medium" />
            Edit
          </Button>
        </Flex>
      )}
      {isEditing && (
        <Flex justifySelf="flex-end" sx={{ marginLeft: "auto" }}>
          <Button
            sx={{ marginLeft: "xxl", marginRight: "s" }}
            id="cancel-button"
            buttonType="secondary"
            onClick={cancelEditing}
          >
            Cancel
          </Button>
          <Button
            id="save-button"
            isDisabled={error}
            buttonType="primary"
            onClick={submitEmails}
          >
            Save changes
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default EmailForm
