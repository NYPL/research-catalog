export type Locations = string[]

export type CollapsedMultiValueAppliedFilters = Record<string, string[]>

export interface FilterCheckboxGroup {
  id: string
  name: string
  items?: FilterCheckbox[]
}

export type FilterCheckbox = { id: string; name: string }

export type AppliedItemFilters = {
  location: string[]
  status: string[]
  year: string[]
}

export interface AggregationOption {
  value: string
  count: number
  label: string
}

/* eslint-disable @typescript-eslint/naming-convention */
export type ItemFilterQueryParams = {
  item_location?: string
  item_status?: string
  item_date?: string
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
  label: string | JSX.Element
  count?: number
  field?: string
}

export type ReducedAggregation = {
  field: string
  options: AggregationOption[]
  count: number
}
