import styles from '../../styles/components/App.module.scss'
import '@nypl/design-system-react-components/dist/styles.css'
import {
  TemplateAppContainer,
  Breadcrumbs,
  DSProvider,
  Heading
} from '@nypl/design-system-react-components'

const Layout = ({ children }) => {
  return (
    <DSProvider>
      <TemplateAppContainer
        aboveHeader={
          <Breadcrumbs breadcrumbsType='research' breadcrumbsData={[
            { url: '#', text: 'Home' },
            { url: '#', text: 'Research' },
            { url: '#', text: 'Research Catalog' }
          ]}
          />
        }
        header={
          <header className={styles.researchHeadingContainer}>
            <Heading id='heading-h1' level='one' text='Research Catalog' />
          </header>
        }
        contentPrimary={children}
      >
      </TemplateAppContainer>
    </DSProvider>
  )
}

export default Layout