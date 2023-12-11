import Head from "next/head"

import Layout from "../../src/components/Layout/Layout"
import { SITE_NAME } from "../../src/config/constants"

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

export async function getServerSideProps() {
  // Remove everything before the query string delineator '?', necessary for correctly parsing the 'q' param.
  // const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  // const results = await fetchResults(mapQueryToSearchParams(parse(queryString)))
  return {
    props: {
      bib: [],
    },
  }
}
