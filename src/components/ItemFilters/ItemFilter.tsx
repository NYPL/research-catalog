import {
  CheckboxGroup,
  Checkbox,
  Button,
  Icon,
} from "@nypl/design-system-react-components"
import type { Dispatch } from "react"
import FocusTrap from "focus-trap-react"
import { useState, useRef, useEffect } from "react"

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
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(selectedFilters[field])

  const resetToAppliedOptions = () => {
    handleCheck(selectedFilters[field])
  }

  const clearFilter = () => {
    setSelectedFilters((prevFilters: selectedFiltersType) => {
      return { ...prevFilters, [field]: [] }
    })
  }

  const applyFilter = () => {
    setSelectedFilters((prevFilters: selectedFiltersType) => {
      const newFilterSelection = {
        ...prevFilters,
        [field]: selectedOptions,
      }
      submitFilters(newFilterSelection)
      return newFilterSelection
    })
  }

  const handleCheck = (data: string[]) => {
    setSelectedOptions(data)
  }

  const openCloseHandler = () => {
    setIsOpen((prevIsOpen) => {
      resetToAppliedOptions()
      return !prevIsOpen
    })
  }

  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        // onDeactivate: () => {
        //   if (!mobile) manageFilterDisplay('none');
        // },
        returnFocusOnDeactivate: false,
      }}
      // active={isOpen}
      className="item-filter"
    >
      <div>
        <Button
          buttonType="secondary"
          // className={`item-filter-button ${open ? " open" : ""}`}
          id="item-filter-button"
          onClick={openCloseHandler}
          type="button"
        >
          {fieldFormatted}
          {/*{numOfSelections}*/}
          <Icon name={isOpen ? "minus" : "plus"} size="medium" />
        </Button>
        {isOpen && (
          <>
            <CheckboxGroup
              labelText={fieldFormatted}
              showLabel={false}
              data-testid="item-filter"
              key={field}
              name={field}
              id={field}
              onChange={handleCheck}
              // isSelected of the children checkboxes is controlled by this value
              // attribute. The options whose value attribute match those present in
              // the CheckboxGroup value array are selected.
              value={selectedOptions}
            >
              {itemFilterData
                .displayOptions()
                .map(({ value, label }: optionType) => {
                  return (
                    <Checkbox
                      id={value}
                      key={value}
                      value={value}
                      labelText={label}
                    />
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
                onClick={applyFilter}
              >
                Apply
              </Button>
            </div>
          </>
        )}
      </div>
    </FocusTrap>
  )
}

export default ItemFilter
