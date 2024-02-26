import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { PATHS, SITE_NAME } from "../../src/config/constants"
import { fetchBib } from "../api/bib"
import { mapQueryToBibParams } from "../../src/utils/bibUtils"
import BibDetailsModel from "../../src/models/BibDetails"
import BibDetails from "../../src/components/BibPage/BibDetail"
import type { Bib } from "../../src/types/bibTypes"
import type { AnnotatedMarc } from "../../src/types/bibDetailsTypes"
import initializePatronTokenAuth from "../../src/server/auth"
import { publicationsForIssns } from "../api/ebsco"
import EbscoLinks from "../../src/components/SearchResult/EbscoLinks"

interface BibPropsType {
  bib: Bib
  annotatedMarc: AnnotatedMarc
  isAuthenticated?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function Bib({
  bib,
  annotatedMarc,
  isAuthenticated,
}: BibPropsType) {
  const metadataTitle = `Item Details | ${SITE_NAME}`
  const { topDetails, bottomDetails, holdingsDetails } = new BibDetailsModel(
    bib,
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
        <Heading level="h1">{bib.title[0]}</Heading>
        <BibDetails key="top-details" details={topDetails} />
        {bib.ebscoResults && <EbscoLinks bib={bib} showSearchInside={true} />}
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
  const { bib, annotatedMarc, status, redirectUrl } = await fetchBib(
    id,
    bibParams
  )
  const patronTokenResponse = await initializePatronTokenAuth(req)
  const isAuthenticated = patronTokenResponse.isTokenValid

  const issns = bib.idIssn
  if (issns?.length) {
    const publications = await publicationsForIssns(issns)

    if (publications !== null) {
      bib.ebscoResults = Object.values(publications).flat()
    }
  }

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
          bib,
          annotatedMarc,
          isAuthenticated,
        },
      }
  }
}
