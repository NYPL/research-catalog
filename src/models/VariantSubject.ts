import type {
  DiscoveryPreferredTermResult,
  DiscoverySubjectVariantResult,
  PreferredTerm,
} from "../types/browseTypes"
import { getSubjectURL } from "./PreferredSubject"

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
    return terms.map((termObj) => {
      const [term, count] = Object.entries(termObj)[0]
      return {
        term,
        url: getSubjectURL(term),
        count: count.toString(),
      }
    })
  }
}
