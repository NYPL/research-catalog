import { Box, Menu } from "@nypl/design-system-react-components"
import { forwardRef, useEffect } from "react"
import { idConstants, useFocusContext } from "../../../context/FocusContext"

interface ListsSortProps {
  handleSortChange: (string) => Promise<void>
  selectedValue: string
  sortOptions: Record<string, string>
}

/**
 * The ListsSort component renders a Menu component used for sorting a user's lists.
 */
const ListsSort = forwardRef<HTMLDivElement, ListsSortProps>(
  ({ handleSortChange, sortOptions, selectedValue }, ref) => {
    const { activeElementId } = useFocusContext()

    // Uses current focus context value and wrapping ref to refocus Menu's internal button
    useEffect(() => {
      if (
        ref &&
        typeof ref !== "function" &&
        activeElementId === idConstants.listsSort
      ) {
        const btn = ref.current?.querySelector("button")
        btn?.focus()
      }
    }, [selectedValue, ref, activeElementId])

    return (
      // TODO: Forcing focus, remove with repaired Menu component
      <Box
        zIndex="9999"
        ref={ref}
        width={{ base: "100%", sm: "auto" }}
        sx={{
          button: { width: "100%" },
        }}
      >
        <Menu
          zIndex="9999"
          key={selectedValue} // TODO: Forcing remount, replace with repaired Menu component
          id="lists-sort"
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
      </Box>
    )
  }
)

export default ListsSort

ListsSort.displayName = "ListsSort"
