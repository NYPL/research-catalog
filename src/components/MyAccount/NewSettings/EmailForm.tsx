import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
} from "@nypl/design-system-react-components"
import { useState } from "react"

const EmailForm = ({ patronData }) => {
  console.log(patronData.emails)
  const [emails, setEmails] = useState(patronData?.emails || [])
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
    setError(!validateEmail(value))
  }

  const saveEmails = () => {
    const hasInvalidEmail = tempEmails.some((email) => !validateEmail(email))
    if (hasInvalidEmail) {
      setError(true)
      return
    }
    submitEmails(tempEmails)
    setEmails(tempEmails)
    setIsEditing(false)
  }

  const submitEmails = async (emails) => {
    const response = await fetch(
      `/research/research-catalog/api/account/settings/${patronData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails }),
      }
    )
    if (response.status === 200) {
      console.log("yay")
    } else {
      console.log(response)
    }
  }

  const cancelEditing = () => {
    setTempEmails([...emails])
    setIsEditing(false)
    setError(false)
  }

  const addEmailField = () => {
    setTempEmails([...tempEmails, ""])
  }

  return (
    <>
      <Flex gap="xs" alignItems="center">
        <Icon name="communicationEmail" size="medium" />
        <Text
          size="body1"
          sx={{ fontWeight: "500", width: "305px", marginBottom: 0 }}
        >
          Email
        </Text>
      </Flex>
      <Flex gap="xs" alignItems="center" flexDir="column">
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
                  sx={{ marginRight: "xl", width: "300px" }}
                />
                {index !== 0 && (
                  <Button
                    aria-label="Remove email"
                    buttonType="text"
                    id="remove-email-btn"
                    onClick={() =>
                      setTempEmails(tempEmails.filter((_, i) => i !== index))
                    }
                  >
                    <Icon name="arrow" iconRotation="rotate270" size="small" />
                  </Button>
                )}
              </Flex>
            ))}
            <Button
              id="add-button"
              buttonType="text"
              onClick={addEmailField}
              sx={{ justifyContent: "flex-start" }}
            >
              + Add an email address
            </Button>
          </Flex>
        ) : (
          <Flex flexDir={"row"} alignItems="center">
            <Text sx={{ marginBottom: 0 }}>{emails[0]}</Text>
            <Button
              id="edit-email-button"
              buttonType="text"
              onClick={() => setIsEditing(true)}
            >
              <Icon name="editorMode" align="left" size="medium" />
              Edit
            </Button>
          </Flex>
        )}
      </Flex>
      {isEditing && (
        <Flex>
          <Button
            sx={{ marginRight: "s" }}
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
            onClick={saveEmails}
          >
            Save changes
          </Button>
        </Flex>
      )}
    </>
  )
}

export default EmailForm
