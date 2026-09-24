// Same results page as /browse/authors, locked to the contributorNameTitle filter
// instead of contributorLiteral, for links that pass a name + title combination.
import ContributorResults from "../authors/[slug]"
import { getContributorResultsProps } from "../../../src/server/getContributorResultsProps"

export default ContributorResults

export async function getServerSideProps(context) {
  return getContributorResultsProps(context, "contributorNameTitle")
}
