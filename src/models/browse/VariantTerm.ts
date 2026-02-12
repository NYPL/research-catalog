import type {
  BrowseType,
  DiscoveryVariantResult,
  TermLink,
} from "../../types/browseTypes"
import { buildTermLinks } from "../../utils/browseUtils"

/**
 * The VariantTerm class represents an alternate term that points to
 * an authorized author/contributor or subject heading browse term
 * (represented as a PreferredContributor or a PreferredSubject). VariantTerms
 * and preferred terms are displayed together on the browse index page.
 */
export default class VariantTerm {
  termLabel: string
  preferredTerms: TermLink[]

  constructor(result: DiscoveryVariantResult, browseType: BrowseType) {
    this.termLabel = result.termLabel
    this.preferredTerms = buildTermLinks(browseType, result.preferredTerms)
  }
}
