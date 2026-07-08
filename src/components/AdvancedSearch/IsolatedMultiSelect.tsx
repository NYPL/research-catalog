import { MultiSelect } from "@nypl/design-system-react-components"
import { useState } from "react"

interface IsolatedMultiSelectProps {
  fieldValue: string
  label: string
  options: { id: string; name: string }[]
  onSelectionChange: (field: string, values: string[]) => void
  resetKey: number
  globalInputChangeHandler: () => void
}

const IsolatedMultiSelect = ({
  fieldValue,
  label,
  options,
  onSelectionChange,
  resetKey,
  globalInputChangeHandler,
}: IsolatedMultiSelectProps) => {
  const [selected, setSelected] = useState<string[]>([])
  const [prevResetKey, setPrevResetKey] = useState(resetKey)
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey)
    setSelected([])
  }

  const handleChange = (value: string | null) => {
    globalInputChangeHandler()
    setSelected((prev) => {
      const next =
        value === null
          ? []
          : prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      onSelectionChange(fieldValue, next)
      return next
    })
  }

  return (
    <MultiSelect
      sx={{ "div > div > button": { height: "40px" }, mb: "25.5px" }}
      id={fieldValue}
      isSearchable
      closeOnBlur
      buttonText={label}
      selectedItems={{ [fieldValue]: { items: selected } }}
      items={options}
      onChange={(e) => handleChange(e.target.id)}
      onClear={() => handleChange(null)}
    />
  )
}
IsolatedMultiSelect.displayName = "IsolatedMultiSelect"

export default IsolatedMultiSelect
