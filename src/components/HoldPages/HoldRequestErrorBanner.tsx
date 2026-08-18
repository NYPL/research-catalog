import { Text, Box, Banner } from "@nypl/design-system-react-components"

import type {
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../types/holdPageTypes"

import type Item from "../../models/Item"

import PatronIneligibilityErrors from "./PatronIneligibilityErrors"
import {
  HOLD_PAGE_ERROR_HEADINGS,
  HOLD_PAGE_CONTACT_PREFIXES,
} from "../../config/constants"
import ContactUs from "../ContactUs/ContactUs"

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
  errorStatus = "patronIneligible",
  patronEligibilityStatus,
}: HoldRequestErrorBannerProps) => {
  return (
    <Banner
      variant="negative"
      heading={HOLD_PAGE_ERROR_HEADINGS?.[errorStatus] || null}
      data-testid="hold-request-error"
      mb="l"
      // TODO: Ask DS team to make button link variant match the default link styles
      sx={{
        button: {
          color: "ui.error.primary",
          "&:hover": { color: "ui.error.primary" },
        },
      }}
      content={
        <Box>
          {HOLD_PAGE_CONTACT_PREFIXES?.[errorStatus] && (
            <Text>
              {HOLD_PAGE_CONTACT_PREFIXES?.[errorStatus]}
              {" Please "}
              <ContactUs
                item={item}
                notificationText={`Request failed for call number ${item.callNumber}`}
              />{" "}
              for assistance.
            </Text>
          )}
          {(() => {
            switch (errorStatus) {
              case "invalid":
                return "Some fields contain errors. Please correct and submit again."
              case "patronIneligible":
                return patronEligibilityStatus ? (
                  <PatronIneligibilityErrors
                    patronEligibilityStatus={patronEligibilityStatus}
                    item={item}
                  />
                ) : null
              default:
                return null
            }
          })()}
        </Box>
      }
    />
  )
}

export default HoldRequestErrorBanner
