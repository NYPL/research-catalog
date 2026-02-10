import type {
  DiscoveryVariantContributorResult,
  ContributorLink,
} from "../types/browseTypes"
import { buildContributorLinks } from "../utils/browseUtils"

/**
 * The VariantSubject class represents an alternate term that points to
 * an authorized author/contributor (represented as a PreferredContributor). VariantContributors
 * and PreferredContributors are displayed together on the browse index page.
 */
export default class VariantContributor {
  termLabel: string
  preferredTerms: ContributorLink[]

  constructor(result?: DiscoveryVariantContributorResult) {
    this.termLabel = result.termLabel
    this.preferredTerms = buildContributorLinks(result.preferredTerms)
  }
}
