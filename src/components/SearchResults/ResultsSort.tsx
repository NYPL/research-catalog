import { Select } from "@nypl/design-system-react-components"
import type { SearchParams } from "../../types/searchTypes"
import type { ChangeEvent } from "react"
import type { BrowseParams } from "../../types/browseTypes"

interface ResultsSortProps {
  params: SearchParams | BrowseParams
  handleSortChange: (e: ChangeEvent) => Promise<void>
  sortOptions: Record<string, string>
}

/**
 * The ResultsSort component renders a Select element used for sorting Search or Browse results.
 */
const ResultsSort = ({
  params,
  handleSortChange,
  sortOptions,
}: ResultsSortProps) => {
  const value =
    params.sortBy === "relevance"
      ? "relevance"
      : `${params.sortBy}_${params.order ?? "asc"}`

  return (
    <Select
      name="sort_direction"
      id="results-sort"
      labelText="Sort by"
      labelPosition="inline"
      onChange={handleSortChange}
      value={value}
      className="no-print"
    >
      {Object.entries(sortOptions).map(([key, label]) => (
        <option value={key} key={`sort-by-${key}`}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default ResultsSort
