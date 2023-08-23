import type { SearchResult } from "../types/searchTypes"
import { BASE_URL } from "../config/constants"

export default class SearchResultsBib {
  id: string
  title: string
  url: string
  yearPublished?: string
  materialType?: string
  publicationStatement?: string

  constructor(result: SearchResult) {
    this.id = result["@id"] ? result["@id"].substring(4) : ""
    this.title = this.getTitle(result)
    this.url = `${BASE_URL}/bib/${this.id}`
    this.yearPublished = this.getYear(result)
    this.materialType = result.materialType[0]?.prefLabel || null
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
  }

  getTitle(result: SearchResult) {
    if (!result.titleDisplay || !result.titleDisplay.length) {
      const author =
        result.creatorLiteral && result.creatorLiteral.length
          ? ` / ${result.creatorLiteral[0]}`
          : ""
      return result.title && result.title.length
        ? `${result.title[0]}${author}`
        : ""
    }
    return result.titleDisplay[0]
  }

  getYear(result: SearchResult) {
    const { dateStartYear, dateEndYear } = result

    const displayStartYear: string =
      dateStartYear === 999 ? "unknown" : dateStartYear?.toString()
    const displayEndYear: string =
      dateEndYear === 9999 ? "present" : dateEndYear?.toString()

    if (dateStartYear && dateEndYear) {
      return `${displayStartYear}-${displayEndYear}`
    } else if (dateStartYear) {
      return displayStartYear
    }
    return null
  }
}
