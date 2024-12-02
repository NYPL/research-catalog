import { Text } from "@nypl/design-system-react-components"

import type {
  HoldPageStatus,
  PatronEligibilityStatus,
} from "../../types/holdPageTypes"

interface HoldIneligibilityStatusProps {
  status: HoldPageStatus
  eligibilityStatus?: PatronEligibilityStatus
}

/**
 * The HoldPageStatusMessages component renders the correct copy for different patron hold ineligibility statuses.
 */
const HoldPageStatusMessages = ({
  status,
  eligibilityStatus,
}: HoldIneligibilityStatusProps) => {
  return <></>
}

export default HoldPageStatusMessages
