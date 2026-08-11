import { useState } from "react"
import MultiSelectWithGroupTitles from "./MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import type { MultiSelectItem } from "@nypl/design-system-react-components"
import { MultiSelect } from "@nypl/design-system-react-components"
import { getNewSelectedFilters } from "../../utils/searchUtils"

interface IsolatedMultiSelectProps {
  field: string
  label: string
  options: MultiSelectItem[]
  isWithGroupTitles?: boolean
  onSelectionChange: (field: string, values: string[]) => void
}

/**
 * A component that manages local state for a MultiSelect component (either the
 * Design System MultiSelect component or the custom MultiSelectWithGroupTitles
 * component) (reduces unnecessary rerenders compared to using a global React
 * state in Advanced Search page).
 * Updates formStateRef in the Advanced Search page on change.
 */
const IsolatedMultiSelect = ({
  field,
  label,
  options,
  isWithGroupTitles = false,
  onSelectionChange,
}: IsolatedMultiSelectProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (value: string | null) => {
    setSelected((prev) => {
      const next = getNewSelectedFilters(prev, value)
      onSelectionChange(field, next)
      return next
    })
  }

  return isWithGroupTitles ? (
    <MultiSelectWithGroupTitles
      field={{ value: field, label: label }}
      groupedItems={options}
      selectedItems={{ [field]: { items: selected } }}
      onChange={(e) => handleChange(e.target.id)}
      onClear={() => handleChange(null)}
    />
  ) : (
    <MultiSelect
      sx={{ "div > div > button": { height: "40px" }, mb: "25.5px" }}
      id={field}
      buttonText={label}
      isSearchable
      closeOnBlur
      items={options}
      selectedItems={{ [field]: { items: selected } }}
      onChange={(e) => handleChange(e.target.id)}
      onClear={() => handleChange(null)}
    />
  )
}
IsolatedMultiSelect.displayName = "IsolatedMultiSelect"

export default IsolatedMultiSelect
