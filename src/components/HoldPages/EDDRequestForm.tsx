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
import { useRouter } from "next/router"

import { BASE_URL, EDD_FORM_FIELD_COPY } from "../../config/constants"

import { CopyrightRestrictionsBanner } from "./CopyrightRestrictionsBanner"
import {
  getUpdatedInvalidFields,
  validateEDDForm,
  isInvalidField,
  holdButtonDisabledStatuses,
  defaultValidatedEDDFields,
  getFirstInvalidEDDField,
} from "../../utils/holdPageUtils"
import type {
  EDDRequestParams,
  HoldErrorStatus,
  EDDFormValidatedField,
} from "../../types/holdPageTypes"
import Link from "../Link/Link"

interface EDDRequestFormProps {
  eddFormState: EDDRequestParams
  setEddFormState: React.Dispatch<React.SetStateAction<EDDRequestParams>>
  handleSubmit: (eddParams: EDDRequestParams) => void
  handleGAEvent: () => void
  setErrorStatus: (errorStatus: HoldErrorStatus) => void
  holdId: string
  errorStatus?: HoldErrorStatus
}

/**
 * The EDDRequestForm renders the form for placing a electronic delivery hold on an item.
 */
const EDDRequestForm = ({
  eddFormState,
  setEddFormState,
  handleSubmit,
  handleGAEvent,
  setErrorStatus,
  holdId,
  errorStatus,
}: EDDRequestFormProps) => {
  const router = useRouter()

  // Derive form validation state from query in case of js-disabled server-side redirect
  const { validatedFields } = router.query
  const serverValidatedFields = validatedFields
    ? JSON.parse(validatedFields as string)
    : null

  // Set the invalid fields as an array in state to keep track of the first invalid field for focus on submit
  const [invalidFields, setInvalidFields] = useState<EDDFormValidatedField[]>(
    serverValidatedFields || defaultValidatedEDDFields
  )

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
    const newValidatedFields = validateEDDForm(eddFormState, invalidFields)

    // Validate the form on submission in case the user hasn't typed in all the required fields
    setInvalidFields(newValidatedFields)

    // Find the first invalid field and focus on it
    const firstInvalidField = getFirstInvalidEDDField(newValidatedFields)

    // Prevent form submission and focus on first invalid field if there is one
    if (firstInvalidField) {
      setErrorStatus("invalid")
      validatedInputRefs?.[firstInvalidField.key]?.current.focus()
    } else {
      setErrorStatus(null)
      handleGAEvent()
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
        <Heading level="h3" size="heading4" mb="xs">
          Required information
        </Heading>
        <Text>
          You may request one chapter, one article, around 10% of work, or 50
          pages for public domain works.
        </Text>
        <Link
          isExternal
          href="https://www.nypl.org/research/services/scan-and-deliver"
        >
          Read more about this service
        </Link>
      </Box>
      <FormField>
        <TextInput
          id="email-address"
          name="emailAddress"
          value={eddFormState.emailAddress}
          labelText={EDD_FORM_FIELD_COPY.emailAddress.label}
          placeholder={EDD_FORM_FIELD_COPY.emailAddress.placeholder}
          helperText={EDD_FORM_FIELD_COPY.emailAddress.helperText}
          invalidText={EDD_FORM_FIELD_COPY.emailAddress.invalidText}
          isInvalid={isInvalidField("emailAddress", invalidFields)}
          onChange={(e) => {
            validateField(e)
            handleInputChange(e)
          }}
          ref={validatedInputRefs["emailAddress"]}
        />
      </FormField>
      <FormRow>
        <FormField>
          <TextInput
            id="start-page"
            name="startPage"
            value={eddFormState.startPage}
            labelText={EDD_FORM_FIELD_COPY.startPage.label}
            placeholder={EDD_FORM_FIELD_COPY.startPage.placeholder}
            helperText={EDD_FORM_FIELD_COPY.startPage.helperText}
            invalidText={EDD_FORM_FIELD_COPY.startPage.invalidText}
            isInvalid={isInvalidField("startPage", invalidFields)}
            onBlur={validateField}
            onChange={handleInputChange}
            ref={validatedInputRefs["startPage"]}
          />
        </FormField>
        <FormField>
          <TextInput
            id="end-page"
            name="endPage"
            value={eddFormState.endPage}
            labelText={EDD_FORM_FIELD_COPY.endPage.label}
            placeholder={EDD_FORM_FIELD_COPY.endPage.placeholder}
            helperText={EDD_FORM_FIELD_COPY.endPage.helperText}
            invalidText={EDD_FORM_FIELD_COPY.endPage.invalidText}
            isInvalid={isInvalidField("endPage", invalidFields)}
            onBlur={validateField}
            onChange={handleInputChange}
            ref={validatedInputRefs["endPage"]}
          />
        </FormField>
      </FormRow>
      <FormField mb="xs">
        <TextInput
          id="chapterTitle"
          name="chapterTitle"
          value={eddFormState.chapterTitle}
          labelText={EDD_FORM_FIELD_COPY.chapterTitle.label}
          placeholder={EDD_FORM_FIELD_COPY.chapterTitle.placeholder}
          helperText={EDD_FORM_FIELD_COPY.chapterTitle.helperText}
          invalidText={EDD_FORM_FIELD_COPY.chapterTitle.invalidText}
          isInvalid={isInvalidField("chapterTitle", invalidFields)}
          onBlur={validateField}
          onChange={handleInputChange}
          ref={validatedInputRefs["chapterTitle"]}
        />
      </FormField>
      <Box>
        <Heading level="h3" size="heading4" mb="xs">
          Optional information
        </Heading>
        <Text>
          Feel free to provide more information that could be helpful in
          processing your request.
        </Text>
      </Box>
      <FormField>
        <TextInput
          id="author"
          name="author"
          value={eddFormState.author}
          labelText={EDD_FORM_FIELD_COPY.author.label}
          placeholder={EDD_FORM_FIELD_COPY.author.placeholder}
          onChange={handleInputChange}
        />
      </FormField>
      <FormRow>
        <FormField>
          <TextInput
            id="date"
            name="date"
            value={eddFormState.date}
            labelText={EDD_FORM_FIELD_COPY.date.label}
            placeholder={EDD_FORM_FIELD_COPY.date.placeholder}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <TextInput
            id="volume"
            name="volume"
            value={eddFormState.volume}
            labelText={EDD_FORM_FIELD_COPY.volume.label}
            placeholder={EDD_FORM_FIELD_COPY.volume.placeholder}
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <TextInput
            id="issue"
            name="issue"
            value={eddFormState.issue}
            labelText={EDD_FORM_FIELD_COPY.issue.label}
            placeholder={EDD_FORM_FIELD_COPY.issue.placeholder}
            onChange={handleInputChange}
          />
        </FormField>
      </FormRow>
      <FormField mb="xs">
        <TextInput
          id="requestNotes"
          name="requestNotes"
          value={eddFormState.requestNotes}
          type="textarea"
          labelText={EDD_FORM_FIELD_COPY.requestNotes.label}
          placeholder={EDD_FORM_FIELD_COPY.requestNotes.placeholder}
          helperText={EDD_FORM_FIELD_COPY.requestNotes.helperText}
          onChange={handleInputChange}
        />
      </FormField>
      <CopyrightRestrictionsBanner />
      <ButtonGroup>
        <Button
          id="edd-request-submit"
          type="submit"
          isDisabled={holdButtonDisabledStatuses.includes(errorStatus)}
        >
          Submit request
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default EDDRequestForm
