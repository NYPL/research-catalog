import MultiSelect from "../MultiSelect/MultiSelect"
import { useState } from "react"
import { getNewSelectedFilters } from "../../utils/searchUtils"

interface IsolatedMultiSelectProps {
  field: string
  label: string
  options: { id: string; name: string }[]
  onSelectionChange: (field: string, values: string[]) => void
}

/**
 * A component that manages local state for the Design System MultiSelect component
 * (reduces unnecessary rerenders compared to using a global React state in
 * Advanced Search page).
 * Updates formStateRef in the Advanced Search page on change.
 */
const IsolatedMultiSelect = ({
  field,
  label,
  options,
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

  return (
    <MultiSelect
      sx={{ "div > div > button": { height: "40px" }, mb: "25.5px" }}
      id={field}
      isSearchable
      closeOnBlur
      buttonText={label}
      selectedItems={{ [field]: { items: selected } }}
      items={options}
      onChange={(e) => handleChange(e.target.id)}
      onClear={() => handleChange(null)}
      listOverflow="lazy-load"
    />
  )
}
IsolatedMultiSelect.displayName = "IsolatedMultiSelect"

export default IsolatedMultiSelect
