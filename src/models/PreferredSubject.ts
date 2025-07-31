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
  termLabel: string
  count: string
  seeAlso?: { label: string; terms: SubjectLink[] }
  narrowerTerms?: { label: string; terms: SubjectLink[] }
  broaderTerms?: { label: string; terms: SubjectLink[] }

  constructor(result?: DiscoverySubjectPreferredResult) {
    this.url = getSubjectURL(result.preferredTerm)
    this.termLabel = result.preferredTerm
    this.count = result.count.toLocaleString()
    this.seeAlso = result.seeAlso?.length && {
      label: "See also",
      terms: this.buildSubjectLinkList(result.seeAlso),
    }
    this.narrowerTerms = result.narrowerTerms?.length && {
      label: "Narrower term",
      terms: this.buildSubjectLinkList(result.narrowerTerms),
    }
    this.broaderTerms = result.broaderTerms?.length && {
      label: "Broader term",
      terms: this.buildSubjectLinkList(result.broaderTerms),
    }
  }

  buildSubjectLinkList(terms: string[]): SubjectLink[] {
    return terms.map((term) => ({
      url: getSubjectURL(term),
      term: term,
    }))
  }
}
