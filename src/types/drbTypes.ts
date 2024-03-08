export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: number
  filter?: DRBFilters
}

export type DRBFilters = string[]

export interface DRBResults {
  data: any
  works?: DRBWork[]
  totalWorks?: number
}

export interface DRBWork {
  title?: string
  uuid?: string
  editions?: Edition[]
  authors?: Author[]
  agents?: Agent[]
}

export interface Edition {
  title: string
  items?: EditionItem[]
}

export interface EditionItem {
  links: EditionLink[]
}

export interface Author {
  name: string
}

export interface Agent {
  name: string
  roles: string[]
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface EditionLink {
  link_id: string | number
  mediaType: string
  url?: string
  download?: string
}
