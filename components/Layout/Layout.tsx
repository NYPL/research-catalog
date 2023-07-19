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

interface LayoutProps {
  showSearch?: boolean
  children: ReactElement
}

/**
 * The Layout component wraps the TemplateAppContainer from the DS and
 * controls the rendering of Research Catalog header components per-page.
 */
const Layout = ({ children, showSearch = false }: LayoutProps) => {
  return (
    <DSProvider>
      <TemplateAppContainer
        breakout={
          <>
            <Breadcrumbs
              breadcrumbsType="research"
              breadcrumbsData={[
                { url: "#", text: "Home" },
                { url: "#", text: "Research" },
                { url: "#", text: "Research Catalog" },
              ]}
            />
            <div className={styles.researchHeadingContainer}>
              <Heading id="heading-h1" level="one" text="Research Catalog" />
              <SubNav />
              {showSearch && <Search />}
            </div>
          </>
        }
        contentPrimary={children}
      >
    </DSProvider>
  )
}

export default Layout
