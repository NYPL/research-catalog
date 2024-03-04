import {
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import type { AggregationOption } from "../../types/filterTypes"

interface CheckboxGroupProps {
  field: { value: string; label: string }
  appliedFilters: string[]
  options: AggregationOption[]
  setAppliedFilters: Dispatch<React.SetStateAction<Record<string, string[]>>>
}

const RefineSearchCheckBoxField = ({
  field,
  appliedFilters,
  options,
  setAppliedFilters,
}: CheckboxGroupProps) => {
  // Data is an array of strings corresponding to the selected options for this
  // field
  const updateCheckboxGroupValue = (data: string[]) => {
    // update the parent state to know about the updated selected values
    setAppliedFilters((prevFilters) => {
      return {
        ...prevFilters,
        [field.value]: data,
      }
    })
  }

  const checkboxes = options.map(({ value, label, count }) => {
    console.log(`${label} (${count})`)
    return (
      <Checkbox
        id={value}
        key={value}
        value={value}
        labelText={`${label} (${count})`}
      />
    )
  })

  return (
    <FormField>
      <CheckboxGroup
        id={`refine-${field.label}`}
        labelText={field.label}
        name={field.value}
        __css={{
          "> div": {
            display: "grid",
            //TODO: make the number here dynamic to breakpoint
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gridGap: "var(--nypl-space-s)",
            div: {
              marginTop: "0 !important",
            },
          },
        }}
        value={appliedFilters}
        onChange={updateCheckboxGroupValue}
      >
        {checkboxes}
      </CheckboxGroup>
    </FormField>
  )
}

export default RefineSearchCheckBoxField
