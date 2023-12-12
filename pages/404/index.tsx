import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import { appConfig } from "../../src/config/config"
import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/RCLink/RCLink"

import Barcode from "react-barcode"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Layout activePage="404">
        <Heading level="h1">404 Not Found</Heading>
        <Barcode value="23333121538324" format="codabar" />
        <p>We&apos;re sorry...</p>
        <p>The page you were looking for doesn&apos;t exist.</p>
        <p>
          Search the <RCLink href="/">Research Catalog</RCLink> or our{" "}
          <RCLink href={appConfig.externalUrls.legacyCatalog}>
            Legacy Catalog
          </RCLink>{" "}
          for research materials.
        </p>
      </Layout>
    </>
  )
}
