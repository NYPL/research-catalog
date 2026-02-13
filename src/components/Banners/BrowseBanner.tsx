import { Banner, Flex } from "@nypl/design-system-react-components"
import React from "react"
import styles from "../../../styles/components/Layout.module.scss"
import Link from "../Link/Link"
import type { BrowseType } from "../../types/browseTypes"

interface BrowseBannerProps {
  browseType: BrowseType
}

/**
 * Renders browse information in a DS banner.
 */
const BrowseBanner = ({ browseType }: BrowseBannerProps) => {
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
          browseType === "subjects" ? (
            <>
              Browsing is an effective strategy for gaining a comprehensive
              sense of the NYPL Research Catalog. The{" "}
              <span style={{ fontWeight: "bold" }}>Subject Headings index</span>{" "}
              draws from the Library of Congress Subject Headings (
              <Link
                isExternal
                sx={{
                  color: "ui.link.primary !important",
                  textDecoration: "underline dotted 1px",
                  textUnderlineOffset: "2px",
                }}
                href="https://id.loc.gov/authorities/subjects.html"
              >
                LCSH
              </Link>
              ), which are descriptive authorities created by the Library of
              Congress and used by libraries to group similar materials together
              by subject. Each item in the catalog is typically assigned at
              least one relevant Subject Heading, and clicking through the
              hyperlinked Subject Headings is a great way to discover more
              materials about that subject.
            </>
          ) : (
            <>
              Browsing is an effective strategy for gaining a comprehensive
              sense of the NYPL Research Catalog. The{" "}
              <span style={{ fontWeight: "bold" }}>
                Author/contributor index
              </span>{" "}
              draws from the Library of Congress Names (
              <Link
                isExternal
                sx={{
                  color: "ui.link.primary !important",
                  textDecoration: "underline dotted 1px",
                  textUnderlineOffset: "2px",
                }}
                href="https://id.loc.gov/authorities/names.html"
              >
                LCNAF
              </Link>
              ), which are descriptive authorities created by the Library of
              Congress and used by libraries to group similar materials together
              by names of persons, organizations, events, places, and titles.
              Each item in the catalog is typically assigned at least one
              relevant Author/contributor, and clicking through the hyperlinked
              Author/contributors is a great way to discover more materials by
              that entity.
            </>
          )
        }
      />
    </Flex>
  )
}

export default BrowseBanner
