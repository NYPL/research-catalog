import RCHead from "../../../src/components/Head/RCHead"
import Layout from "../../../src/components/Layout/Layout"
import { SITE_NAME } from "../../../src/config/constants"

/**
 * The Browse subject headings index page is responsible for fetching and displaying subject headings,
 * as well as displaying and controlling pagination and sort.
 */
export default function SubjectHeadingIndex() {
  const metadataTitle = `Subject Headings | ${SITE_NAME}`

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="sh-index"></Layout>
    </>
  )
}
