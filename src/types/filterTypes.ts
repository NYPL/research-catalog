export type Locations = string[]

export type AppliedFilters = {
  location: string[]
  format: string[]
  status: string[]
}
export interface AggregationOption {
  value: string
  count: number
  label: string
}

export interface Aggregation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "@type": string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "@id": string
  id: string
  field: string
  values: AggregationOption[]
}

export type Option = { value: string; label: string; count?: number }

export type ReducedAggregation = {
  field: string
  options: AggregationOption[]
  count: number
}
