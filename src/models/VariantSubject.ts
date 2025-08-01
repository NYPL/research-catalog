import type {
  DiscoveryPreferredTermResult,
  DiscoverySubjectVariantResult,
  PreferredTerm,
} from "../types/browseTypes"
import { getSubjectURL } from "../utils/browseUtils"

/**
 * The VariantSubject class represents an alternate term that points to
 * an authorized subject heading (represented as a PreferredSubject). VariantSubjects
 * and PreferredSubjects are displayed together on the browse index page.
 */
export default class VariantSubject {
  termLabel: string
  preferredTerms: PreferredTerm[]
  countDisplay: string

  constructor(result?: DiscoverySubjectVariantResult) {
    this.termLabel = result.variantTerm
    this.preferredTerms = this.buildPreferredTermList(result.preferredTerms)
    this.countDisplay = ""
  }

  buildPreferredTermList(
    terms: DiscoveryPreferredTermResult[]
  ): PreferredTerm[] {
    const preferredTerms: PreferredTerm[] = []
    for (const termObj of terms) {
      const [term, count] = Object.entries(termObj)[0]
      preferredTerms.push({
        termLabel: term,
        url: getSubjectURL(term),
        count: count.toLocaleString(),
      })
    }
    return preferredTerms
  }
}
