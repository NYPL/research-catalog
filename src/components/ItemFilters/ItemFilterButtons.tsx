import { ButtonGroup, Button } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import type { Option } from "../../../src/types/filterTypes"

interface ItemFilterButtonProps {
  selectedOptions: string[]
  field: string
  setSelectedOptions: Dispatch<React.SetStateAction<Option[]>>
  submitFilters: (selection: string[], field: string) => void
}

const ItemFilterButtons = ({
  selectedOptions,
  field,
  setSelectedOptions,
  submitFilters,
}: ItemFilterButtonProps) => {
  const clearFilter = () => {
    setSelectedOptions([])
    submitFilters([], field)
  }

  return (
    <ButtonGroup
      className="item-filter-buttons"
      isDisabled={selectedOptions.length === 0}
    >
      <Button
        data-testid={`clear-${field}-button`}
        key={`clear-${field}-button`}
        buttonType="text"
        id={`clear-${field}-button`}
        onClick={clearFilter}
      >
        Clear
      </Button>
      <Button
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
