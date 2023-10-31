export type locations = string[]

export type selectedFilters = {
  location: string[]
  format: string[]
  status: string[]
}
export interface ItemAggregationOption {
  value: string
  count: number
  label: string
}

export interface ItemAggregation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "@type": string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "@id": string
  id: string
  field: string
  values: ItemAggregationOption[]
}

export type option = { value: string; label: string }

export type ReducedItemAggregation = {
  field: string
  options: ItemAggregationOption[]
  count: number
}
