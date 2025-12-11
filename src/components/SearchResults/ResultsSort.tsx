import { Menu } from "@nypl/design-system-react-components"
import type { SearchParams } from "../../types/searchTypes"
import type { BrowseParams } from "../../types/browseTypes"

interface ResultsSortProps {
  params: SearchParams | BrowseParams
  handleSortChange: (string) => Promise<void>
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
  const value = params.order
    ? `${params.sortBy}_${params.order}`
    : params.sortBy || "relevance"

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
