import { type ReactElement, type PropsWithChildren } from "react"
import {
  Box,
  TemplateAppContainer,
  Breadcrumbs,
  DSProvider,
  Heading,
} from "@nypl/design-system-react-components"

import { type RCPage } from "../../types/pageTypes"
import styles from "../../../styles/components/Layout.module.scss"
import SearchForm from "../SearchForm/SearchForm"
import { BASE_URL } from "../../config/constants"
import FeedbackForm from "../FeedbackForm/FeedbackForm"
import type { Aggregation } from "../../types/filterTypes"
import RCSubNav from "../RCSubNav/RCSubNav"
import BrowseForm from "../BrowseForm/BrowseForm"
import SubjectHeadingBanner from "../Banners/SubjectHeadingBanner"
import SearchBanners from "../Banners/SearchBanners"

interface LayoutProps {
  sidebar?: ReactElement
  activePage: RCPage
  sidebarPosition?: "right" | "left"
  isAuthenticated?: boolean
  searchAggregations?: Aggregation[]
  searchResultsCount?: number
  bannerNotification?: string
}

/**
 * The Layout component wraps the TemplateAppContainer from the DS and
 * controls the rendering of Research Catalog header components per-page.
 */
const Layout = ({
  searchAggregations,
  children,
  isAuthenticated,
  sidebar,
  activePage,
  searchResultsCount,
  sidebarPosition = "left",
  bannerNotification,
}: PropsWithChildren<LayoutProps>) => {
  const showSearch = activePage === "search" || activePage === ""
  const showBrowse = activePage === "browse" || activePage === "sh-results"
  const showNotification = activePage === "" || activePage === "search"
  const showBrowseBanner =
    activePage === "browse" || activePage === "sh-results"
  return (
    <DSProvider>
      <TemplateAppContainer
        // This is a workaround to fix a text-wrapping issue when page is zoomed in on
        // TODO: Address this issue in the DS
        sx={{
          "main > div": { maxWidth: "100vw" },
          rowGap: {
            base: "grid.m",
            md: "grid.l",
          },
          main: {
            rowGap: {
              base: 0,
              md: "grid.l",
            },
          },
        }}
        breakout={
          <>
            <Breadcrumbs
              data-testid="layout-breadcrumbs"
              breadcrumbsType="research"
              breadcrumbsData={[
                { url: "https://nypl.org", text: "Home" },
                { url: "https://www.nypl.org/research", text: "Research" },
                {
                  url: `https://www.nypl.org${BASE_URL}`,
                  text: "Research Catalog",
                },
              ]}
              __css={{
                a: {
                  _focus: {
                    outlineColor: "ui.white",
                  },
                },
                "@media print": {
                  display: "none !important",
                },
              }}
            />
            <div className={`${styles.researchHeadingContainer} no-print`}>
              <Heading
                id="heading-h1"
                level="h1"
                text="Research Catalog"
                marginBottom="m"
              />
            </div>
            <RCSubNav
              isAuthenticated={isAuthenticated}
              activePage={activePage}
            />
            {showSearch && (
              <SearchForm
                aggregations={searchAggregations}
                searchResultsCount={searchResultsCount}
              />
            )}
            {showBrowse && (
              <>
                <BrowseForm activePage={activePage} />
                {showBrowseBanner && <SubjectHeadingBanner />}
              </>
            )}

            {showSearch && (
              <SearchBanners
                showNotification={showNotification}
                bannerNotification={bannerNotification}
              />
            )}
          </>
        }
        sidebar={sidebar ? sidebarPosition : "none"}
        contentPrimary={
          <Box pb="l">
            {children}
            <FeedbackForm />
          </Box>
        }
        contentSidebar={sidebar && <Box width="288px">{sidebar}</Box>}
      />
    </DSProvider>
  )
}

export default Layout
