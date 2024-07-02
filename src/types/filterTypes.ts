export type Locations = string[]

export type CollapsedMultiValueAppliedFilters = Record<string, string[]>

export type AppliedItemFilters = {
  location: string[]
  format: string[]
  status: string[]
}

export interface AggregationOption {
  value: string
  count: number
  label: string
}

/* eslint-disable @typescript-eslint/naming-convention */
export type ItemFilterQueryParams = {
  item_location?: string
  item_format?: string
  item_status?: string
}

export interface Aggregation {
  "@type": string
  "@id": string
  id: string
  field: string
  values: AggregationOption[]
}

export type Option = {
  value: string
  label: string
  count?: number
  field?: string
}

export type ReducedAggregation = {
  field: string
  options: AggregationOption[]
  count: number
}
