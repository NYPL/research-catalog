import { Select } from "@nypl/design-system-react-components"
import { sortOptions } from "../../utils/searchUtils"

import type { SearchParams } from "../../types/searchTypes"
import type { ChangeEvent } from "react"

interface SearchResultsSortProps {
  pageHasResults: boolean
  searchParams: SearchParams
  handleSortChange: (e: ChangeEvent) => Promise<void>
}

/**
 * The SearchResultsSort component renders a Select element used for sorting Search Results.
 */
const SearchResultsSort = ({
  pageHasResults,
  searchParams,
  handleSortChange,
}: SearchResultsSortProps) => {
  if (!pageHasResults) return
  return (
    <Select
      name="sort_direction"
      id="search-results-sort"
      labelText="Sort by"
      labelPosition="inline"
      mb="l"
      onChange={handleSortChange}
      value={
        searchParams.order
          ? `${searchParams.sortBy}_${searchParams.order}`
          : searchParams.sortBy
      }
    >
      {Object.keys(sortOptions).map((key) => (
        <option value={key} key={`sort-by-${key}`}>
          {sortOptions[key]}
        </option>
      ))}
    </Select>
  )
}

export default SearchResultsSort
