import RCHead from "../../../src/components/Head/RCHead"
import Layout from "../../../src/components/Layout/Layout"
import { SITE_NAME } from "../../../src/config/constants"

/**
 * The Browse subject headings bib results page is responsible for fetching and displaying bib results
 * filtered by at least one subject heading, as well as displaying and controlling pagination, sort,
 * and other filters.
 */
export default function SubjectHeadingResults() {
  const metadataTitle = `Subject Heading Results | ${SITE_NAME}`

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="sh-results"></Layout>
    </>
  )
}
