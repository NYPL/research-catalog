import type {
  DiscoveryPreferredSubjectResult,
  SubjectLink,
} from "../types/browseTypes"
import { buildSubjectLinks, getSubjectSearchURL } from "../utils/browseUtils"

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

  constructor(result?: DiscoveryPreferredSubjectResult) {
    this.url = getSubjectSearchURL(result.termLabel)
    this.termLabel = result.termLabel
    this.count = result.count?.toLocaleString()
    this.seeAlso = result.seeAlso?.length && {
      label: "See also",
      terms: buildSubjectLinks(result.seeAlso),
    }
    this.narrowerTerms = result.narrowerTerms?.length && {
      label: "Narrower term",
      terms: buildSubjectLinks(result.narrowerTerms),
    }
    this.broaderTerms = result.broaderTerms?.length && {
      label: "Broader term",
      terms: buildSubjectLinks(result.broaderTerms),
    }
  }
}
