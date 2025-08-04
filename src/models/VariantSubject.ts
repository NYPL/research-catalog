import type {
  DiscoveryVariantSubjectResult,
  SubjectLink,
} from "../types/browseTypes"
import { buildSubjectLinks } from "../utils/browseUtils"

/**
 * The VariantSubject class represents an alternate term that points to
 * an authorized subject heading (represented as a PreferredSubject). VariantSubjects
 * and PreferredSubjects are displayed together on the browse index page.
 */
export default class VariantSubject {
  termLabel: string
  preferredTerms: SubjectLink[]

  constructor(result?: DiscoveryVariantSubjectResult) {
    this.termLabel = result.termLabel
    this.preferredTerms = buildSubjectLinks(result.preferredTerms)
  }
}
