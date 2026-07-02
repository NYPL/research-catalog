import { MultiSelect } from "@nypl/design-system-react-components"
import { memo, useCallback, useEffect, useState } from "react"

interface MultiSelectMemoProps {
  fieldValue: string
  label: string
  options: { id: string; name: string }[]
  onSelectionChange: (field: string, values: string[]) => void
  resetKey: number
  globalInputChangeHandler: () => void
}

const MultiSelectMemo = memo(
  ({
    fieldValue,
    label,
    options,
    onSelectionChange,
    resetKey,
    globalInputChangeHandler,
  }: MultiSelectMemoProps) => {
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
      setSelected([])
    }, [resetKey])

    const handleChange = useCallback(
      (value: string | null) => {
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
      },
      [fieldValue, onSelectionChange, globalInputChangeHandler]
    )

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
)
MultiSelectMemo.displayName = "MultiSelectMemo"

export default MultiSelectMemo
