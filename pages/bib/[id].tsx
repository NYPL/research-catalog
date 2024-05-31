import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { PATHS, SITE_NAME } from "../../src/config/constants"
import { fetchBib } from "../../src/server/api/bib"
import { mapQueryToBibParams } from "../../src/utils/bibUtils"
import BibDetailsModel from "../../src/models/BibDetails"
import BibDetails from "../../src/components/BibPage/BibDetail"
import ItemTable from "../../src/components/ItemTable/ItemTable"
import type { BibResult } from "../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../src/types/bibDetailsTypes"
import Bib from "../../src/models/Bib"
import initializePatronTokenAuth from "../../src/server/auth"

interface BibPropsType {
  bibResult: BibResult
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  bibResult,
  annotatedMarc,
  isAuthenticated,
}: BibPropsType) {
  const metadataTitle = `Item Details | ${SITE_NAME}`
  const bib = new Bib(bibResult)
  const { topDetails, bottomDetails, holdingsDetails } = new BibDetailsModel(
    bibResult,
    annotatedMarc
  )

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
        <Heading level="h2">{bib.title}</Heading>
        <BibDetails key="top-details" details={topDetails} />
        {bib.itemTableData ? (
          <ItemTable itemTableData={bib.itemTableData} />
        ) : null}
        <BibDetails
          heading="Details"
          key="bottom-details"
          details={bottomDetails}
        />
        <BibDetails
          heading="Holdings"
          key="holdings-details"
          details={holdingsDetails}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, resolvedUrl, req }) {
  const { id } = params
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const bibParams = mapQueryToBibParams(queryString)
  const { bibResult, annotatedMarc, status, redirectUrl } = await fetchBib(
    id,
    bibParams
  )
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  switch (status) {
    case 307:
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false,
        },
      }
    case 404:
      return {
        redirect: {
          destination: PATHS["404"],
          permanent: false,
        },
      }
    default:
      return {
        props: {
          bibResult,
          annotatedMarc,
          isAuthenticated,
        },
      }
  }
}
