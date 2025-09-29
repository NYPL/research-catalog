import {
  Icon,
  TextInput,
  Text,
  Flex,
  Button,
  SkeletonLoader,
  Form,
  Box,
} from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import { useContext, useEffect, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SaveCancelButtons from "./SaveCancelButtons"
import SettingsLabel from "./SettingsLabel"
import type { Patron } from "../../../types/myAccountTypes"
import EditButton from "./EditButton"
import AddButton from "./AddButton"

interface SettingsInputFormProps {
  patronData: Patron
  settingsState
  inputType: "phones" | "emails"
}

const SettingsInputForm = ({
  patronData,
  settingsState,
  inputType,
}: SettingsInputFormProps) => {
  const isEmail = inputType === "emails"
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [inputs, setInputs] = useState(
    isEmail
      ? patronData[inputType]
      : patronData[inputType]?.map((phone) => phone.number) || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)

  const { setStatus, editingField, setEditingField } = settingsState

  const [tempInputs, setTempInputs] = useState([...inputs])

  const inputRefs = useRef<Array<TextInputRefType | null>>([])
  const editingRef = useRef<HTMLButtonElement | null>()

  const focusLastInput = () => {
    const lastIndex = tempInputs.length - 1
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex]?.focus()
    }
  }

  const focusFirstInput = () => {
    if (inputRefs.current[0]) {
      inputRefs?.current[0]?.focus()
    }
  }

  useEffect(() => {
    focusLastInput()
  }, [tempInputs.length])

  const formUtils = {
    regex: isEmail ? /^[^@]+@[^@]+\.[^@]+$/ : /^\+?[1-9]\d{1,14}$/,
    labelText: isEmail ? "Update email address" : "Update phone number",
    primaryLabelText: isEmail
      ? "Update primary email address"
      : "Update primary phone number",
    addButtonLabel: isEmail ? "+ Add an email address" : "+ Add a phone number",
    errorMessage: `Please enter a valid and unique ${
      isEmail ? "email address" : "phone number"
    }.`,
    formId: `${isEmail ? "email" : "phone"}-form`,
    icon: `communication${isEmail ? "Email" : "Call"}`,
    inputLabel: isEmail ? "Email" : "Phone",
  }

  const validateInput = (currentInput, inputs) => {
    const isInputUnique =
      inputs.filter((input) => input === currentInput).length === 1
    return formUtils.regex.test(currentInput) && isInputUnique
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    const updatedInputs = [...tempInputs]
    updatedInputs[index] = value
    setTempInputs(updatedInputs)

    const firstInput = index === 0

    if (firstInput && (!value || !validateInput(value, updatedInputs))) {
      setError(true)
    } else {
      const hasInvalidInput = updatedInputs.some(
        (input) => !validateInput(input, updatedInputs)
      )
      setError(hasInvalidInput)
    }
  }

  const handleRemove = (index) => {
    const updatedInputs = tempInputs.filter((_, i) => i !== index)
    setTempInputs(updatedInputs)

    // Remove its corresponding ref.
    inputRefs.current = inputRefs.current.filter((_, i) => i !== index)

    // Immediately revalidate remaining inputs.
    const hasInvalidInput = updatedInputs.some(
      (input) => !validateInput(input, updatedInputs)
    )
    setError(hasInvalidInput)
  }

  const handleAdd = () => {
    const updatedInputs = [...tempInputs, ""]
    setTempInputs(updatedInputs)

    // Immediately revalidate remaining inputs.
    const hasInvalidInput = updatedInputs.some(
      (input) => !validateInput(input, updatedInputs)
    )
    setError(hasInvalidInput)
  }

  const handleClearableCallback = (index) => {
    const updatedInputs = [...tempInputs]
    updatedInputs[index] = ""
    setTempInputs(updatedInputs)
    setError(true)
  }

  const cancelEditing = () => {
    setTempInputs([...inputs])
    setIsEditing(false)
    setEditingField("")
    setError(false)
    setTimeout(() => {
      editingRef.current?.focus()
    }, 0)
  }

  const submitInputs = async () => {
    setIsLoading(true)
    setIsEditing(false)
    setStatus("")
    const validInputs = tempInputs.filter((input) =>
      validateInput(input, tempInputs)
    )
    const body = isEmail
      ? JSON.stringify({ [inputType]: validInputs })
      : JSON.stringify({
          [inputType]: validInputs.map((input) => ({
            number: input,
            type: "t",
          })),
        })
    try {
      const response = await fetch(
        `/research/research-catalog/api/account/settings/${patronData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      )

      if (response.status === 200) {
        await getMostUpdatedSierraAccountData()
        setStatus("success")
        setInputs([...validInputs])
        setTempInputs([...validInputs])
      } else {
        setStatus("failure")
        setTempInputs([...inputs])
      }
    } catch (error) {
      console.error("Error submitting", inputType, error)
    } finally {
      setIsLoading(false)
      setEditingField("")
    }
  }

  return (
    <>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        width="100%"
      >
        <SettingsLabel icon={formUtils.icon} text={formUtils.inputLabel} />
        {isLoading ? (
          <SkeletonLoader
            sx={{ "> div": { marginTop: "-s" } }}
            contentSize={2}
            showImage={false}
            headingSize={0}
          />
        ) : isEditing ? (
          <Flex
            marginLeft={{ base: "m", lg: "unset" }}
            marginTop={{ base: "xs", lg: "unset" }}
            flexDir="column"
            width="-webkit-fill-available"
          >
            {tempInputs.map((input, index) => (
              <Form id={formUtils.formId} key={index} gap={"grid.xxs"}>
                <Flex mb="s" width="fill">
                  <TextInput
                    sx={{
                      width: { base: "87%", md: "300px" },
                    }}
                    ref={(el) => (inputRefs.current[index] = el)}
                    name={`input-${index}`}
                    value={input}
                    id={`${inputType}-text-input-${index}`}
                    labelText={
                      index == 0
                        ? formUtils.primaryLabelText
                        : `${formUtils.labelText} ${index + 1}`
                    }
                    showLabel={false}
                    isInvalid={error && !validateInput(input, tempInputs)}
                    invalidText={formUtils.errorMessage}
                    onChange={(e) => handleInputChange(e, index)}
                    isRequired
                    isClearable
                    isClearableCallback={() => handleClearableCallback(index)}
                  />
                  {index == 0 && <div style={{ width: "57px" }}> </div>}
                  {index !== 0 && (
                    <Button
                      aria-label={`Remove ${formUtils.inputLabel.toLowerCase()} ${
                        index + 1
                      }`}
                      variant="text"
                      id="remove-input-btn"
                      onClick={() => handleRemove(index)}
                    >
                      {" "}
                      <Icon name="actionDelete" size="large" />
                    </Button>
                  )}
                </Flex>
              </Form>
            ))}
            <Flex flexDir="row" width="fill">
              <AddButton
                inputType={inputType}
                label={formUtils.addButtonLabel}
                onClick={handleAdd}
              />
              <div style={{ width: "72px" }}> </div>
            </Flex>
          </Flex>
        ) : tempInputs.length !== 0 ? (
          <Flex
            marginLeft={{ base: "m", lg: "unset" }}
            flexDir="row"
            alignItems="flex-start"
          >
            <Flex flexDir="column" alignItems="flex-start">
              {tempInputs.map((input, index) => (
                <Text
                  key={index}
                  sx={{
                    width: { base: "200px", sm: "250px" },
                    marginBottom: "xs",
                    marginTop: { base: "xs", lg: "unset" },
                  }}
                >
                  {input}{" "}
                  {index === 0 && inputs.length > 1 && (
                    <Box
                      as="span"
                      sx={{
                        display: "inline",
                        padding: 0,
                        margin: 0,
                        color: "ui.gray.semi-dark",
                      }}
                    >
                      (P)
                    </Box>
                  )}
                </Text>
              ))}
            </Flex>
            {editingField === "" && tempInputs.length > 0 && (
              <EditButton
                ref={editingRef}
                buttonLabel={`Edit ${inputType}`}
                buttonId={`edit-${inputType}-button`}
                onClick={() => {
                  setIsEditing(true)
                  setEditingField(inputType)
                  setTimeout(() => focusFirstInput(), 0)
                }}
              />
            )}
          </Flex>
        ) : (
          // User has no phone or email.
          <Box sx={{ marginTop: { base: "unset", lg: "-xs" } }}>
            <AddButton
              isDisabled={editingField !== ""}
              inputType={inputType}
              onClick={() => {
                setIsEditing(true)
                setEditingField(inputType)
                handleAdd()
              }}
              label={formUtils.addButtonLabel}
            />
          </Box>
        )}

        {isEditing && (
          <SaveCancelButtons
            inputType={inputType}
            onCancel={cancelEditing}
            onSave={submitInputs}
            isDisabled={error}
          />
        )}
      </Flex>
    </>
  )
}

export default SettingsInputForm
