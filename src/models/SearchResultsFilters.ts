import type { ItemAggregationOption } from "../types/filterTypes"

class SearchResultsFilters {
  options: ItemAggregationOption[]
  activeFilters: string[]
  field: string
  constructor(aggregationsResults, field) {
    const filterOptions = aggregationsResults.itemListElement
    this.options = filterOptions.find((f) => f.id === field.value)?.values
    this.field = field.value
  }
}

export default SearchResultsFilters
