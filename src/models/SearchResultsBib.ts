import type { SearchResult } from "../types/searchTypes"
import type { ElectronicResource } from "../types/bibTypes"

export default class SearchResultsBib {
  id: string
  title: string
  yearPublished?: string
  materialType?: string
  publicationStatement?: string
  electronicResources?: ElectronicResource[]
  numPhysicalItems: number

  constructor(result: SearchResult) {
    this.id = result["@id"] ? result["@id"].substring(4) : ""
    this.title = this.getTitleFromResult(result)
    this.yearPublished = this.getYearFromResult(result)
    this.materialType = result.materialType[0]?.prefLabel || null
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
    this.electronicResources = result.electronicResources || null
    this.numPhysicalItems = result.numItemsTotal || 0
  }

  get url() {
    return `/bib/${this.id}`
  }

  get numElectronicResources() {
    return this.electronicResources?.length || 0
  }

  get hasPhysicalItems() {
    return this.numPhysicalItems > 0
  }

  get numItems() {
    return this.hasPhysicalItems
      ? this.numPhysicalItems
      : this.numElectronicResources
  }

  get resourceType() {
    return this.hasPhysicalItems ? "Item" : "Resource"
  }

  get itemMessage() {
    return `${this.numItems} ${this.resourceType}${
      this.numItems !== 1 ? "s" : ""
    }`
  }

  getTitleFromResult(result: SearchResult) {
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

  getYearFromResult(result: SearchResult) {
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
