import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { PATHS, SITE_NAME } from "../../src/config/constants"
import { fetchBib } from "../api/bib"
import { mapQueryToBibParams } from "../../src/utils/bibUtils"

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function Bib({ bib, annotatedMarc }) {
  return (
    <>
      <Head>
        <title>Item Details | {SITE_NAME}</title>
      </Head>
      <Layout activePage="bib">
        <Heading level="h1">{bib.title[0]}</Heading>
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
