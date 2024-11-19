import {
  Form,
  FormField,
  ButtonGroup,
  Button,
  TextInput,
  FormRow,
  Box,
  Heading,
  Text,
} from "@nypl/design-system-react-components"
import { useState, createRef, type SyntheticEvent } from "react"
import { debounce } from "underscore"

import { BASE_URL, DEBOUNCE_INTERVAL } from "../../config/constants"
import ExternalLink from "../Links/ExternalLink/ExternalLink"

import { CopyrightRestrictionsBanner } from "./CopyrightRestrictionsBanner"
import {
  getUpdatedInvalidFields,
  validateEDDForm,
  initialEDDInvalidFields,
  isInvalidField,
} from "../../utils/holdPageUtils"
import type { EDDRequestParams, EDDPageStatus } from "../../types/holdPageTypes"

interface EDDRequestFormProps {
  eddFormState: EDDRequestParams
  setEddFormState: React.Dispatch<React.SetStateAction<EDDRequestParams>>
  handleSubmit: (eddParams: EDDRequestParams) => void
  setPageStatus: (status: EDDPageStatus) => void
  holdId: string
}

/**
 * The EDDRequestForm renders the form for placing a electronic delivery hold on an item.
 */
const EDDRequestForm = ({
  eddFormState,
  setEddFormState,
  handleSubmit,
  setPageStatus,
  holdId,
}: EDDRequestFormProps) => {
  // Set the invalid fields as an array in state to keep track of the first invalid field for focus on submit
  const [invalidFields, setInvalidFields] = useState(initialEDDInvalidFields)

  // Create refs for fields that require validation to focus on the first invalid field on submit
  const [validatedInputRefs] = useState(
    invalidFields.reduce((acc, field) => {
      return { ...acc, [field.key]: createRef() }
    }, {})
  )

  // Separate validation from input change to validate on tabbing (blur) and to prevent validation on every keystroke on fields other than email
  const validateField = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement

    setInvalidFields((prevInvalidFields) =>
      getUpdatedInvalidFields(target.name, target.value, prevInvalidFields)
    )
  }

  const handleInputChange = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement

    setEddFormState((prevEddFormState) => ({
      ...prevEddFormState,
      [target.name]: target.value,
    }))
  }

  const validateAndSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate the form on submission in case the user hasn't typed in all the required fields
    setInvalidFields((prevInvalidFields) =>
      validateEDDForm(eddFormState, prevInvalidFields)
    )

    // Find the first invalid field and focus on it
    const firstInvalidField = invalidFields.find(
      (firstInvalidFieldKey) => firstInvalidFieldKey.isInvalid
    )

    // Prevent form submission and focus on first invalid field if there is one
    if (firstInvalidField) {
      setPageStatus("invalid")
      validatedInputRefs?.[firstInvalidField.key]?.current.focus()
    } else {
      setPageStatus(null)
      handleSubmit(eddFormState)
    }
  }

  return (
    <Form
      id="edd-request-form"
      data-testid="edd-request-form"
      // We are using a post request on hold requests when JS is disabled
      method="post"
      action={`${BASE_URL}/api/hold/request/${holdId}/edd`}
      onSubmit={validateAndSubmit}
      mb="l"
      maxWidth={{ lg: "75%" }}
    >
      <input
        type="hidden"
        id="patronId"
        name="patronId"
        value={eddFormState.patronId}
      />
      <input
        type="hidden"
        id="source"
        name="source"
        value={eddFormState.source}
      />
      <Box>
        <Heading level="h3" size="heading4" mb="m">
          Required information
        </Heading>
        <Text noSpace>
          You may request one chapter, one article, around 10% of work, or 50
          pages for public domain works.
        </Text>
        <ExternalLink href="https://www.nypl.org/research/services/scan-and-deliver">
          Read more about this service
        </ExternalLink>
      </Box>
      <FormField>
        <TextInput
          id="email"
          name="email"
          value={eddFormState.email}
          labelText="Email address"
          isRequired
          placeholder="theresa.smith@gmail.com"
          helperText="Your request will be delivered to the email address you enter above."
          invalidText="Enter a valid email address. Your request will be delivered to the email address you enter above."
          isInvalid={isInvalidField("email", invalidFields)}
          onChange={debounce((e) => {
            validateField(e)
            handleInputChange(e)
          }, DEBOUNCE_INTERVAL)}
          ref={validatedInputRefs["email"]}
        />
      </FormField>
      <FormRow>
        <FormField>
          <TextInput
            id="starting-number"
            name="startingNumber"
            value={eddFormState.startingNumber}
            labelText="Starting page number"
            isRequired
            placeholder="Example: 1"
            helperText="Enter the first page you would like scanned."
            invalidText="Enter a page number. You may request a maximum of 50 pages."
            isInvalid={isInvalidField("startingNumber", invalidFields)}
            onBlur={validateField}
            onChange={debounce(handleInputChange, DEBOUNCE_INTERVAL)}
            ref={validatedInputRefs["startingNumber"]}
          />
        </FormField>
        <FormField>
          <TextInput
            id="ending-number"
            name="endingNumber"
            value={eddFormState.endingNumber}
            labelText="Ending page number"
            isRequired
            placeholder="Example: 20"
            helperText="Enter the last page you would like scanned."
            invalidText="Enter a page number. You may request a maximum of 50 pages."
            isInvalid={isInvalidField("endingNumber", invalidFields)}
            onBlur={validateField}
            onChange={debounce(handleInputChange, DEBOUNCE_INTERVAL)}
            ref={validatedInputRefs["endingNumber"]}
          />
        </FormField>
      </FormRow>
      <FormField>
        <TextInput
          id="chapter"
          name="chapter"
          value={eddFormState.chapter}
          labelText="Chapter or article title"
          isRequired
          placeholder="Example: Chapter 1"
          helperText="Enter the name/number of the chapter or article you would like scanned."
          invalidText="Indicate the title of the chapter or article you are requesting."
          isInvalid={isInvalidField("chapter", invalidFields)}
          onBlur={validateField}
          onChange={handleInputChange}
          ref={validatedInputRefs["chapter"]}
        />
      </FormField>
      <Box>
        <Heading level="h3" size="heading4" mb="xs">
          Optional information
        </Heading>
        <Text noSpace>
          Feel free to provide more information that could be helpful in
          processing your request.
        </Text>
      </Box>
      <FormField>
        <TextInput
          id="author"
          name="author"
          value={eddFormState.author}
          labelText="Author"
          placeholder="Example: Charles Dickens"
          onChange={handleInputChange}
        />
      </FormField>
      <FormRow>
        <FormField>
          <TextInput
            id="publication-date"
            name="publicationDate"
            value={eddFormState.publicationDate}
            labelText="Date published"
            placeholder="Example: 1932"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <TextInput
            id="volume"
            name="volume"
            value={eddFormState.volume}
            labelText="Volume"
            placeholder="Example: V3"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <TextInput
            id="issue"
            name="issue"
            value={eddFormState.issue}
            labelText="Issue"
            placeholder="Example: Issue 27"
            onChange={handleInputChange}
          />
        </FormField>
      </FormRow>
      <FormField>
        <TextInput
          id="notes"
          name="notes"
          value={eddFormState.notes}
          type="textarea"
          labelText="Notes"
          placeholder="Example: Please include foldouts in the scan."
          helperText="Provide additional instructions here."
          onChange={handleInputChange}
        />
      </FormField>
      <CopyrightRestrictionsBanner />
      <ButtonGroup>
        <Button id="edd-request-submit" type="submit">
          Submit request
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default EDDRequestForm
