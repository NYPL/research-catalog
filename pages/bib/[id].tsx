import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import { SITE_NAME } from "../../src/config/constants"
import { standardizeBibId } from "../../src/utils/bibUtils"

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function Bib() {
  return (
    <>
      <Head>
        <title>Item Details | {SITE_NAME}</title>
      </Head>
      <Layout activePage="bib">Bib page</Layout>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const standardizedId = standardizeBibId(id)

  if (standardizedId !== id) {
    return {
      redirect: {
        destination: `/bib/${standardizedId}`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      bib: [],
    },
  }
}
