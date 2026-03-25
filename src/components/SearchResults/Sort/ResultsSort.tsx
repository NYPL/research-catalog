import { Menu } from "@nypl/design-system-react-components"
import type { SearchParams } from "../../../types/searchTypes"
import { useMemo, forwardRef, useEffect } from "react"
import { idConstants, useFocusContext } from "../../../context/FocusContext"

interface ResultsSortProps {
  params: SearchParams
  handleSortChange: (string) => Promise<void>
  sortOptions: Record<string, string>
}
/**
 * The ResultsSort component renders a Menu component used for sorting search results.
 */
const ResultsSort = forwardRef<HTMLDivElement, ResultsSortProps>(
  ({ params, handleSortChange, sortOptions }, ref) => {
    const { activeElementId } = useFocusContext()

    const selectedValue = useMemo(() => {
      if (params.sortBy === "relevance") return "relevance"
      // Reflect Discovery API's default sort orders
      if (params.sortBy)
        return params.order
          ? `${params.sortBy}_${params.order}`
          : `${params.sortBy}_asc`
      if (params.field === "callnumber" || params.callnumber)
        return "callnumber_asc"

      // Default for search
      return "relevance"
    }, [params.sortBy, params.order, params.field, params.callnumber])

    // Uses current focus context value and wrapping ref to refocus Menu's internal button
    useEffect(() => {
      if (
        ref &&
        typeof ref !== "function" &&
        activeElementId === idConstants.searchResultsSort
      ) {
        const btn = ref.current?.querySelector("button")
        btn?.focus()
      }
    }, [selectedValue, ref])

    return (
      <div style={{ zIndex: "9999" }} ref={ref}>
        <Menu
          key={selectedValue} // TODO: Forcing remount, replace with repaired Menu component
          id="results-sort"
          showLabel
          className="no-print"
          selectedItem={selectedValue}
          labelText={`Sort by: ${sortOptions[selectedValue]}`}
          listItemsData={Object.entries(sortOptions).map(([key, label]) => ({
            id: key,
            label,
            onClick: () => handleSortChange(key),
            type: "action",
          }))}
        />
      </div>
    )
  }
)

export default ResultsSort
ResultsSort.displayName = "ResultsSort"
