import { Banner } from "@nypl/design-system-react-components"
import React from "react"
import styles from "../../../styles/components/Layout.module.scss"
import Link from "../Link/Link"

/**
 * Renders user guide announcement in a DS banner.
 */
const UserGuideBanner = () => {
  return (
    <Banner
      className={`${styles.banner} no-print`}
      variant="recommendation"
      content={
        <>
          <span
            style={{
              color: "var(--nypl-colors-ui-success-primary)",
              fontWeight: 700,
            }}
          >
            New!
          </span>{" "}
          Read our{" "}
          <Link
            style={{ color: "var(--nypl-colors-ui-link-primary" }}
            isExternal
            href="https://libguides.nypl.org/researchcatalog/"
          >
            User Guide
          </Link>{" "}
          to learn more about using the Research Catalog and requesting research
          materials.
        </>
      }
    />
  )
}

export default UserGuideBanner
