import { Banner } from "@nypl/design-system-react-components"
import ContactUs from "../ContactUs/ContactUs"

interface MyAccountTabsErrorBannerPropsType {
  tabLabel: string
}

export const MyAccountTabsErrorBanner = ({
  tabLabel,
}: MyAccountTabsErrorBannerPropsType) => {
  return (
    <Banner
      variant="negative"
      isDismissible={false}
      sx={{ mt: "m" }}
      content={
        <>
          Your {tabLabel} could not be loaded. Try again later or <ContactUs />{" "}
          for assistance.
        </>
      }
    />
  )
}
