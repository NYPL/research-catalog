import RCHead from "../../src/components/Head/RCHead"
import Layout from "../../src/components/Layout/Layout"
import { SITE_NAME } from "../../src/config/constants"

/**
 * The Browse index page is responsible for fetching and displaying subject headings,
 * as well as displaying and controlling pagination and sort.
 */
export default function BrowseIndex() {
  const metadataTitle = `Browse Research Catalog | ${SITE_NAME}`

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="browse"></Layout>
    </>
  )
}
