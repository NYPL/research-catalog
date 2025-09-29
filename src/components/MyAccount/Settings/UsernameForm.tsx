import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
  SkeletonLoader,
  Banner,
} from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import { useContext, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SaveCancelButtons from "./SaveCancelButtons"
import type { Patron } from "../../../types/myAccountTypes"
import EditButton from "./EditButton"
import AddButton from "./AddButton"
import { BASE_URL } from "../../../config/constants"

export const usernameStatusMessages = {
  USERNAME_FAILURE: "This username already exists.",
  FAILURE: "Your changes could not be saved.",
  SUCCESS: "Your changes were saved.",
}

interface UsernameFormProps {
  patron: Patron
  usernameState
}

const UsernameForm = ({ patron, usernameState }: UsernameFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)
  /**
   * In Sierra, the user NOT having a username is represented by the empty string: username = "".
   * Within this form, the user NOT having a username is represented by: username = null, so the
   * empty string is an invalid username.
   */
  const [usernameInSierra, setusernameInSierra] = useState(
    patron.username === "" ? null : patron.username
  )
  const [tempUsername, setTempUsername] = useState(usernameInSierra)
  const currentUsernameNotDeleted = tempUsername !== null

  const { setUsernameStatus, setUsernameStatusMessage } = usernameState
  const inputRef = useRef<TextInputRefType | null>()
  const editingRef = useRef<HTMLButtonElement | null>()
  const addButtonRef = useRef<HTMLButtonElement | null>()

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{5,15}$/
    return usernameRegex.test(username)
  }

  const cancelEditing = () => {
    setTempUsername(usernameInSierra)
    setIsEditing(false)
    setError(false)
    setTimeout(() => {
      editingRef.current?.focus()
    }, 0)
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    setTempUsername(value)
    if (!validateUsername(value)) {
      setError(true)
    } else {
      setError(false)
    }
  }

  const submitInput = async () => {
    setIsLoading(true)
    setIsEditing(false)
    setUsernameStatus("")
    const submissionInput = tempUsername === null ? "" : tempUsername
    try {
      const response = await fetch(
        `${BASE_URL}/api/account/username/${patron.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: submissionInput }),
        }
      )
      const responseMessage = await response.json()
      if (responseMessage !== "Username taken" && response.status === 200) {
        await getMostUpdatedSierraAccountData()
        setUsernameStatus("success")
        setusernameInSierra(submissionInput)
        setTempUsername(submissionInput)
      } else {
        setUsernameStatus("failure")
        setUsernameStatusMessage(
          responseMessage === "Username taken"
            ? usernameStatusMessages.USERNAME_FAILURE
            : usernameStatusMessages.FAILURE
        )
        setTempUsername(usernameInSierra)
      }
    } catch (error) {
      setUsernameStatus("failure")
      setUsernameStatusMessage(usernameStatusMessages.FAILURE)
      console.error("Error submitting username:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const editUsernameField = (
    <>
      <Flex flexDir="row" alignItems="flex-start">
        <TextInput
          sx={{
            width: { base: "87%", md: "300px" },
          }}
          ref={inputRef}
          value={tempUsername}
          id="username-input"
          labelText="Username"
          showLabel={false}
          helperText="Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
          invalidText="Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
          isInvalid={error && !validateUsername(tempUsername)}
          showHelperInvalidText={true}
          onChange={handleInputChange}
          isClearable
          isClearableCallback={() => setError(true)}
        />
        <Button
          aria-label="Delete username from your account"
          aria-describedby="delete-warning-message"
          variant="text"
          id="delete-username-btn"
          onClick={() => {
            setTempUsername(null)
            setError(false)
            setTimeout(() => {
              addButtonRef.current?.focus()
            }, 0)
          }}
        >
          {" "}
          <Icon name="actionDelete" size="large" />
        </Button>
      </Flex>
      <Banner
        id="delete-warning-message"
        sx={{ marginTop: "xs", width: "fill" }}
        content="If you delete your username, you will have to use your barcode to log in to your account in the future."
        variant="warning"
      />
    </>
  )

  const notEditingView = (
    <Flex alignItems="center" marginTop={{ base: "unset", md: "-xs" }}>
      {usernameInSierra ? (
        <>
          <Text
            size="body1"
            sx={{ marginBottom: 0, width: { base: "l", sm: "250px" } }}
          >
            {usernameInSierra}
          </Text>
          <EditButton
            ref={editingRef}
            buttonLabel="Edit username"
            buttonId="edit-username-button"
            onClick={() => {
              setIsEditing(true)
              setTimeout(() => {
                inputRef?.current?.focus()
              }, 0)
            }}
          />
        </>
      ) : (
        <AddButton
          ref={editingRef}
          label="+ Add username"
          onClick={() => {
            setIsEditing(true)
            setTempUsername("")
            setError(true)
            setTimeout(() => {
              inputRef?.current?.focus()
            }, 0)
          }}
        />
      )}
    </Flex>
  )

  const editingView = (
    <Flex
      flexDir="column"
      marginTop={{ base: "xs", md: "-xs" }}
      maxWidth={{ base: "600px", md: "320px" }}
    >
      {currentUsernameNotDeleted ? (
        editUsernameField
      ) : (
        <AddButton
          ref={addButtonRef}
          label="+ Add username"
          onClick={() => {
            setTempUsername("")
            setError(true)
            setTimeout(() => {
              inputRef.current?.focus()
            }, 0)
          }}
        />
      )}
    </Flex>
  )

  let content
  if (isLoading) {
    content = (
      <SkeletonLoader
        contentSize={2}
        showImage={false}
        headingSize={0}
        sx={{ marginTop: "-s" }}
      />
    )
  } else if (isEditing) {
    content = editingView
  } else {
    content = notEditingView
  }

  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      alignItems="flex-start"
      width="100%"
    >
      {content}
      {isEditing && (
        <SaveCancelButtons
          inputType="username"
          onCancel={cancelEditing}
          onSave={submitInput}
          isDisabled={error}
        />
      )}
    </Flex>
  )
}
export default UsernameForm
