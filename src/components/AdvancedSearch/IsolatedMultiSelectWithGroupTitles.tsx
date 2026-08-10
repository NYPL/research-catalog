import { useState } from "react"
import MultiSelectWithGroupTitles from "./MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import type { MultiSelectItem } from "@nypl/design-system-react-components"
import { getNewSelectedFilters } from "../../utils/searchUtils"

interface IsolatedMultiSelectWithGroupTitlesProps {
  field: string
  label: string
  options: MultiSelectItem[]
  onSelectionChange: (field: string, values: string[]) => void
}

/**
 * A component that manages local state for the custom MultiSelectWithGroupTitles
 * component (reduces unnecessary rerenders compared to using a global React state
 * in Advanced Search page).
 * Updates formStateRef in the Advanced Search page on change.
 */
const IsolatedMultiSelectWithGroupTitles = ({
  field,
  label,
  options,
  onSelectionChange,
}: IsolatedMultiSelectWithGroupTitlesProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (value: string | null) => {
    setSelected((prev) => {
      const next = getNewSelectedFilters(prev, value)
      onSelectionChange(field, next)
      return next
    })
  }

  return (
    <MultiSelectWithGroupTitles
      field={{ value: field, label: label }}
      groupedItems={options}
      onChange={(e) => handleChange(e.target.id)}
      onClear={() => handleChange(null)}
      selectedItems={{ [field]: { items: selected } }}
    />
  )
}
IsolatedMultiSelectWithGroupTitles.displayName =
  "IsolatedMultiSelectWithGroupTitles"

export default IsolatedMultiSelectWithGroupTitles
