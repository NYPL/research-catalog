import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
  SkeletonLoader,
  Form,
  Box,
  Banner,
} from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SaveCancelButtons from "./SaveCancelButtons"
import SettingsLabel from "./SettingsLabel"
import type { Patron } from "../../../types/myAccountTypes"
import EditButton from "./EditButton"
import AddButton from "./AddButton"
import IconListElement from "../IconListElement"

const UsernameForm = ({ patron }: { patron: Patron }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)
  const [input, setInput] = useState(patron.username)
  const [tempInput, setTempInput] = useState(input)

  const cancelEditing = () => {
    setTempInput(input)
    setIsEditing(false)
    setError(false)
  }

  const submitInput = async () => {
    setIsLoading(true)
    setIsEditing(false)
  }

  return (
    <>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        width="100%"
        sx={{
          marginBottom: "xxl",
        }}
      >
        <Flex gap="xs" marginRight="140px" alignItems="center">
          <Icon name={"actionIdentity"} size="large" />
          <Text
            size="body1"
            sx={{
              fontWeight: "500",
              marginBottom: 0,
            }}
          >
            Username
          </Text>
        </Flex>
        {isEditing ? (
          <Flex flexDir="column">
            {tempInput ? (
              <Flex flexDir="column">
                <TextInput
                  sx={{
                    width: { base: "87%", md: "300px" },
                    display: "flex",
                    flexDirection: "column-reverse",
                    label: {
                      fontWeight: "400",
                    },
                  }}
                  value={tempInput}
                  id="username-input"
                  labelText="Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
                  showLabel
                  //isInvalid={error && !validateInput(input, tempInput)}
                  invalidText="Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
                  //onChange={(e) => handleInputChange(e)}
                  isClearable
                  //isClearableCallback={() => handleClearableCallback}
                />
                <Button
                  aria-label="Remove username"
                  buttonType="text"
                  id="remove-username-btn"
                  onClick={() => {
                    setTempInput(null)
                  }}
                >
                  {" "}
                  <Icon name="actionDelete" size="large" />
                </Button>
                <Banner
                  sx={{ marginTop: "xs", width: "300px" }}
                  content="If you delete your username, you will have to use your barcode to log in to your account in the future."
                  type="warning"
                />
              </Flex>
            ) : (
              <AddButton
                label={"+ Add username"}
                onClick={() => {
                  setTempInput("")
                }}
              />
            )}
          </Flex>
        ) : (
          <Flex
            alignItems="flex-start"
            sx={{
              button: {
                paddingBottom: "m",
              },
            }}
          >
            <Text size="body1" sx={{ marginBottom: 0 }}>
              {patron.username}
            </Text>
            <EditButton
              buttonId="edit-username-button"
              onClick={() => {
                setIsEditing(true)
              }}
            />
          </Flex>
        )}
        {isEditing && (
          <SaveCancelButtons
            onCancel={cancelEditing}
            onSave={submitInput}
            isDisabled={error}
          />
        )}
      </Flex>
    </>
  )
}

export default UsernameForm
