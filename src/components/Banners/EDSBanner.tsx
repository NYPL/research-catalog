import { Banner } from "@nypl/design-system-react-components"
import React from "react"
import styles from "../../../styles/components/Layout.module.scss"
import Link from "../Link/Link"

/**
 * Renders EDS announcement in a DS banner.
 */
const EDSBanner = () => {
  return (
    <Banner
      className={`${styles.banner} no-print`}
      variant="informative"
      content={
        <>
          Try{" "}
          <Link
            style={{ color: "var(--nypl-colors-ui-link-primary" }}
            isExternal
            href="https://www.nypl.org/research/collections/online-resources-databases"
          >
            Article Plus
          </Link>{" "}
          to discover online journals, books, and more from home with your
          library card.
        </>
      }
    />
  )
}

export default EDSBanner
