import type {
  AggregationOption,
  Aggregation,
  Option,
} from "../types/filterTypes"

class SearchResultsFilters {
  options: AggregationOption[]
  activeFilters: string[]
  field: string
  constructor(aggregationsResults: Aggregation[], field: Option) {
    this.options = aggregationsResults.find((f) => f.id === field.value)?.values
    this.field = field.value
  }
}

export default SearchResultsFilters
