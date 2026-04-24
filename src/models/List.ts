import type { ListResult } from "../types/listTypes"
import { formatMMDDYYYY } from "../utils/dateUtils"
import ListRecord from "../models/ListRecord"

/**
 * The List class represents a single List entity and contains the data
 * and getter functions used in search results and in My Account display.
 */
export default class List {
  id: string
  listName: string
  patronId: string
  records: ListRecord[]
  description: string | null
  createdDate: string
  modifiedDate: string

  constructor(result?: ListResult) {
    this.id = result.id.toString()
    this.listName = result.listName
    this.description = result.description
    this.patronId = result.patronId
    this.records = this.getRecordsFromListResult(result)
    this.createdDate = formatMMDDYYYY(result.createdDate)
    this.modifiedDate = formatMMDDYYYY(result.modifiedDate)
  }

  getRecordsFromListResult(result: ListResult): ListRecord[] {
    return result?.records?.length
      ? result.records.map((record) => new ListRecord(record))
      : []
  }
}
