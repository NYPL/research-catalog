import type { ReactElement } from 'react'
import styles from '@/styles/components/Layout.module.scss'
import '@nypl/design-system-react-components/dist/styles.css'
import {
  TemplateAppContainer,
  Breadcrumbs,
  DSProvider,
  Heading,
} from '@nypl/design-system-react-components'
import SubNav from '@/components/SubNav/SubNav'
import Search from '@/components/SearchForm/Search'

interface LayoutProps {
  showSearch?: boolean
  children: ReactElement
}

const Layout = ({ children, showSearch = true }: LayoutProps) => {
  return (
    <DSProvider>
      <TemplateAppContainer
        aboveHeader={
          <Breadcrumbs
            breadcrumbsType="research"
            breadcrumbsData={[
              { url: '#', text: 'Home' },
              { url: '#', text: 'Research' },
              { url: '#', text: 'Research Catalog' },
            ]}
          />
        }
        header={
          <div className={styles.researchHeadingContainer}>
            <Heading id="heading-h1" level="one" text="Research Catalog" />
            <SubNav />
            {showSearch && <Search />}
          </div>
        }
        contentPrimary={children}
      ></TemplateAppContainer>
    </DSProvider>
  )
}

export default Layout
