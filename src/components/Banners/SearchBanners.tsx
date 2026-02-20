import { Banner, Flex } from "@nypl/design-system-react-components"
import EDSBanner from "./EDSBanner"
import styles from "../../../styles/components/Layout.module.scss"
import UserGuideBanner from "./UserGuideBanner"

const SearchBanners = ({
  showNotification,
  bannerNotification,
}: {
  showNotification: boolean
  bannerNotification?: string
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
      {showNotification && bannerNotification && (
        <Banner
          mt="0"
          className={`${styles.banner} no-print`}
          heading="Service announcement"
          content={bannerNotification}
        />
      )}
      <EDSBanner />
      <UserGuideBanner />
    </Flex>
  )
}
export default SearchBanners
