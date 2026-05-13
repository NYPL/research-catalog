import type { HTTPStatusCode } from "./appTypes"

export interface ListErrorResponse {
  statusCode: HTTPStatusCode
  name: string
  error: string
}

export interface ListResult {
  id: string
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

export type ListSort =
  | "modified_date_desc"
  | "modified_date_asc"
  | "list_name_asc"
  | "list_name_desc"
  | "created_date_asc"
  | "created_date_desc"
  | "record_count_asc"
  | "record_count_desc"
