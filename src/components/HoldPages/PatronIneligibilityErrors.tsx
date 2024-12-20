import { Text, Box, List } from "@nypl/design-system-react-components"

import type { PatronEligibilityStatus } from "../../types/holdPageTypes"
import RCLink from "../Links/RCLink/RCLink"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { PATHS } from "../../config/constants"
import { appConfig } from "../../config/config"

interface PatronIneligibilityErrorsProps {
  patronEligibilityStatus: PatronEligibilityStatus
}

/**
 * The PatronIneligibilityErrors component is responsible for rendering a list of reasons why
 * a patron is ineligible to place holds within the HoldRequestErrorBanner component.
 */
const PatronIneligibilityErrors = ({
  patronEligibilityStatus,
}: PatronIneligibilityErrorsProps) => {
  const { expired, moneyOwed, ptypeDisallowsHolds, reachedHoldLimit } =
    patronEligibilityStatus

  const hasSpecificReason =
    expired || moneyOwed || ptypeDisallowsHolds || reachedHoldLimit

  // Generic patron error displayed in heading, don't show reasons list if there isn't one
  if (!hasSpecificReason) return null

  return (
    <Box mt="xs">
      <Text mb="xs">This is because:</Text>
      <List type="ul" margin={0}>
        {expired ? (
          <>
            Your account has expired -- Please see{" "}
            <ExternalLink href={appConfig.urls.renewCard}>
              Library Terms and Conditions -- Renewing or Validating Your
              Library Card
            </ExternalLink>{" "}
            about renewing your card.
          </>
        ) : (
          <></>
        )}
        {moneyOwed ? (
          <>
            Your fines have exceeded the limit — you can pay your fines in a
            branch or online from the links under{" "}
            <RCLink href={PATHS.MY_ACCOUNT}>My Account</RCLink>.
          </>
        ) : (
          <></>
        )}
        {ptypeDisallowsHolds ? (
          "Your card does not permit placing holds on ReCAP materials."
        ) : (
          <></>
        )}
        {reachedHoldLimit ? (
          "You have reached the allowed number of holds."
        ) : (
          <></>
        )}
      </List>
    </Box>
  )
}

export default PatronIneligibilityErrors