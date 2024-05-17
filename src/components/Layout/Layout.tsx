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
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import type { Aggregation } from "../../types/filterTypes"

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
              <Box sx={{ display: "flex", "justify-content": "center" }}>
                <Banner
                  sx={{ maxWidth: "1248px", margin: "2em 2em .5em 2em" }}
                  heading="New Service Announcement"
                  content={
                    <>
                      We are currently experiencing problems with Research
                      Catalog accounts and search results. Until the issue is
                      resolved, you can view and manage your holds and checkouts
                      in the{" "}
                      <ExternalLink href="https://legacycatalog.nypl.org/patroninfo">
                        Legacy Catalog
                      </ExternalLink>
                    </>
                  }
                />
              </Box>
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
