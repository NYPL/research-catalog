import { Banner, Flex } from "@nypl/design-system-react-components"
import React from "react"
import styles from "../../../styles/components/Layout.module.scss"
import ExternalLink from "../Links/ExternalLink/ExternalLink"

/**
 * Renders SH information in a DS banner.
 */
const SubjectHeadingBanner = () => {
  return (
    <Flex
      align="center"
      direction="column"
      sx={{
        px: { base: "s", md: "m", xl: "s" },
        pt: "l",
        pb: "xs",
      }}
    >
      <Banner
        className={`${styles.banner} no-print`}
        variant="recommendation"
        isDismissible
        content={
          <>
            Browsing is an effective strategy for gaining a comprehensive sense
            of the NYPL Research Catalog. The{" "}
            <span style={{ fontWeight: "bold" }}>Subject Headings index</span>{" "}
            draws from the Library of Congress Subject Headings (
            <ExternalLink
              sx={{
                color: "ui.link.primary !important",
                textDecoration: "underline dotted 1px",
                textUnderlineOffset: "2px",
              }}
              href="https://id.loc.gov/authorities/subjects.html"
            >
              LCSH
            </ExternalLink>
            ), which are descriptive authorities created by the Library of
            Congress and used by libraries to group similar materials together
            by subject. Each item in the catalog is typically assigned at least
            one relevant Subject Heading, and clicking through the hyperlinked
            Subject Headings is a great way to discover more materials about
            that subject.
          </>
        }
      />
    </Flex>
  )
}

export default SubjectHeadingBanner
