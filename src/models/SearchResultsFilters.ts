class SearchResultsFilters {
  format: []
  languageFilters: []
  subjectLiteralFilters: []
  activeFilters: object
  constructor(searchResults) {
    const filterOptions = searchResults.filters.itemListElement
    this.format = filterOptions.find((f) => f.id === "materialType").values
    this.languageFilters = filterOptions.find((f) => f.id === "language").values
    this.subjectLiteralFilters = filterOptions.find(
      (f) => f.id === "subjectLiteral"
    ).values
    this.activeFilters = searchResults.selectedFilters
  }
}

export default SearchResultsFilters
