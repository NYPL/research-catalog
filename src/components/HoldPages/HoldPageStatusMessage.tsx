import type {
  HoldPageStatus,
  PatronEligibility,
} from "../../types/holdPageTypes"

interface HoldPageStatusMessageProps {
  status: HoldPageStatus
  patronEligibility?: PatronEligibility
}

/**
 * The HoldPageStatusMessage component renders the correct copy for different patron hold ineligibility statuses.
 */
const HoldPageStatusMessage = ({
  status,
  patronEligibility,
}: HoldPageStatusMessageProps) => {
  return <></>
}

export default HoldPageStatusMessage
