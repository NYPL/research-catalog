import { Box, Banner } from "@nypl/design-system-react-components"
import type Item from "../../models/Item"
import RCLink from "../Links/RCLink/RCLink"

type HoldRequestCompletedBannerProps = {
  item: Item
  isEDD?: boolean
}

/**
 * The HoldRequestCompletedBanner renders an notification on the hold page that tells the user they've
 * already requested a hold on this item. Triggered by a flag in session storage on the confirmation page.
 */
const HoldRequestCompletedBanner = ({
  item,
  isEDD = false,
}: HoldRequestCompletedBannerProps) => {
  return (
    <Banner
      type="warning"
      heading={
        isEDD
          ? "You've already requested a scan of this item"
          : "You've already requested this item"
      }
      data-testid="hold-request-completed"
      mb="l"
      content={
        <Box>
          To cancel this request, go to the &apos;Requests&apos; tab in your{" "}
          <RCLink href="/account">patron account</RCLink>. Please allow a few
          minutes after requesting for this item to show up in your account.{" "}
        </Box>
      }
    />
  )
}

export default HoldRequestCompletedBanner
