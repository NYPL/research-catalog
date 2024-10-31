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

import { BASE_URL } from "../../config/constants"

import ExternalLink from "../Links/ExternalLink/ExternalLink"

interface EDDRequestFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
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
  return (
    <Form
      id="edd-request-form"
      data-testid="hold-request-form"
      // We are using a post request on hold requests when JS is disabled
      method="post"
      action={`${BASE_URL}/api/hold/request/${holdId}/edd`}
      onSubmit={handleSubmit}
      mb="l"
      maxWidth={{ lg: "75%" }}
    >
      <input type="hidden" id="patronId" name="patronId" value={patronId} />
      <input type="hidden" id="source" name="source" value={source} />
      <Box>
        <Heading level="h3" size="heading4" mb="xs">
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
          labelText="Email address"
          isRequired
          placeholder="theresa.smith@gmail.com"
          helperText="Your request will be delivered to the email address you enter above."
        />
      </FormField>
      <FormRow>
        <FormField>
          <TextInput
            id="starting-number"
            name="startingNumber"
            labelText="Starting page number"
            isRequired
            placeholder="Example: 1"
            helperText="Enter the first page you would like scanned."
          />
        </FormField>
        <FormField>
          <TextInput
            id="ending-number"
            name="endingNumber"
            labelText="Ending page number"
            isRequired
            placeholder="Example: 20"
            helperText="Enter the last page you would like scanned."
          />
        </FormField>
      </FormRow>
      <FormField>
        <TextInput
          id="chapter"
          name="chapter"
          labelText="Chapter or article title"
          isRequired
          placeholder="Example: Chapter 1"
          helperText="Enter the name/number of the chapter or article you would like scanned."
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
          labelText="Author"
          placeholder="Example: Charles Dickens"
        />
      </FormField>
      <FormRow>
        <FormField>
          <TextInput
            id="publication-date"
            name="publicationDate"
            labelText="Date published"
            placeholder="Example: 1932"
          />
        </FormField>
        <FormField>
          <TextInput
            id="volume"
            name="volume"
            labelText="Volume"
            placeholder="Example: V3"
          />
        </FormField>
        <FormField>
          <TextInput
            id="issue"
            name="issue"
            labelText="Issue"
            placeholder="Example: Issue 27"
          />
        </FormField>
      </FormRow>
      <FormField>
        <TextInput
          id="notes"
          name="notes"
          type="textarea"
          labelText="Notes"
          placeholder="Example: Please include foldouts in the scan."
          helperText="Provide additional instructions here."
        />
      </FormField>
      <ButtonGroup>
        <Button id="edd-request-submit" type="submit">
          Submit request
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default EDDRequestForm
