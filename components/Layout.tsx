import Script from "next/script";
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
      {/* NYPL Header script and container */}
      <Script strategy="lazyOnload"
              src={`${process.env.NEXT_PUBLIC_NYPL_HEADER_URL}/header.min.js?containerId=nypl-header`}/>
      <div id="nypl-header" className={styles.nyplHeader}></div>

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

      {/* NYPL Footer script and container */}
      <Script strategy="lazyOnload"
              src={`${process.env.NEXT_PUBLIC_NYPL_HEADER_URL}/footer.min.js?containerId=nypl-footer`}/>
      <div id="nypl-footer"></div>
    </DSProvider>
  )
}

export default Layout;