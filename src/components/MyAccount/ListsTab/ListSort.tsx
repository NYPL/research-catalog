import { Box, Menu } from "@nypl/design-system-react-components"
import { forwardRef, useEffect } from "react"
import { idConstants, useFocusContext } from "../../../context/FocusContext"

interface ListSortProps {
  handleSortChange: (string) => Promise<void> | void
  selectedValue: string
  sortOptions: Record<string, string>
}

/**
 * The ListSort component renders a Menu component used for sorting a user's lists OR sorting the records in a list.
 */
const ListSort = forwardRef<HTMLDivElement, ListSortProps>(
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
          // Hacky way to force scroll internally
          "[role='menu'], .chakra-menu__menu-list": {
            maxHeight: "50vh",
            overflowY: "auto",
          },
        }}
        onKeyDown={(e: any) => {
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
            setTimeout(() => {
              const activeEl = document.activeElement as HTMLElement
              if (activeEl?.getAttribute("role") === "menuitem") {
                activeEl.scrollIntoView({ block: "nearest" })
              }
            }, 10)
          }
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

export default ListSort

ListSort.displayName = "ListSort"
