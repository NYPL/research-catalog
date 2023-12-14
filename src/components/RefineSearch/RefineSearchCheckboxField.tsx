import {
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Dispatch } from "react"

import type { ItemAggregationOption } from "../../types/filterTypes"
import styles from "../../../styles/components/Search.module.scss"

interface CheckboxGroupProps {
  field: { value: string; label: string }
  appliedFilters: string[]
  options: ItemAggregationOption[]
  setAppliedFilters: Dispatch<React.SetStateAction<string[]>>
}

const RefineSearchCheckBoxField = ({
  field,
  appliedFilters,
  options,
  setAppliedFilters,
}: CheckboxGroupProps) => {
  const updateCheckboxGroupValue = (data: string[]) => {
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      [field.value]: data,
    }))
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
