import type {
  DiscoverySubjectPreferredResult,
  SubjectLink,
} from "../types/browseTypes"

export default class PreferredSubject {
  url: string
  preferredTerm: string
  count: string
  //seeAlso: SubjectLink[]
  narrowerTerms: SubjectLink[]
  broaderTerms: SubjectLink[]

  constructor(result?: DiscoverySubjectPreferredResult) {
    this.url = getSubjectURL(result.preferredTerm)
    this.preferredTerm = result.preferredTerm
    this.count = result.count.toString()
    // this.seeAlso =
    //   result.seeAlso.length && this.buildSubjectLinkList(result.seeAlso)
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

export function getSubjectURL(term: string) {
  const subject = encodeURIComponent(term).replace(/%2D%2D/g, "--")
  return `/browse/subjects/${subject}`
}
