import Head from "next/head"
import { useRouter } from "next/router"
import { capitalize } from "lodash"

import Layout from "../../src/components/Layout/Layout"

import { SITE_NAME } from "../../src/config/constants"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search() {
  const metadataTitle = `Subject Headings Dynamic Routes POC | ${SITE_NAME}`
  const router = useRouter()

  return (
    <>
      <Head>
        <meta property="og:title" content={metadataTitle} key="og-title" />
        <meta
          property="og:site_name"
          content={metadataTitle}
          key="og-site-name"
        />
        e
        <meta name="twitter:title" content={metadataTitle} key="tw-title" />
        <title key="main-title">{metadataTitle}</title>
      </Head>
      <Layout activePage="search">
        <p>Subjects array: {JSON.stringify(router.query.slug)}</p>
        <p>Number of subjects: {router.query.slug.length}</p>
        <p>
          Concatenated subject:{" "}
          {Array.isArray(router.query.slug) &&
            router.query.slug
              .map((subject) => capitalize(subject))
              .join(" -- ")}
        </p>
      </Layout>
    </>
  )
}

/**
 * resolvedUrl is the original URL of the search page including the search query parameters.
 * It is provided by Next.js as an attribute of the context object that is passed to getServerSideProps.
 *
 * Here it is used to construct a SearchParams object from the parsed query parameters in order to fetch the
 * relevant search results on the server side (via fetchResults).
 *
 */
export async function getServerSideProps() {
  return {
    props: {},
  }
}
