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
  recordCount: number
  description: string | null
  createdDate: string
  modifiedDate: string

  constructor(result: ListResult, bibDataMap: Record<string, any> = {}) {
    this.id = result.id.toString()
    this.listName = result.listName
    this.description = result.description
    this.patronId = result.patronId
    this.records = this.buildRecordsFromListResult(result, bibDataMap)
    this.recordCount = this.records.length || 0
    this.createdDate = formatMMDDYYYY(result.createdDate)
    this.modifiedDate = formatMMDDYYYY(result.modifiedDate)
  }

  buildRecordsFromListResult(
    result: ListResult,
    bibDataMap: Record<string, any>
  ): ListRecord[] {
    return result?.records?.length
      ? result.records.map(
          (record) => new ListRecord(record, bibDataMap[record.uri])
        )
      : []
  }
}
