import type { PropsWithChildren } from "react"
import {
  Flex,
  Breadcrumbs,
  DSProvider,
  Heading,
  Banner,
  TemplateBreakout,
  Template,
  TemplateContent,
  TemplateMain,
  Hero,
} from "@nypl/design-system-react-components"
import { type RCPage } from "../../types/pageTypes"
import styles from "../../../styles/components/Layout.module.scss"
import SearchForm from "../SearchForm/SearchForm"
import { BASE_URL } from "../../config/constants"
import FeedbackForm from "../FeedbackForm/FeedbackForm"
import type { Aggregation } from "../../types/filterTypes"
import EDSBanner from "../EDSBanner"
import RCSubNav from "../RCSubNav/RCSubNav"

interface LayoutProps {
  activePage?: RCPage
  isAuthenticated?: boolean
  searchAggregations?: Aggregation[]
  searchResultsCount?: number
  bannerNotification?: string
}

/**
 * The Layout component wraps the Template from the DS and
 * controls the rendering of Research Catalog header components per-page.
 */
const Layout = ({
  searchAggregations,
  children,
  isAuthenticated,
  activePage,
  searchResultsCount,
  bannerNotification,
}: PropsWithChildren<LayoutProps>) => {
  const showSearch = activePage === "search"
  const showNotification = activePage === "" || activePage === "search"
  return (
    <DSProvider>
      <Template variant="full">
        <TemplateBreakout>
          <>
            <Breadcrumbs
              data-testid="layout-breadcrumbs"
              variant="research"
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

            <Hero
              backgroundColor="section.research.primary"
              variant="tertiary"
              foregroundColor="ui.white"
              heading={
                <Heading
                  id="heading-h1"
                  level="h1"
                  text="Research Catalog"
                  py={{ base: "m", xl: "unset" }}
                />
              }
            />
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

            {showSearch && (
              <Flex
                gap="s"
                align="center"
                direction="column"
                sx={{
                  px: { base: "s", md: "m", xl: "s" },
                  pt: "l",
                  pb: "xs",
                }}
              >
                <EDSBanner />
                {showNotification && bannerNotification && (
                  <Banner
                    className={`${styles.banner} no-print`}
                    heading="Service Announcement"
                    content={bannerNotification}
                  />
                )}
              </Flex>
            )}
          </>
        </TemplateBreakout>
        <TemplateMain>
          <TemplateContent pb="l">
            {children}
            <FeedbackForm />
          </TemplateContent>
        </TemplateMain>
      </Template>
    </DSProvider>
  )
}

export default Layout
