import {
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"
import { useState } from "react"

import type { ItemAggregationOption } from "../../types/filterTypes"
import styles from "../../../styles/components/Search.module.scss"

interface CheckboxGroupProps {
  field: { value: string; label: string }
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
        id={`refine-${field.label}`}
        labelText={field.label}
        name={field.value}
        __css={{
          "> div": {
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gridGap: "var(--nypl-space-s)",
            div: {
              marginTop: "0 !important",
            },
          },
        }}
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
