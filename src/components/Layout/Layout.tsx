import { type ReactElement, type PropsWithChildren } from "react"
import {
  Box,
  TemplateAppContainer,
  Breadcrumbs,
  DSProvider,
  Heading,
  Banner,
} from "@nypl/design-system-react-components"

import { type RCPage } from "../../types/pageTypes"
import styles from "../../../styles/components/Layout.module.scss"
import SubNav from "../SubNav/SubNav"
import SearchForm from "../SearchForm/SearchForm"
import { BASE_URL } from "../../config/constants"
import FeedbackForm from "../FeedbackForm/FeedbackForm"
import type { Aggregation } from "../../types/filterTypes"
import RCBanner from "./RCBanner"
import EDSBanner from "../EDSBanner"

interface LayoutProps {
  sidebar?: ReactElement
  activePage?: RCPage
  sidebarPosition?: "right" | "left"
  isAuthenticated?: boolean
  searchAggregations?: Aggregation[]
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
  sidebarPosition = "right",
  bannerNotification,
}: PropsWithChildren<LayoutProps>) => {
  const showSearch = activePage === "search"
  const showHeader = activePage !== "404"
  const showNotification = activePage === "" || activePage === "search"

  return (
    <DSProvider>
      <TemplateAppContainer
        // This is a workaround to fix a text-wrapping issue when page is zoomed in on
        // TODO: Address this issue in the DS
        sx={{ "main > div": { maxWidth: "100vw" } }}
        breakout={
          showHeader && (
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
                }}
              />
              <div className={styles.researchHeadingContainer}>
                <Heading id="heading-h1" level="h1" text="Research Catalog" />
                <SubNav
                  isAuthenticated={isAuthenticated}
                  activePage={activePage}
                />
                {showSearch && <SearchForm aggregations={searchAggregations} />}
              </div>
              <EDSBanner />
              {showNotification && bannerNotification && (
                <RCBanner
                  heading="New Service Announcement"
                  content={bannerNotification}
                />
              )}
            </>
          )
        }
        sidebar={sidebar ? sidebarPosition : "none"}
        contentPrimary={
          <Box pb="l">
            {children}
            <FeedbackForm />
          </Box>
        }
        contentSidebar={sidebar && <Box pb="l">{sidebar}</Box>}
      />
    </DSProvider>
  )
}

export default Layout
