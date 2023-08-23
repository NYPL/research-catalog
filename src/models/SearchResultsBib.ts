import type { SearchResult } from "../types/searchTypes"

export default class SearchResultsBib {
  id: string
  title: string

  constructor(result: SearchResult) {
    this.id = result["@id"]
    this.title = this.getBibTitle(result)
  }

  getBibTitle(result: SearchResult) {
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
}
