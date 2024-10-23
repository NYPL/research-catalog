import { useContext } from "react"
import { Banner, Button } from "@nypl/design-system-react-components"

import { FeedbackContext } from "../../../src/context/FeedbackContext"
import type { ItemMetadata } from "../../../src/types/itemTypes"
import type Item from "../../../src/models/Item"
import RCLink from "../Links/RCLink/RCLink"

interface HoldRequestBannerProps {
  item: Item
}

/**
 * The HoldRequestBanner renders the error notification for a failed response on the hold page.
 */
const HoldRequestBanner = ({ item }: HoldRequestBannerProps) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }

  return (
    <Banner
      type="negative"
      heading="Request failed"
      data-testid="hold-request-error"
      content={
        <>
          We were unable to process your request at this time. Please try again,{" "}
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
          for assistance, or <RCLink href="/search">start a new search.</RCLink>
        </>
      }
      mb="s"
    />
  )
}

export default HoldRequestBanner
