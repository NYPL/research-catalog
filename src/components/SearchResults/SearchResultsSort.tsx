import { Select } from "@nypl/design-system-react-components"
import { sortOptions } from "../../utils/searchUtils"

import type { SearchParams } from "../../types/searchTypes"
import type { ChangeEvent } from "react"

interface SearchResultsSortProps {
  pageHasResults: boolean
  searchParams: SearchParams
  handleSortChange: (e: ChangeEvent) => Promise<void>
  mobileOnly?: boolean
}

/**
 * The SearchResultsSort component renders a Select element used for sorting Search Results.
 */
const SearchResultsSort = ({
  pageHasResults,
  searchParams,
  handleSortChange,
  mobileOnly = false,
}: SearchResultsSortProps) => {
  if (!pageHasResults) return
  return (
    <Select
      name="sort_direction"
      id={`search-results-sort${mobileOnly ? "-mobile" : ""}`}
      labelText="Sort by"
      labelPosition="inline"
      mb="l"
      onChange={handleSortChange}
      value={
        searchParams.order
          ? `${searchParams.sortBy}_${searchParams.order}`
          : searchParams.sortBy
      }
      display={{
        base: mobileOnly ? "block" : "none",
        md: mobileOnly ? "none" : "block",
      }}
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
