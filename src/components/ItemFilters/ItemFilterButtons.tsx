import { ButtonGroup, Button } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"
import { useEffect } from "react"

import type { Option } from "../../../src/types/filterTypes"

interface ItemFilterButtonProps {
  appliedOptions: string[]
  selectedOptions: string[]
  field: string
  setSelectedOptions: Dispatch<React.SetStateAction<Option[]>>
  submitFilters: (selection: string[], field: string) => void
}

const ItemFilterButtons = ({
  selectedOptions,
  appliedOptions,
  field,
  setSelectedOptions,
  submitFilters,
}: ItemFilterButtonProps) => {
  const clearFilter = () => {
    setSelectedOptions([])
    submitFilters([], field)
  }
  useEffect(() => console.log(appliedOptions), [selectedOptions])
  return (
    <ButtonGroup className="item-filter-buttons">
      <Button
        isDisabled={selectedOptions.length === 0}
        data-testid={`clear-${field}-button`}
        key={`clear-${field}-button`}
        buttonType="text"
        id={`clear-${field}-button`}
        onClick={clearFilter}
      >
        Clear
      </Button>
      <Button
        isDisabled={appliedOptions.length === 0 && selectedOptions.length === 0}
        key={`apply-${field}-button`}
        id={`apply-${field}-button`}
        onClick={() => submitFilters(selectedOptions, field)}
      >
        Apply
      </Button>
    </ButtonGroup>
  )
}

export default ItemFilterButtons
