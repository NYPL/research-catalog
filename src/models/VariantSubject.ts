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
  variantTerm: string
  preferredTerms: PreferredTerm[]

  constructor(result?: DiscoverySubjectVariantResult) {
    this.variantTerm = result.variantTerm
    this.preferredTerms = this.buildPreferredTermList(result.preferredTerms)
  }

  buildPreferredTermList(
    terms: DiscoveryPreferredTermResult[]
  ): PreferredTerm[] {
    const preferredTerms: PreferredTerm[] = []
    for (const termObj of terms) {
      const [term, count] = Object.entries(termObj)[0]
      preferredTerms.push({
        preferredTerm: term,
        url: getSubjectURL(term),
        count: count.toLocaleString(),
      })
    }
    return preferredTerms
  }
}
