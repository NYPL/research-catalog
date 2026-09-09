import { useState } from "react"
import CustomMultiselect from "./CustomMultiselect/CustomMultiselect"
import type { MultiSelectItem } from "@nypl/design-system-react-components"
import { getNewSelectedFilters } from "../../utils/searchUtils"

interface IsolatedMultiSelectProps {
  field: string
  label: string
  isDisabled?: boolean
  options: MultiSelectItem[]
  isWithGroupTitles?: boolean
  onSelectionChange: (field: string, values: string[]) => void
  translate?: boolean
}

/**
 * A component that manages local state for the CustomMultiselect component
 * (reduces unnecessary rerenders compared to using a global React state in
 * Advanced Search page).
 * Updates formStateRef in the Advanced Search page on change.
 */
const IsolatedMultiSelect = ({
  field,
  label,
  isDisabled = false,
  options,
  isWithGroupTitles = false,
  onSelectionChange,
  translate = true,
}: IsolatedMultiSelectProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (value: string | null) => {
    setSelected((prev) => {
      const next = value === null ? [] : getNewSelectedFilters(prev, value)
      onSelectionChange(field, next)
      return next
    })
  }

  // Flat options are passed as `items`, grouped options as `groupedItems`.
  return (
    <div
      style={{
        marginBottom: "25.5px",
      }}
    >
      <CustomMultiselect
        field={{ value: field, label: label }}
        isDisabled={isDisabled}
        showGroupTitles={isWithGroupTitles}
        searchLabelText={isWithGroupTitles ? undefined : `Search ${label}`}
        {...(isWithGroupTitles
          ? { groupedItems: options }
          : { items: options })}
        selectedItems={{ [field]: { items: selected } }}
        onChange={(itemId) => handleChange(itemId)}
        onClear={() => handleChange(null)}
        translate={translate}
      />
    </div>
  )
}
IsolatedMultiSelect.displayName = "IsolatedMultiSelect"

export default IsolatedMultiSelect
