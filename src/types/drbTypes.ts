export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: string
  filter?: DRBFilters
}

export type DRBFilters = string[]
