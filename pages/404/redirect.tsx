import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import { appConfig } from "../../src/config/config"
import { BASE_URL } from "../../src/config/constants"
import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/RCLink/RCLink"

export default function Redirect404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Layout activePage="404">
        <Heading level="h1">We&apos;re sorry...</Heading>
        <p>You&apos;ve followed an out-of-date link to our research catalog.</p>
        <p>
          You may be able to find what you&apos;re looking for in the{" "}
          <RCLink href={BASE_URL}>Research Catalog</RCLink> or the{" "}
          <RCLink href={appConfig.externalUrls.circulatingCatalog}>
            Circulating Catalog
          </RCLink>
          . for research materials.
        </p>
        <p>
          You can also try the{" "}
          <RCLink href={appConfig.externalUrls.legacyCatalog}>
            Legacy Catalog
          </RCLink>
        </p>
      </Layout>
    </>
  )
}
