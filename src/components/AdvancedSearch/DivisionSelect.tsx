import { useState } from "react"
import MultiSelectWithGroupTitles from "./MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import type { MultiSelectItem } from "@nypl/design-system-react-components"

interface DivisionSelectProps {
  collectionOptions: MultiSelectItem[]
  onSelectionChange: (field: string, values: string[]) => void
  resetKey: number
  globalInputChangeHandler: () => void
}

const DivisionSelect = ({
  collectionOptions,
  onSelectionChange,
  resetKey,
  globalInputChangeHandler,
}: DivisionSelectProps) => {
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
