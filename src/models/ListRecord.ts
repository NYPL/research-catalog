import type { ListRecordResult } from "../types/listTypes"
import { formatMMDDYYYY } from "../utils/dateUtils"

/**
 * The ListRecord class represents a single record in a List and contains the data
 * and getter functions used in search results and in My Account display.
 */
export default class ListRecord {
  uri: string
  addedDate: string
  title: string
  itemCount?: number
  callNumber?: string
  location?: string

  constructor(result?: ListRecordResult, bibData?: any) {
    this.uri = result.uri
    this.addedDate = formatMMDDYYYY(result.addedToListDate)
    this.title = bibData?.titleDisplay?.[0] || bibData?.title?.[0] || null
    this.itemCount = bibData?.numItemsTotal || bibData?.items?.length || 0
    // If bib level info is available:
    this.callNumber =
      bibData?.shelfMark?.[0] || bibData?.callNumber || "Multiple"
    this.location = bibData?.location || "Multiple"
  }
}
