import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import RCLink from "../../src/components/RCLink/RCLink"
import {
  CIRCULATING_CATALOG_URL,
  LEGACY_CATALOG_URL,
} from "../../src/config/constants"

export default function Redirect404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Layout activePage="404">
        <>
          <Heading level="one">We&apos;re sorry...</Heading>
          <p>
            You&apos;ve followed an out-of-date link to our research catalog.
          </p>
          <p>
            You may be able to find what you&apos;re looking for in the{" "}
            <RCLink href="/">Research Catalog</RCLink> or the{" "}
            <RCLink href={CIRCULATING_CATALOG_URL}>Circulating Catalog</RCLink>.
            for research materials.
          </p>
          <p>
            You can also try the{" "}
            <RCLink href={LEGACY_CATALOG_URL}>Legacy Catalog</RCLink>
          </p>
        </>
      </Layout>
    </>
  )
}
