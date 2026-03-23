import { Menu } from "@nypl/design-system-react-components"
import type { BrowseParams } from "../../types/browseTypes"
import { forwardRef, useEffect, useMemo } from "react"
import { idConstants, useFocusContext } from "../../context/FocusContext"

interface BrowseResultsSortProps {
  params: BrowseParams
  handleSortChange: (string) => Promise<void>
  sortOptions: Record<string, string>
  defaultSort: string
}

/**
 * The BrowseResultsSort component renders a Menu component used for sorting browse results.
 */
const BrowseResultsSort = forwardRef<HTMLDivElement, BrowseResultsSortProps>(
  ({ params, handleSortChange, sortOptions, defaultSort }, ref) => {
    const { activeElementId } = useFocusContext()
    const selectedValue = useMemo(() => {
      if (params.sortBy && params.order) {
        return `${params.sortBy}_${params.order}`
      }
      // Reflect Discovery API default sort orders
      if (params.sortBy === "count" || params.sortBy === "termLabel") {
        return `${params.sortBy}_desc`
      }

      return defaultSort
    }, [params.sortBy, params.order, defaultSort])

    // Uses current focus context value and wrapping ref to refocus Menu's internal button
    useEffect(() => {
      if (
        ref &&
        typeof ref !== "function" &&
        activeElementId === idConstants.browseResultsSort
      ) {
        const btn = ref.current?.querySelector("button")
        btn?.focus()
      }
    }, [selectedValue, ref])

    return (
      <div style={{ zIndex: "9999" }} ref={ref}>
        <Menu
          zIndex="9999"
          key={selectedValue} // forcing full remount
          id="browse-results-sort"
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

export default BrowseResultsSort

BrowseResultsSort.displayName = "BrowseResultsSort"
