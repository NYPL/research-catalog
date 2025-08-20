import { Banner, Flex } from "@nypl/design-system-react-components"
import React from "react"
import styles from "../../../styles/components/Layout.module.scss"

/**
 * Renders SH information in a DS banner.
 */
const SubjectHeadingBanner = () => {
  return (
    <Flex
      align="center"
      direction="column"
      ml={{ base: "s", xl: 0 }}
      mr={{ base: "s", xl: 0 }}
    >
      <Banner
        className={`${styles.banner} no-print`}
        type="recommendation"
        mt={{ base: "s", lg: "l" }}
        isDismissible
        content={
          <>
            <span style={{ fontWeight: "bold" }}>Subject Headings</span> are the
            most effective strategy for browsing the NYPL Research Catalog.
            These descriptive authorities, created by the Library of Congress,
            are used to group similar materials together. Each item in the
            catalog is typically assigned at least one relevant Subject Heading,
            and clicking through the hyperlinked Subject Headings is the best
            way to gain a comprehensive sense of NYPL collections.
          </>
        }
      />
    </Flex>
  )
}

export default SubjectHeadingBanner
