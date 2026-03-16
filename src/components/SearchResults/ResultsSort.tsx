import { Menu } from "@nypl/design-system-react-components"
import type { SearchParams } from "../../types/searchTypes"
import type { BrowseParams } from "../../types/browseTypes"

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
  let value
  if (params.sortBy && params.order) {
    value = `${params.sortBy}_${params.order}`
  }
  // Reflect Discovery API default sort orders
  else if (params.sortBy == "title" || params.sortBy == "creator") {
    value = `${params.sortBy}_asc`
  } else if (
    params.sortBy == "date" ||
    params.sortBy == "count" ||
    params.sortBy == "termLabel"
  ) {
    value = `${params.sortBy}_desc`
  } else {
    value = defaultSort
  }
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
