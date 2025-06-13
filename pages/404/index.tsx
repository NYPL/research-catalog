import { Heading } from "@nypl/design-system-react-components"

import { appConfig } from "../../src/config/config"
import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import { SITE_NAME } from "../../src/config/constants"
import ExternalLink from "../../src/components/Links/ExternalLink/ExternalLink"
import RCHead from "../../src/components/Head/RCHead"
import type { RCPage } from "../../src/types/pageTypes"

type ErrorPageProps = {
  activePage: RCPage
}

export default function Custom404({ activePage }: ErrorPageProps) {
  const metadataTitle = `404 | ${SITE_NAME}`
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage={activePage}>
        <Heading level="h1">404 Not Found</Heading>
        <p>We&apos;re sorry...</p>
        <p>The page you were looking for doesn&apos;t exist.</p>
        <p>
          Search the <RCLink>Research Catalog</RCLink> or our{" "}
          <ExternalLink href={appConfig.urls.legacyCatalog}>
            Legacy Catalog
          </ExternalLink>{" "}
          for research materials.
        </p>
      </Layout>
    </>
  )
}
