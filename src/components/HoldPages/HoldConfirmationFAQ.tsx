import { Heading, Accordion, Box } from "@nypl/design-system-react-components"

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
    <Box data-testid={`${isEDD ? "edd" : "on-site"}-confirmation-faq`}>
      <Heading level="h3" mb="l">
        Frequently asked questions
      </Heading>
      <Accordion
        accordionData={isEDD ? eddConfirmationFAQData : holdConfirmationFAQData}
        isDefaultOpen
      />
    </Box>
  )
}

export default HoldConfirmationFAQ
