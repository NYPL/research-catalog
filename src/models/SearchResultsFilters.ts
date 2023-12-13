import type { ItemAggregationOption } from "../types/filterTypes"

class SearchResultsFilters {
  options: ItemAggregationOption[]
  activeFilters: string[]
  field: string
  constructor(searchResults, field) {
    const filterOptions = searchResults.filters.itemListElement
    this.options = filterOptions.find((f) => f.id === field).values
    this.activeFilters = searchResults.selectedFilters[field].map(
      (f) => f.value
    )
  }
}

export default SearchResultsFilters
