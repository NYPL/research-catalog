import {
  Form,
  FormField,
  ButtonGroup,
  Button,
} from "@nypl/design-system-react-components"

import { BASE_URL } from "../../config/constants"

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
      action={`${BASE_URL}/api/hold/request/${holdId}`}
      onSubmit={handleSubmit}
      mb="l"
    >
      <input type="hidden" id="patronId" name="patronId" value={patronId} />
      <input type="hidden" id="source" name="source" value={source} />
      <FormField></FormField>
      <ButtonGroup>
        <Button id="holdRequestSubmit" type="submit">
          Submit request
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default EDDRequestForm
