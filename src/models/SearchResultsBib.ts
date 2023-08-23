import type { SearchResult } from "../types/searchTypes"

export default class SearchResultsBib {
  id: string
  title: string

  constructor(result: SearchResult) {
    this.id = result["@id"]
    this.title = result.titleDisplay[0]
  }
}
