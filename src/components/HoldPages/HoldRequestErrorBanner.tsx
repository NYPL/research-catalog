import { useContext } from "react"
import { Box, Banner, Button, List } from "@nypl/design-system-react-components"

import {
  HoldPageErrorHeadings,
  HoldPageContactPrefixes,
} from "../../utils/holdPageUtils"
import type {
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../types/holdPageTypes"
import { FeedbackContext } from "../../context/FeedbackContext"
import type { ItemMetadata } from "../../types/itemTypes"
import type Item from "../../models/Item"
import RCLink from "../Links/RCLink/RCLink"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { PATHS } from "../../config/constants"
import { appConfig } from "../../config/config"

interface HoldRequestErrorBannerProps {
  item: Item
  errorStatus?: HoldErrorStatus
  patronEligibilityStatus?: PatronEligibilityStatus
}

/**
 * The HoldRequestErrorBanner renders an error notification on the hold page that includes a button to
 * open the feedback form, pre-populated with item metadata.
 */
const HoldRequestErrorBanner = ({
  item,
  errorStatus = "failed",
  patronEligibilityStatus,
}: HoldRequestErrorBannerProps) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }

  return (
    <Banner
      type="negative"
      heading={HoldPageErrorHeadings?.[errorStatus] || null}
      data-testid="hold-request-error"
      // TODO: Ask DS team to make button link variant match the default link styles
      sx={{
        button: {
          color: "ui.error.primary",
          "&:hover": { color: "ui.error.primary" },
        },
      }}
      content={
        <>
          <Box>
            {HoldPageContactPrefixes?.[errorStatus] ? (
              <>
                {HoldPageContactPrefixes?.[errorStatus]}
                {" Please try again, "}
                <Button
                  id="hold-contact"
                  onClick={() =>
                    onContact({
                      id: item.id,
                      barcode: item.barcode,
                      callNumber: item.callNumber,
                      bibId: item.bibId,
                      notificationText: `Request failed for call number ${item.callNumber}`,
                    })
                  }
                  buttonType="link"
                  // TODO: Ask DS team to make button link variant match the default link styles
                  sx={{
                    display: "inline",
                    fontWeight: "inherit",
                    fontSize: "inherit",
                    p: 0,
                    height: "auto",
                    textAlign: "left",
                    minHeight: "auto",
                    textDecorationStyle: "dotted",
                    textDecorationThickness: "1px",
                    textUnderlineOffset: "2px",
                  }}
                >
                  contact us
                </Button>{" "}
                for assistance, or{" "}
                <RCLink href="/search">start a new search.</RCLink>
              </>
            ) : null}
            {(() => {
              switch (errorStatus) {
                case "invalid":
                  return "Some fields contain errors. Please correct and submit again."
                case "patronIneligible":
                  return patronEligibilityStatus ? (
                    <PatronErrors
                      patronEligibilityStatus={patronEligibilityStatus}
                    />
                  ) : null
                default:
                  return null
              }
            })()}
          </Box>
        </>
      }
      mb="s"
    />
  )
}

const PatronErrors = ({
  patronEligibilityStatus,
}: {
  patronEligibilityStatus: PatronEligibilityStatus
}) => {
  const { expired, moneyOwed, ptypeDisallowsHolds, reachedHoldLimit } =
    patronEligibilityStatus

  return (
    <Box>
      This is because:
      <List
        type="ul"
        margin={0}
        listItems={[
          ...(expired
            ? [
                <>
                  Your account has expired -- Please see{" "}
                  <ExternalLink href={appConfig.urls.renewCard}>
                    Library Terms and Conditions -- Renewing or Validating Your
                    Library Card
                  </ExternalLink>{" "}
                  about renewing your card.
                </>,
              ]
            : []),
          ...(moneyOwed
            ? [
                <>
                  Your fines have exceeded the limit — you can pay your fines in
                  a branch or online from the links under{" "}
                  <RCLink href={PATHS.MY_ACCOUNT}>My Account</RCLink>.
                </>,
              ]
            : []),
          ...(ptypeDisallowsHolds
            ? ["Your card does not permit placing holds on ReCAP materials."]
            : []),
          ...(reachedHoldLimit
            ? ["You have reached the allowed number of holds."]
            : []),
        ]}
      />
    </Box>
  )
}

export default HoldRequestErrorBanner
