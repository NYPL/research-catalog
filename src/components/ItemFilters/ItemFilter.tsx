import { CheckboxGroup, Checkbox } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"
import { useCallback, useEffect, useState } from "react"

import type { ItemFilterData } from "../../models/ItemFilterData"
import type { Option, AppliedFilters } from "../../types/filterTypes"
import styles from "../../../styles/components/ItemFilters.module.scss"

import ItemFilterButtons from "./ItemFilterButtons"
import ItemFilterLabel from "./ItemFilterLabel"

interface ItemFilterProps {
  itemFilterData: ItemFilterData
  setAppliedFilters: Dispatch<React.SetStateAction<AppliedFilters>>
  activeFilters: AppliedFilters
  // this type is temporary for dev use only. could end up being different.
  submitFilters: Dispatch<React.SetStateAction<AppliedFilters>>
  isOpen: boolean
  setWhichFilterIsOpen: Dispatch<React.SetStateAction<string>>
}

const ItemFilter = ({
  itemFilterData,
  setAppliedFilters,
  activeFilters,
  isOpen,
  setWhichFilterIsOpen,
}: ItemFilterProps) => {
  const field = itemFilterData.field
  const [selectedOptions, setSelectedOptions] = useState(activeFilters[field])

  const resetToAppliedOptions = useCallback(() => {
    updateCheckboxGroupValue(activeFilters[field])
  }, [activeFilters, field])

  const updateCheckboxGroupValue = (data: string[]) => {
    setSelectedOptions(data)
  }

  // When the filter is close with unapplied options, those options are not
  // persisted. Instead, reset to the options that were last queried for.
  useEffect(() => {
    if (!isOpen) resetToAppliedOptions()
  }, [isOpen, resetToAppliedOptions])

  return (
    <div className={styles.itemFilter}>
      <ItemFilterLabel
        field={field}
        selectedOptions={selectedOptions}
        setWhichFilterIsOpen={setWhichFilterIsOpen}
        isOpen={isOpen}
      />
      {isOpen && (
        <div className={styles.itemFilterOptionsContainer}>
          <CheckboxGroup
            labelText={field}
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
          <ItemFilterButtons
            field={field}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setAppliedFilters={setAppliedFilters}
          />
        </div>
      )}
    </div>
  )
}

export default ItemFilter
