import { ButtonGroup, Button } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import type { AppliedFilters, Option } from "../../../src/types/filterTypes"

interface ItemFilterButtonProps {
  selectedOptions: string[]
  field: string
  setSelectedOptions: Dispatch<React.SetStateAction<Option[]>>
  setAppliedFilters: Dispatch<React.SetStateAction<AppliedFilters>>
}

const ItemFilterButtons = ({
  selectedOptions,
  field,
  setSelectedOptions,
  setAppliedFilters,
}: ItemFilterButtonProps) => {
  const clearFilter = () => {
    setSelectedOptions([])
    setAppliedFilters((prevFilters: AppliedFilters) => {
      return { ...prevFilters, [field]: [] }
    })
  }

  const applyFilter = () => {
    let newFilterSelection: AppliedFilters
    setAppliedFilters((prevFilters: AppliedFilters) => {
      newFilterSelection = {
        ...prevFilters,
        [field]: selectedOptions,
      }
      return newFilterSelection
    })
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
        id="clear-filter-button"
        onClick={clearFilter}
      >
        Clear
      </Button>
      <Button
        key={`apply-${field}-button`}
        id="apply-filter-button"
        onClick={applyFilter}
      >
        Apply
      </Button>
    </ButtonGroup>
  )
}

export default ItemFilterButtons
