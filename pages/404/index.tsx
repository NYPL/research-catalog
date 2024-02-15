import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import { appConfig } from "../../src/config/config"
import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/RCLink/RCLink"
import { BASE_URL, SITE_NAME } from "../../src/config/constants"

export default function Custom404() {
  const metadataTitle = `404 | ${SITE_NAME}`
  return (
    <>
      <Head>
        <meta property="og:title" content={metadataTitle} key="og-title" />
        <meta
          property="og:site_name"
          content={metadataTitle}
          key="og-site-name"
        />
        <meta name="twitter:title" content={metadataTitle} key="tw-title" />
        <title key="main-title">{metadataTitle}</title>
      </Head>
      <Layout activePage="404">
        <Heading level="h1">404 Not Found</Heading>
        <p>We&apos;re sorry...</p>
        <p>The page you were looking for doesn&apos;t exist.</p>
        <p>
          Search the <RCLink href={BASE_URL}>Research Catalog</RCLink> or our{" "}
          <RCLink href={appConfig.urls.legacyCatalog}>Legacy Catalog</RCLink>{" "}
          for research materials.
        </p>
      </Layout>
    </>
  )
}
