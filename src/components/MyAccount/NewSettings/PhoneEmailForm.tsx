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
import type { Patron } from "../../../types/myAccountTypes"

interface PhoneEmailFormProps {
  patronData: Patron
  setIsSuccess: (boolean) => void
  setIsFailure: (boolean) => void
  inputType: "phones" | "emails"
}

const PhoneEmailForm = ({
  patronData,
  setIsSuccess,
  setIsFailure,
  inputType,
}: PhoneEmailFormProps) => {
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

  const [tempInputs, setTempInputs] = useState([...inputs])

  const formUtils = {
    regex: isEmail ? /^[^@]+@[^@]+\.[^@]+$/ : /^\+?[1-9]\d{1,14}$/,
    labelText: `Update ${inputType}`,
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

    const firstInputEmpty = index === 0

    if (
      isEmail &&
      firstInputEmpty &&
      (!value || !validateInput(value, updatedInputs))
    ) {
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
    setError(false)
  }

  const submitInputs = async () => {
    setIsLoading(true)
    setIsEditing(false)
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
        setIsSuccess(true)
        setInputs([...validInputs])
        setTempInputs([...validInputs])
      } else {
        setIsFailure(true)
        setTempInputs([...inputs])
      }
    } catch (error) {
      console.error("Error submitting", inputType, error)
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
          <SettingsLabel icon={formUtils.icon} text={formUtils.inputLabel} />
          {isEditing ? (
            <Flex
              marginLeft={{ base: "l", lg: "unset" }}
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
                      name={`input-${index}`}
                      value={input}
                      id={`${inputType}-text-input-${index}`}
                      key={index}
                      labelText={formUtils.labelText}
                      showLabel={false}
                      isInvalid={error && !validateInput(input, tempInputs)}
                      invalidText={formUtils.errorMessage}
                      onChange={(e) => handleInputChange(e, index)}
                      isRequired
                      isClearable
                      isClearableCallback={() => handleClearableCallback(index)}
                    />
                    {(!isEmail || index !== 0) && (
                      <Button
                        aria-label={`Remove ${formUtils.inputLabel.toLowerCase()}`}
                        buttonType="text"
                        id="remove-input-btn"
                        onClick={() => handleRemove(index)}
                      >
                        {""}
                        <Icon name="actionDelete" size="large" />
                      </Button>
                    )}
                  </Flex>
                </Form>
              ))}
              <Button
                id={`add-${inputType}-button`}
                buttonType="text"
                onClick={handleAdd}
                size="large"
                sx={{
                  justifyContent: "flex-start",
                  width: { base: "87%", md: "300px" },
                  padding: "xxs",
                }}
              >
                {formUtils.addButtonLabel}
              </Button>
            </Flex>
          ) : isEmail || tempInputs.length != 0 ? (
            <Flex
              marginLeft={{ base: "l", lg: "unset" }}
              flexDir="row"
              alignItems="flex-start"
            >
              <Flex flexDir="column" alignItems="flex-start">
                {tempInputs.map((input, index) => (
                  <Text
                    key={index}
                    sx={{ paddingTop: "xs", marginBottom: "xs" }}
                  >
                    {input}{" "}
                    {index === 0 && inputs.length > 1 && (
                      <span
                        style={{
                          display: "inline",
                          padding: 0,
                          margin: 0,
                          color: "var(--nypl-colors-ui-gray-semi-dark)",
                        }}
                      >
                        (P)
                      </span>
                    )}
                  </Text>
                ))}
              </Flex>
              <Button
                id="edit-input-button"
                buttonType="text"
                onClick={() => {
                  setTempInputs([...inputs])
                  setIsEditing(true)
                }}
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
          ) : (
            <Button
              id={`add-${inputType}-button`}
              buttonType="text"
              onClick={() => {
                setIsEditing(true)
                handleAdd()
              }}
              size="large"
              sx={{
                justifyContent: "flex-start",
                width: { base: "87%", md: "300px" },
                paddingLeft: { base: "m", md: "unset" },
              }}
            >
              {formUtils.addButtonLabel}
            </Button>
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
      )}
    </>
  )
}
export default PhoneEmailForm
