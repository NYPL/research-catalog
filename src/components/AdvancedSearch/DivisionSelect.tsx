import { useState } from "react"
import MultiSelectWithGroupTitles from "./MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import type { MultiSelectItem } from "@nypl/design-system-react-components"
import { getNewSelectedFilters } from "../../utils/searchUtils"

interface DivisionSelectProps {
  collectionOptions: MultiSelectItem[]
  onSelectionChange: (field: string, values: string[]) => void
}

/**
 * A component that manages local state for the custom MultiSelectWithGroupTitles
 * component (reduces unnecessary rerenders compared to using a global React state
 * in Advanced Search page).
 * This is specific to the division/collection filter.
 * Updates formStateRef in the Advanced Search page on change.
 */
const DivisionSelect = ({
  collectionOptions,
  onSelectionChange,
}: DivisionSelectProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (value: string | null) => {
    setSelected((prev) => {
      const next = getNewSelectedFilters(prev, value)
      onSelectionChange("collection", next)
      return next
    })
  }

  return (
    <MultiSelectWithGroupTitles
      field={{ value: "collection", label: "Division" }}
      groupedItems={collectionOptions}
      onChange={(e) => handleChange(e.target.id)}
      onClear={() => handleChange(null)}
      selectedItems={{ collection: { items: selected } }}
    />
  )
}
DivisionSelect.displayName = "DivisionSelect"

export default DivisionSelect
