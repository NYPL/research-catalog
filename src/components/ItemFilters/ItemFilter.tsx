import {
  CheckboxGroup,
  Checkbox,
  Button,
} from "@nypl/design-system-react-components"
import { useEffect, useState } from "react"
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
}

const ItemFilter = ({
  itemFilterData,
  setSelectedFilters,
  selectedFilters,
}: ItemFilterProps) => {
  const field = itemFilterData.field()
  const fieldFormatted = itemFilterData.field(true)
  // const [checkBoxGroupValue, setCheckBoxGroupValue] = useState(
  //   selectedFilters[field]
  // )
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
        key={field}
        labelText={fieldFormatted}
        name={field}
        id={field}
        onChange={handleCheck}
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
          key={`clear-${field}-button`}
          buttonType="link"
          id="clear-filter-button"
          onClick={clearFilter}
        >
          Clear
        </Button>
        <Button key={`apply-${field}-button`} id="apply-filter-button">
          Apply
        </Button>
      </div>
    </>
  )
}

export default ItemFilter
