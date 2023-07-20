import type { ReactElement } from "react"
import styles from "@/styles/components/Layout.module.scss"
import {
  TemplateAppContainer,
  Breadcrumbs,
  DSProvider,
  Heading,
} from "@nypl/design-system-react-components"
import SubNav from "@/components/SubNav/SubNav"
import Search from "@/components/Search/Search"
import type { RCPage } from "@/config/types"

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

  return (
    <DSProvider>
      <TemplateAppContainer
        breakout={
          <>
            <Breadcrumbs
              breadcrumbsType="research"
              breadcrumbsData={[
                { url: "https://nypl.org", text: "Home" },
                { url: "https://www.nypl.org/research", text: "Research" },
                {
                  url: "https://www.nypl.org/research/research-catalog",
                  text: "Research Catalog",
                },
              ]}
            />
            <div className={styles.researchHeadingContainer}>
              <Heading id="heading-h1" level="one" text="Research Catalog" />
              <SubNav activePage={activePage} />
              {showSearch && <Search />}
            </div>
          </>
        }
        contentPrimary={children}
      />
    </DSProvider>
  )
}

export default Layout
