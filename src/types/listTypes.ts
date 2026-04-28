import type { HTTPStatusCode } from "./appTypes"

export interface ListErrorResponse {
  statusCode: HTTPStatusCode
  name: string
  error: string
}

export interface ListResult {
  id: number
  listName: string
  patronId: string
  records: ListRecordResult[]
  description: string | null
  createdDate: string
  modifiedDate: string
}

export interface ListRecordResult {
  uri: string
  addedToListDate: string
  description: string
}
