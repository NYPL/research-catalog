import { type ReactElement } from "react"
import {
  TemplateAppContainer,
  Breadcrumbs,
  DSProvider,
  Heading,
} from "@nypl/design-system-react-components"

import { type RCPage } from "../../types/pageTypes"
import styles from "../../../styles/components/Layout.module.scss"
import SubNav from "../SubNav/SubNav"
import SearchForm from "../SearchForm/SearchForm"
import { BASE_URL } from "../../config/constants"

interface LayoutProps {
  activePage?: RCPage
  children: ReactElement
}

/**
 * The Layout component wraps the TemplateAppContainer from the DS and
 * controls the rendering of Research Catalog header components per-page.
 */
const Layout = ({ children, activePage }: LayoutProps) => {
  const showSearch = activePage === "search"
  const showHeader = activePage !== "404"

  return (
    <DSProvider>
      <TemplateAppContainer
        breakout={
          showHeader && (
            <>
              <Breadcrumbs
                breadcrumbsType="research"
                breadcrumbsData={[
                  { url: "https://nypl.org", text: "Home" },
                  { url: "https://www.nypl.org/research", text: "Research" },
                  {
                    url: `https://www.nypl.org${BASE_URL}`,
                    text: "Research Catalog",
                  },
                ]}
              />
              <div className={styles.researchHeadingContainer}>
                <Heading id="heading-h1" level="one" text="Research Catalog" />
                ad
                <SubNav activePage={activePage} />
                {showSearch && <SearchForm />}
              </div>
            </>
          )
        }
        contentPrimary={children}
      />
    </DSProvider>
  )
}

export default Layout
