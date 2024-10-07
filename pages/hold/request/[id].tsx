import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import { SITE_NAME } from "../../../src/config/constants"

import initializePatronTokenAuth from "../../../src/server/auth"

interface BibPropsType {
  bibId?: string
  itemId?: string
  isAuthenticated?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  bibId,
  itemId,
  isAuthenticated,
}: BibPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`
  console.log("bibId", bibId)
  console.log("itemId", itemId)

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
      <Layout isAuthenticated={isAuthenticated} activePage="bib">
        <Heading level="h2" size="heading3" mb="l">
          Request for on-site use
        </Heading>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, req }) {
  const { id } = params
  const [bibId, itemId] = id.split("-")
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  return {
    props: { bibId, itemId, isAuthenticated },
  }
}
