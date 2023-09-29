export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: number
  filter?: DRBFilters
}

export type DRBFilters = string[]

export interface Edition {
  title: string
  items?: EditionItem[]
}

export interface EditionItem {
  links?: EditionLink[]
}

type EditionLink = {
  link_id: string
}

export interface DRBWork {
  title?: string
  uuid?: string
  editions?: Edition[]
}

export interface DRBResultsResponse {
  works?: DRBWork[]
  totalWorks?: number
}
