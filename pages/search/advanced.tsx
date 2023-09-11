import Head from "next/head"

import { SITE_NAME } from "../../src/config/constants"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function AdvancedSearch() {
  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>Advanced Search | {SITE_NAME}</title>
      </Head>
      <div>Advanced Search</div>
    </div>
  )
}
