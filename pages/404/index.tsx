import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/RCLink/RCLink"
import { LEGACY_CATALOG_URL } from "../../src/config/constants"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Layout activePage="404">
        <>
          <Heading level="one">404 Not Found</Heading>
          <p>We&apos;re sorry...</p>
          <p>The page you were looking for doesn&apos;t exist.</p>
          <p>
            Search the <RCLink href="/">Research Catalog</RCLink> or our{" "}
            <RCLink href={LEGACY_CATALOG_URL}>Legacy Catalog</RCLink> for
            research materials.
          </p>
        </>
      </Layout>
    </>
  )
}
