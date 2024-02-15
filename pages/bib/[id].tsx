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

interface BibPropsType {
  bib: Bib
  annotatedMarc: AnnotatedMarc
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function Bib({ bib, annotatedMarc }: BibPropsType) {
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
      <Layout activePage="bib">
        <BibDetails key="top-details" details={topDetails} />
        <Heading level="h1">{bib.title[0]}</Heading>
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

export async function getServerSideProps({ params, resolvedUrl }) {
  const { id } = params
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const bibParams = mapQueryToBibParams(queryString)
  const { bib, annotatedMarc, status, redirectUrl } = await fetchBib(
    id,
    bibParams
  )

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
        },
      }
  }
}
