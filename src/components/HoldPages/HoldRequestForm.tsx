import {
  Form,
  FormField,
  RadioGroup,
  Radio,
  ButtonGroup,
  Button,
} from "@nypl/design-system-react-components"

// import type { DeliveryLocation } from "../../../src/types/holdTypes"

import { BASE_URL } from "../../config/constants"

interface HoldRequestFormProps {
  deliveryLocations: any[] // Replace with DeliveryLocation
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  holdId: string
}

/**
 * The HoldRequestForm renders the form for placing a hold on an item.
 */
const HoldRequestForm = ({
  deliveryLocations,
  handleSubmit,
}: HoldRequestFormProps) => {
  return (
    <Form
      id="hold-request-form"
      data-testid="hold-request-form"
      // We are using a post request on hold requests when JS is disabled
      method="post"
      action={`${BASE_URL}/api/hold/request/${holdId}`}
      onSubmit={handleSubmit}
      mb="l"
    >
      <FormField>
        <RadioGroup
          name="pickup-location"
          id="pickup-location"
          labelText="Pickup location"
          defaultValue="1"
          isRequired
          showLabel={false}
          mb="xs"
        >
          {deliveryLocations.map((location: any, index) => (
            <Radio
              id={`delivery-location-${index}`}
              key={`delivery-location-${index}`}
              labelText={
                <>
                  {location.label}
                  <br />
                  {location.address}
                </>
              }
              value={index.toString()}
            />
          ))}
        </RadioGroup>
      </FormField>
      <ButtonGroup>
        <Button id="holdRequestSubmit" type="submit">
          Submit request
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default HoldRequestForm
