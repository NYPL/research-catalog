import {
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"
import { useState } from "react"

import type { ItemAggregationOption } from "../../types/filterTypes"

interface CheckboxGroupProps {
  field: string
  activeFilters: string[]
  options: ItemAggregationOption[]
}

const RefineSearchCheckBoxField = ({
  field,
  activeFilters,
  options,
}: CheckboxGroupProps) => {
  const [selectedOptions, setSelectedOptions] = useState(activeFilters)
  const updateCheckboxGroupValue = (data: string[]) => {
    setSelectedOptions(data)
  }
  return (
    <FormField>
      <CheckboxGroup
        id={`refine-${field}`}
        labelText="materialType"
        name="materialType"
        value={selectedOptions}
        onChange={updateCheckboxGroupValue}
      >
        {options.map(({ value, label }) => {
          return (
            <Checkbox id={value} key={value} value={value} labelText={label} />
          )
        })}
      </CheckboxGroup>
    </FormField>
  )
}

export default RefineSearchCheckBoxField
