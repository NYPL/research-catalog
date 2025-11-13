import { Box, Banner } from "@nypl/design-system-react-components"
import Link from "../Link/Link"

type HoldRequestCompletedBannerProps = {
  isEDD?: boolean
}

/**
 * The HoldRequestCompletedBanner renders an notification on the hold page that tells the user they've
 * already requested a hold on this item. Triggered by a flag in session storage on the confirmation page.
 */
const HoldRequestCompletedBanner = ({
  isEDD = false,
}: HoldRequestCompletedBannerProps) => {
  return (
    <Banner
      variant="warning"
      heading={
        isEDD
          ? "You've already requested a scan of this item"
          : "You've already requested this item"
      }
      data-testid="hold-request-completed"
      mb="l"
      content={
        isEDD ? (
          <Box>
            To request a scan of a different part of this item, fill out the
            form below and submit again.
          </Box>
        ) : (
          <Box>
            To cancel this request, go to the &rsquo;Requests&rsquo; tab in your{" "}
            <Link href="/account">patron account</Link>. Please allow a few
            minutes after requesting for this item to show up in your account.{" "}
          </Box>
        )
      }
    />
  )
}

export default HoldRequestCompletedBanner
