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
  Banner,
} from "@nypl/design-system-react-components"
import { isEmail } from "validator"
import { debounce } from "underscore"
import {
  useState,
  createRef,
  useReducer,
  type SyntheticEvent,
  useMemo,
} from "react"

import { BASE_URL, DEBOUNCE_INTERVAL } from "../../config/constants"
import ExternalLink from "../Links/ExternalLink/ExternalLink"

import { eddFormReducer } from "../../reducers/eddFormReducer"
import { initialEDDFormState } from "../../utils/holdUtils"
import type { EDDRequestParams } from "../../types/holdTypes"

interface EDDRequestFormProps {
  handleSubmit: (eddParams: EDDRequestParams) => void
  holdId: string
  patronId: string
  source: string
}

/**
 * The EDDRequestForm renders the form for placing a electronic delivery hold on an item.
 */
const EDDRequestForm = ({
  handleSubmit,
  holdId,
  patronId,
  source,
}: EDDRequestFormProps) => {
  const [eddFormState, dispatch] = useReducer(eddFormReducer, {
    ...initialEDDFormState,
    patronId,
    source,
  })

  const [invalidFields, setInvalidFields] = useState([
    { key: "email", isInvalid: false },
    { key: "startingNumber", isInvalid: false },
    { key: "endingNumber", isInvalid: false },
    { key: "chapter", isInvalid: false },
  ])

  // Create refs for fields that require validation to focus on the first invalid field on submit
  const [validatedInputRefs] = useState(
    invalidFields.reduce((acc, field) => {
      return { ...acc, [field.key]: createRef() }
    }, {})
  )

  const handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement

    dispatch({
      type: "input_change",
      field: target.name,
      payload: target.value,
    })
  }

  const validateField = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement

    setInvalidFields((prevInvalidFields) => {
      return prevInvalidFields.map((field) => {
        if (field.key === target.name) {
          switch (field.key) {
            // Validate email field
            case "email":
              return {
                key: "email",
                isInvalid: !target.value.length || !isEmail(target.value),
              }
            // Validate other fields
            default:
              return { key: field.key, isInvalid: !target.value.length }
          }
        }
        return field
      })
    })
  }

  const validateAndSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const firstInvalidField = invalidFields.find(
      (firstInvalidFieldKey) => firstInvalidFieldKey.isInvalid
    )

    // Prevent form submission and focus on first invalid field if there is one
    if (firstInvalidField) {
      validatedInputRefs?.[firstInvalidField.key]?.current.focus()
    } else {
      handleSubmit(eddFormState)
    }
  }

  return (
    <Form
      id="edd-request-form"
      data-testid="hold-request-form"
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
          isInvalid={
            invalidFields.find((field) => field.key === "email").isInvalid
          }
          onChange={handleInputChange}
          onBlur={validateField}
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
            isInvalid={
              invalidFields.find((field) => field.key === "startingNumber")
                .isInvalid
            }
            onChange={handleInputChange}
            onBlur={validateField}
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
            isInvalid={
              invalidFields.find((field) => field.key === "endingNumber")
                .isInvalid
            }
            onChange={handleInputChange}
            onBlur={validateField}
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
          isInvalid={
            invalidFields.find((field) => field.key === "chapter").isInvalid
          }
          onChange={handleInputChange}
          onBlur={validateField}
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
      <Banner
        type="neutral"
        heading="Copyright restrictions"
        content={
          <Box>
            <Text>
              The copyright law of the United States (Title 17, United States
              Code) governs the making of photocopies or other reproductions of
              copyrighted material.
            </Text>
            <Text>
              Under certain conditions specified in the law, libraries and
              archives are authorized to furnish a photocopy or other
              reproduction. One of these specific conditions is that the
              photocopy or reproduction is not to be “used for any purpose other
              than private study, scholarship, or research.” If a user makes a
              request for, or later uses, a photocopy or reproduction for
              purposes in excess of “fair use,” that user may be liable for
              copyright infringement.
            </Text>
            <Text>
              This institution reserves the right to refuse to accept a copying
              order if, in its judgment, fulfillment of the order would involve
              violation of copyright law.
            </Text>
          </Box>
        }
        mb="s"
      />
      <ButtonGroup>
        <Button id="edd-request-submit" type="submit">
          Submit request
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default EDDRequestForm
