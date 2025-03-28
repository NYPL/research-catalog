import { Heading } from "@nypl/design-system-react-components"

import { appConfig } from "../../src/config/config"
import { SITE_NAME } from "../../src/config/constants"
import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import ExternalLink from "../../src/components/Links/ExternalLink/ExternalLink"
import RCHead from "../../src/components/Head/RCHead"

export default function Redirect404() {
  const metadataTitle = `404 Redirect | ${SITE_NAME}`
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="404">
        <Heading level="h1">We&apos;re sorry...</Heading>
        <p>You&apos;ve followed an out-of-date link to our research catalog.</p>
        <p>
          You may be able to find what you&apos;re looking for in the{" "}
          <RCLink>Research Catalog</RCLink> or the{" "}
          <ExternalLink href={appConfig.urls.circulatingCatalog}>
            Circulating Catalog
          </ExternalLink>
          . for research materials.
        </p>
        <p>
          You can also try the{" "}
          <ExternalLink href={appConfig.urls.legacyCatalog}>
            Legacy Catalog
          </ExternalLink>
        </p>
      </Layout>
    </>
  )
}
