import { Banner, Flex } from "@nypl/design-system-react-components"
import EDSBanner from "./EDSBanner"
import styles from "../../../styles/components/Layout.module.scss"

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
      ml={{ base: "s", xl: 0 }}
      mr={{ base: "s", xl: 0 }}
      mt={{ base: "s", md: "l" }}
    >
      <EDSBanner />
      {showNotification && bannerNotification && (
        <Banner
          mt="0"
          className={`${styles.banner} no-print`}
          heading="New Service Announcement"
          content={bannerNotification}
        />
      )}
    </Flex>
  )
}
export default SearchBanners
