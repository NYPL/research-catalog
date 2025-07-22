import type { DiscoverySubjectResult } from "../types/browseTypes"

export default class Subject {
  url: string
  preferredTerm: string
  count: number
  variants: string[]
  narrowerTerms: string[]
  broaderTerms: string[]

  constructor(result?: DiscoverySubjectResult) {
    this.url = this.buildSubjectURL(result.preferredTerm)
    this.preferredTerm = result.preferredTerm
  }

  buildSubjectURL(preferredTerm: string) {
    return preferredTerm
  }
}
