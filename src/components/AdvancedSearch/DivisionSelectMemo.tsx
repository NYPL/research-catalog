import { memo, useCallback, useEffect, useState } from "react"
import MultiSelectWithGroupTitles from "./MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import type { MultiSelectItem } from "@nypl/design-system-react-components"

interface DivisionSelectMemoProps {
  collectionOptions: MultiSelectItem[]
  onSelectionChange: (field: string, values: string[]) => void
  resetKey: number
  globalInputChangeHandler: () => void
}

const DivisionSelectMemo = memo(
  ({
    collectionOptions,
    onSelectionChange,
    resetKey,
    globalInputChangeHandler,
  }: DivisionSelectMemoProps) => {
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
          onSelectionChange("collection", next)
          return next
        })
      },
      [onSelectionChange, globalInputChangeHandler]
    )

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
)
DivisionSelectMemo.displayName = "DivisionSelectMemo"

export default DivisionSelectMemo
