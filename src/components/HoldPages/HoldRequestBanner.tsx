import { useContext } from "react"
import { Box, Banner, Button } from "@nypl/design-system-react-components"

import { FeedbackContext } from "../../../src/context/FeedbackContext"
import type { ItemMetadata } from "../../../src/types/itemTypes"
import type Item from "../../../src/models/Item"
import RCLink from "../Links/RCLink/RCLink"

interface HoldRequestBannerProps {
  item: Item
  heading: string
  errorMessage: string
  errorDetail?: string
}

/**
 * The HoldRequestBanner renders an error notification on the hold page that includes a button to
 * open the feedback form, pre-populated with item metadata.
 */
const HoldRequestBanner = ({
  item,
  heading,
  errorMessage,
  errorDetail,
}: HoldRequestBannerProps) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }

  return (
    <Banner
      type="negative"
      heading={heading}
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
            {`${errorMessage}. Please try again, `}
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
          </Box>
          {errorDetail ? <Box>{errorDetail}</Box> : null}
        </>
      }
      mb="s"
    />
  )
}

export default HoldRequestBanner