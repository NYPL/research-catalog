import { Box, List, Text } from "@nypl/design-system-react-components"

import type { PatronEligibilityStatus } from "../../types/holdPageTypes"
import type Item from "../../models/Item"

import Link from "../Link/Link"
import { HoldContactButton } from "./HoldContactButton"

import { PATHS } from "../../config/constants"
import { appConfig } from "../../config/appConfig"

interface PatronIneligibilityErrorsProps {
  patronEligibilityStatus: PatronEligibilityStatus
  item: Item
}

/**
 * The PatronIneligibilityErrors component is responsible for rendering a list of reasons why
 * a patron is ineligible to place holds within the HoldRequestErrorBanner component.
 */
const PatronIneligibilityErrors = ({
  patronEligibilityStatus,
  item,
}: PatronIneligibilityErrorsProps) => {
  const { expired, moneyOwed, ptypeDisallowsHolds, reachedHoldLimit } =
    patronEligibilityStatus

  const ineligibilityReasons = [
    ...(expired
      ? [
          <>
            Your account has expired -- Please see{" "}
            <Link isExternal href={appConfig.urls.renewCard}>
              Library Terms and Conditions -- Renewing or Validating Your
              Library Card
            </Link>{" "}
            about renewing your card.
          </>,
        ]
      : []),
    ...(moneyOwed
      ? [
          <>
            Your fines have exceeded the limit — you can pay your fines in a
            branch or online from the links under{" "}
            <Link href={PATHS.MY_ACCOUNT}>My Account</Link>.
          </>,
        ]
      : []),
    ...(ptypeDisallowsHolds
      ? [<>Your card does not permit placing holds on ReCAP materials.</>]
      : []),
    ...(reachedHoldLimit
      ? [<>You have reached the allowed number of holds.</>]
      : []),
  ]

  // Generic patron error displayed in heading, don't show reasons list if there isn't one
  if (!ineligibilityReasons.length) return null

  return (
    <Box>
      {ineligibilityReasons.length > 1 ? (
        <>
          <List variant="ul" margin={0} listItems={ineligibilityReasons} />
          <Text mt="xs">
            Please <HoldContactButton item={item}>contact us</HoldContactButton>{" "}
            for assistance if required.
          </Text>
        </>
      ) : (
        <>
          {ineligibilityReasons.map((reason) => reason)} Please{" "}
          <HoldContactButton item={item}>contact us</HoldContactButton> for
          assistance.
        </>
      )}
    </Box>
  )
}

export default PatronIneligibilityErrors
