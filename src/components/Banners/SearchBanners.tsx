import { Flex } from "@nypl/design-system-react-components"
import EDSBanner from "./EDSBanner"
import ServiceAnnouncementBanner from "./ServiceAnnouncementBanner"

const SearchBanners = ({
  announcementContent,
}: {
  announcementContent?: string
}) => {
  return (
    <Flex
      align="center"
      gap="s"
      direction="column"
      sx={{
        px: { base: "s", md: "m", xl: "s" },
        pt: "l",
        pb: "xs",
      }}
    >
      <ServiceAnnouncementBanner bannerContent={announcementContent} />
      <EDSBanner />
    </Flex>
  )
}
export default SearchBanners
