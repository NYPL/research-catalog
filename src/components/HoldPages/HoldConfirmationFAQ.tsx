import { Heading, Accordion } from "@nypl/design-system-react-components"

import {
  holdConfirmationFAQData,
  eddConfirmationFAQData,
} from "./HoldConfirmationAccordionData"

interface HoldConfirmationFAQProps {
  isEDD?: boolean
}

/**
 * The HoldConfirmationFAQ renders an FAQ accordion for the hold confirmation page.
 **/
const HoldConfirmationFAQ = ({ isEDD = false }: HoldConfirmationFAQProps) => {
  return (
    <>
      <Heading level="h3" mb="l">
        Frequently asked questions
      </Heading>
      <Accordion
        accordionData={isEDD ? eddConfirmationFAQData : holdConfirmationFAQData}
        isDefaultOpen
      />
    </>
  )
}

export default HoldConfirmationFAQ
