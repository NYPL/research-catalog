import type {
  ContributorLink,
  ContributorRole,
  DiscoveryPreferredContributorResult,
} from "../types/browseTypes"
import {
  buildContributorLinks,
  getContributorSearchURL,
} from "../utils/browseUtils"

/**
 * The PreferredContributor class represents an author/contributor,
 * the number of bibs with this author/contributor in the index,
 * and its associated roles.
 */

export default class PreferredContributor {
  url: string
  termLabel: string
  count: string
  roles?: ContributorRole[]
  seeAlso?: { label: string; terms: ContributorLink[] }
  earlierHeadings?: { label: string; terms: ContributorLink[] }
  laterHeadings?: { label: string; terms: ContributorLink[] }

  constructor(result?: DiscoveryPreferredContributorResult) {
    this.url = getContributorSearchURL(result.termLabel)
    this.termLabel = result.termLabel
    this.count = result.count.toLocaleString()
    this.seeAlso = result.seeAlso?.length && {
      label: "See Also",
      terms: buildContributorLinks(result.seeAlso),
    }
    this.earlierHeadings = result.earlierHeadings?.length && {
      label: "Earlier Heading",
      terms: buildContributorLinks(result.earlierHeadings),
    }
    this.laterHeadings = result.laterHeadings?.length && {
      label: "Later Heading",
      terms: buildContributorLinks(result.laterHeadings),
    }
  }
}
