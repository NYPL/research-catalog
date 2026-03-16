import { Menu } from "@nypl/design-system-react-components"
import type { SearchParams } from "../../types/searchTypes"
import type { BrowseParams } from "../../types/browseTypes"
import { useMemo } from "react"

interface ResultsSortProps {
  params: SearchParams | BrowseParams
  handleSortChange: (string) => Promise<void>
  sortOptions: Record<string, string>
  defaultSort: string
}

/**
 * The ResultsSort component renders a Menu component used for sorting search or browse results.
 */
const ResultsSort = ({
  params,
  handleSortChange,
  sortOptions,
  defaultSort,
}: ResultsSortProps) => {
  const value = useMemo(() => {
    if (params.sortBy && params.order) {
      return `${params.sortBy}_${params.order}`
    }

    // Reflect Discovery API default sort orders
    if (params.sortBy === "title" || params.sortBy === "creator") {
      return `${params.sortBy}_asc`
    }

    if (
      params.sortBy === "date" ||
      params.sortBy === "count" ||
      params.sortBy === "termLabel"
    ) {
      return `${params.sortBy}_desc`
    }

    return defaultSort
  }, [params.sortBy, params.order, defaultSort])

  return (
    <Menu
      id="results-sort"
      showLabel
      className="no-print"
      selectedItem={value}
      labelText={`Sort by: ${sortOptions[value]}`}
      listItemsData={Object.entries(sortOptions).map(([key, label]) => ({
        id: key,
        label,
        onClick: () => handleSortChange(key),
        type: "action",
      }))}
    />
  )
}

export default ResultsSort
