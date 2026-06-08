import type {
  DiscoveryPreferredSubjectResult,
  TermLink,
} from "../../types/browseTypes"
import { buildTermLinks, getSubjectSearchURL } from "../../utils/browseUtils"

/**
 * The PreferredSubject class represents an authorized subject heading,
 * the number of bibs with this subject in the index, and its
 * related subjects.
 */

export default class PreferredSubject {
  url: string
  termLabel: string
  count: string
  seeAlso?: { label: string; terms: TermLink[] }
  narrowerTerms?: { label: string; terms: TermLink[] }
  broaderTerms?: { label: string; terms: TermLink[] }

  constructor(result?: DiscoveryPreferredSubjectResult) {
    this.url = getSubjectSearchURL(result.termLabel)
    this.termLabel = result.termLabel
    this.count = result.count?.toLocaleString()
    this.seeAlso = result.seeAlso?.length && {
      label: "See also",
      terms: buildTermLinks("subjects", result.seeAlso),
    }
    this.narrowerTerms = result.narrowerTerms?.length && {
      label: "Narrower term",
      terms: buildTermLinks("subjects", result.narrowerTerms),
    }
    this.broaderTerms = result.broaderTerms?.length && {
      label: "Broader term",
      terms: buildTermLinks("subjects", result.broaderTerms),
    }
  }
}
