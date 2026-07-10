import { useState } from "react"
import MultiSelectWithGroupTitles from "./MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import type { MultiSelectItem } from "@nypl/design-system-react-components"
import { getNewSelectedFilters } from "../../utils/searchUtils"

interface DivisionSelectProps {
  collectionOptions: MultiSelectItem[]
  onSelectionChange: (field: string, values: string[]) => void
  globalInputChangeHandler: () => void
}

const DivisionSelect = ({
  collectionOptions,
  onSelectionChange,
  globalInputChangeHandler,
}: DivisionSelectProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (value: string | null) => {
    globalInputChangeHandler()
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
