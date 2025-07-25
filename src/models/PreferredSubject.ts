import type {
  DiscoverySubjectPreferredResult,
  SubjectLink,
} from "../types/browseTypes"
import { getSubjectURL } from "../utils/browseUtils"

/**
 * The PreferredSubject class represents an authorized subject heading,
 * the number of bibs with this subject in the index, and its
 * related subjects.
 */

export default class PreferredSubject {
  url: string
  preferredTerm: string
  count: string
  seeAlso?: SubjectLink[]
  narrowerTerms?: SubjectLink[]
  broaderTerms?: SubjectLink[]

  constructor(result?: DiscoverySubjectPreferredResult) {
    this.url = getSubjectURL(result.preferredTerm)
    this.preferredTerm = result.preferredTerm
    this.count = result.count.toString()
    this.seeAlso =
      result.seeAlso?.length && this.buildSubjectLinkList(result.seeAlso)
    this.narrowerTerms =
      result.narrowerTerms?.length &&
      this.buildSubjectLinkList(result.narrowerTerms)
    this.broaderTerms =
      result.broaderTerms?.length &&
      this.buildSubjectLinkList(result.broaderTerms)
  }

  buildSubjectLinkList(terms: string[]): SubjectLink[] {
    return terms.map((term) => ({
      url: getSubjectURL(term),
      term: term,
    }))
  }
}
