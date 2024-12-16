import { useContext } from "react"
import { Text, Box, Banner, Button } from "@nypl/design-system-react-components"

import type {
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../types/holdPageTypes"
import { FeedbackContext } from "../../context/FeedbackContext"
import type { ItemMetadata } from "../../types/itemTypes"
import type Item from "../../models/Item"
import RCLink from "../Links/RCLink/RCLink"
import PatronIneligibilityErrors from "./PatronIneligibilityErrors"
import {
  PATHS,
  HOLD_PAGE_ERROR_HEADINGS,
  HOLD_PAGE_CONTACT_PREFIXES,
} from "../../config/constants"

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
