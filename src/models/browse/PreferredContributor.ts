import type {
  TermLink,
  ContributorRole,
  DiscoveryPreferredContributorResult,
} from "../../types/browseTypes"
import {
  buildTermLinks,
  getContributorRoleSearchURL,
  getContributorSearchURL,
} from "../../utils/browseUtils"

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
  seeAlso?: { label: string; terms: TermLink[] }
  earlierHeadings?: { label: string; terms: TermLink[] }
  laterHeadings?: { label: string; terms: TermLink[] }

  constructor(result?: DiscoveryPreferredContributorResult) {
    this.url = getContributorSearchURL(result.termLabel)
    this.termLabel = result.termLabel
    this.roles = result.roleCounts?.length && this.buildRoles(result.roleCounts)
    this.count = result.count?.toLocaleString() || ""
    this.seeAlso = result.seeAlso?.length && {
      label: "See also",
      terms: buildTermLinks("contributors", result.seeAlso),
    }
    this.earlierHeadings = result.earlierHeadings?.length && {
      label: "Earlier heading",
      terms: buildTermLinks("contributors", result.earlierHeadings),
    }
    this.laterHeadings = result.laterHeadings?.length && {
      label: "Later heading",
      terms: buildTermLinks("contributors", result.laterHeadings),
    }
  }

  buildRoles(roleCounts): ContributorRole[] {
    return roleCounts.map((role) => ({
      roleLabel: role.role,
      url: getContributorRoleSearchURL(this.termLabel, role.role),
      count: role.count,
    }))
  }
}
