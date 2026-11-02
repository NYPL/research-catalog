import { Banner } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/Layout.module.scss"

interface ServiceAnnouncementBannerProps {
  bannerContent?: string
}

/**
 * Renders the service announcement banner (content from serviceAnnouncement in appConfig).
 */
const ServiceAnnouncementBanner = ({
  bannerContent,
}: ServiceAnnouncementBannerProps) => {
  if (!bannerContent) return null

  return (
    <Banner
      mt="0"
      className={`${styles.banner} no-print`}
      heading="Service announcement"
      content={bannerContent}
    />
  )
}

export default ServiceAnnouncementBanner
