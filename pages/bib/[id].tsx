import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { PATHS, SITE_NAME } from "../../src/config/constants"
import { fetchBib } from "../api/bib"

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

export async function getServerSideProps({ params }) {
  const { id } = params

  const { bib, annotatedMarc, status, redirectUrl } = await fetchBib({ id })

  switch (status) {
    case 301:
      return {
        redirect: {
          destination: redirectUrl || PATHS["404"],
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
          bib: JSON.parse(JSON.stringify(bib)),
          annotatedMarc: JSON.parse(JSON.stringify(annotatedMarc)),
        },
      }
  }
}
