import styles from "../styles/components/App.module.scss"
import "@nypl/design-system-react-components/dist/styles.css";
import {
  Breadcrumbs,
  DSProvider,
  Heading
} from "@nypl/design-system-react-components";

const Layout = ({children}) => {
  return (
    <DSProvider>
      <Breadcrumbs breadcrumbsType="research" breadcrumbsData={[
        {url: "#", text: "Home"},
        {url: "#", text: "Research"},
        {url: "#", text: "Research Catalog"},
      ]}/>

      <header className={styles.researchHeadingContainer}>
        <Heading id="heading-h1" level="one" text="Research Catalog" />
      </header>
      <div className={styles.maxWidthContainer}>
        {children}
      </div>
    </DSProvider>
  )
}

export default Layout;