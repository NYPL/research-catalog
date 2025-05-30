import { Select } from "@nypl/design-system-react-components"
import { sortOptions } from "../../utils/searchUtils"

import type { SearchParams } from "../../types/searchTypes"
import type { ChangeEvent } from "react"

interface SearchResultsSortProps {
  id?: string
  searchParams: SearchParams
  handleSortChange: (e: ChangeEvent) => Promise<void>
  display?: Record<string, string>
}

/**
 * The SearchResultsSort component renders a Select element used for sorting Search Results.
 */
const SearchResultsSort = ({
  id = "search-results-sort",
  searchParams,
  handleSortChange,
  display,
}: SearchResultsSortProps) => {
  return (
    <Select
      name="sort_direction"
      id={id}
      labelText="Sort by"
      labelPosition="inline"
      mb="l"
      onChange={handleSortChange}
      value={
        searchParams.order
          ? `${searchParams.sortBy}_${searchParams.order}`
          : searchParams.sortBy
      }
      display={display}
      className="no-print"
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
