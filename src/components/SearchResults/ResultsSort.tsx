import { Select } from "@nypl/design-system-react-components"
import type { SearchParams } from "../../types/searchTypes"
import type { ChangeEvent } from "react"
import type { BrowseParams } from "../../types/browseTypes"

interface ResultsSortProps {
  type: "search" | "browse"
  params: SearchParams | BrowseParams
  handleSortChange: (e: ChangeEvent) => Promise<void>
  display?: Record<string, string>
  sortOptions: Record<string, string>
}

/**
 * The ResultsSort component renders a Select element used for sorting Search or Browse results.
 */
const ResultsSort = ({
  type = "search",
  params,
  handleSortChange,
  display,
  sortOptions,
}: ResultsSortProps) => {
  console.log(params)
  const value =
    params.sortBy === "relevance"
      ? "relevance"
      : `${params.sortBy}_${params.order ?? "asc"}`

  return (
    <Select
      name="sort_direction"
      id={`${type}-results-sort`}
      labelText="Sort by"
      labelPosition="inline"
      onChange={handleSortChange}
      value={value}
      display={display}
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
