import {
  CheckboxGroup,
  Checkbox,
  Button,
} from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import type { ItemFilterData } from "../../models/itemFilterData"
import type {
  option as optionType,
  selectedFilters as selectedFiltersType,
} from "../../types/filterTypes"

interface ItemFilterProps {
  itemFilterData: ItemFilterData
  setSelectedFilters: Dispatch<React.SetStateAction<selectedFiltersType>>
  selectedFilters: selectedFiltersType
  // this type is temporary for dev use only. could end up being different.
  submitFilters: Dispatch<React.SetStateAction<selectedFiltersType>>
}

const ItemFilter = ({
  itemFilterData,
  setSelectedFilters,
  selectedFilters,
  submitFilters,
}: ItemFilterProps) => {
  const field = itemFilterData.field()
  const fieldFormatted = itemFilterData.field(true)
  const clearFilter = () => {
    setSelectedFilters((prevFilters: selectedFiltersType) => {
      return { ...prevFilters, [field]: [] }
    })
  }

  const handleCheck = (selectedOptions: string[]) => {
    setSelectedFilters((prevFilters: selectedFiltersType) => {
      const newFilterSelection = {
        ...prevFilters,
        [field]: selectedOptions,
      }
      return newFilterSelection
    })
  }

  return (
    <>
      <CheckboxGroup
        data-testid="item-filter"
        key={field}
        labelText={fieldFormatted}
        name={field}
        id={field}
        onChange={handleCheck}
        // isSelected of the children checkboxes is controlled by this value
        // attribute. The options whose value attribute match those present in
        // the CheckboxGroup value array are selected.
        value={selectedFilters[field]}
      >
        {itemFilterData.displayOptions().map(({ value, label }: optionType) => {
          return (
            <Checkbox id={value} key={value} value={value} labelText={label} />
          )
        })}
      </CheckboxGroup>
      <div className="item-filter-buttons">
        <Button
          data-testid={`clear-${field}-button`}
          key={`clear-${field}-button`}
          buttonType="link"
          id="clear-filter-button"
          onClick={clearFilter}
        >
          Clear
        </Button>
        <Button
          key={`apply-${field}-button`}
          id="apply-filter-button"
          onClick={() => submitFilters(selectedFilters)}
        >
          Apply
        </Button>
      </div>
    </>
  )
}

export default ItemFilter
