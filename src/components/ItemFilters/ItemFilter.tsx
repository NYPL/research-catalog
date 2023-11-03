import {
  CheckboxGroup,
  Checkbox,
  Button,
  Icon,
  Spacer,
  ButtonGroup,
} from "@nypl/design-system-react-components"
import type { Dispatch } from "react"
import FocusTrap from "focus-trap-react"
import { useState } from "react"

import type { ItemFilterData } from "../../models/itemFilterData"
import type { Option, SelectedFilters } from "../../types/filterTypes"
import styles from "../../../styles/components/ItemFilters.module.scss"

interface ItemFilterProps {
  itemFilterData: ItemFilterData
  setSelectedFilters: Dispatch<React.SetStateAction<SelectedFilters>>
  selectedFilters: SelectedFilters
  // this type is temporary for dev use only. could end up being different.
  submitFilters: Dispatch<React.SetStateAction<SelectedFilters>>
  isOpen: boolean
  toggleFilterDisplay: Dispatch<React.SetStateAction<string>>
}

const ItemFilter = ({
  itemFilterData,
  setSelectedFilters,
  selectedFilters,
  isOpen,
  toggleFilterDisplay,
}: ItemFilterProps) => {
  const field = itemFilterData.field()
  const fieldFormatted = itemFilterData.field(true)
  const [selectedOptions, setSelectedOptions] = useState(selectedFilters[field])

  const resetToAppliedOptions = () => {
    updateCheckboxGroupValue(selectedFilters[field])
  }

  const clearFilter = () => {
    setSelectedOptions([])
    setSelectedFilters((prevFilters: SelectedFilters) => {
      return { ...prevFilters, [field]: [] }
    })
  }

  const applyFilter = () => {
    let newFilterSelection: SelectedFilters
    setSelectedFilters((prevFilters: SelectedFilters) => {
      newFilterSelection = {
        ...prevFilters,
        [field]: selectedOptions,
      }
      return newFilterSelection
    })
  }

  const updateCheckboxGroupValue = (data: string[]) => {
    setSelectedOptions(data)
  }

  const openCloseHandler = () => {
    resetToAppliedOptions()
    if (isOpen) toggleFilterDisplay("")
    else toggleFilterDisplay(field)
  }

  return (
    <div>
      <Button
        data-testid={field + "-item-filter"}
        buttonType="secondary"
        id="item-filter-button"
        onClick={openCloseHandler}
        type="button"
      >
        {fieldFormatted}
        <Spacer />
        {`(${selectedOptions.length})`}
        <Icon name={isOpen ? "minus" : "plus"} size="medium" />
      </Button>
      {isOpen && (
        <>
          <CheckboxGroup
            labelText={fieldFormatted}
            showLabel={false}
            key={field}
            name={field}
            id={field}
            onChange={updateCheckboxGroupValue}
            // isSelected of the children checkboxes is controlled by this value
            // attribute. The options whose value attribute match those present in
            // the CheckboxGroup value array are selected.
            value={selectedOptions}
          >
            {itemFilterData.displayOptions().map(({ value, label }: Option) => {
              return (
                <Checkbox
                  className={styles.filterOption}
                  id={value}
                  key={value}
                  value={value}
                  labelText={label}
                />
              )
            })}
          </CheckboxGroup>

          <ButtonGroup
            className="item-filter-buttons"
            isDisabled={selectedOptions.length === 0}
          >
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
              onClick={applyFilter}
            >
              Apply
            </Button>
          </ButtonGroup>
        </>
      )}
    </div>
  )
}

export default ItemFilter
