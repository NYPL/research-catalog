import {
  Form,
  FormField,
  RadioGroup,
  Radio,
  ButtonGroup,
  Button,
} from "@nypl/design-system-react-components"

import type { DeliveryLocation } from "../../../src/types/locationTypes"

import { BASE_URL } from "../../config/constants"

interface HoldRequestFormProps {
  deliveryLocations: DeliveryLocation[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  holdId: string
  patronId: string
  source: string
}

/**
 * The HoldRequestForm renders the form for placing a hold on an item.
 */
const HoldRequestForm = ({
  deliveryLocations,
  handleSubmit,
  holdId,
  patronId,
  source,
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
      <input type="hidden" id="patronId" name="patronId" value={patronId} />
      <input type="hidden" id="source" name="source" value={source} />
      <FormField>
        <RadioGroup
          name="pickupLocation"
          id="pickup-location"
          labelText="Pickup location"
          defaultValue={deliveryLocations[0].value}
          isRequired
          showLabel={false}
          mb="xs"
        >
          {deliveryLocations.map((location: DeliveryLocation, index) => (
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
              value={location.value}
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
