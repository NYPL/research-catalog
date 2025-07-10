import {
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"
import type { Option } from "../../types/filterTypes"

interface SearchFilterCheckboxFieldProps {
  searchFormState: string[]
  handleCheckboxChange: (e: string[]) => void
  options: Option[]
  name: string
  label: string
  gridOptions?: { min: number; max: number }
}

const SearchFilterCheckboxField = ({
  searchFormState,
  handleCheckboxChange,
  name,
  label,
  options,
  gridOptions = { min: 2, max: 2 },
}: SearchFilterCheckboxFieldProps) => {
  const checkBoxCSS = {
    "> div": {
      display: "grid",
      gridTemplateColumns: {
        md: `repeat(${gridOptions.max}, minmax(0, 1fr))`,
        base: `repeat(${gridOptions.min}, minmax(0, 1fr))`,
      },
      gridGap: "var(--nypl-space-s)",
      div: {
        marginTop: "0 !important",
      },
    },
  }

  const checkboxes = options.map(({ value, label, count }) => {
    const labelCount = count ? ` (${count})` : ""

    return (
      <Checkbox
        id={value}
        key={value}
        value={value}
        labelText={
          <>
            {label}
            {labelCount}
          </>
        }
      />
    )
  })

  return (
    <FormField id={`search-${label}`} gap="grid.s">
      <CheckboxGroup
        id={`search-${name}`}
        name={name}
        labelText={label}
        onChange={handleCheckboxChange}
        value={searchFormState}
        __css={checkBoxCSS}
      >
        {checkboxes}
      </CheckboxGroup>
    </FormField>
  )
}

export default SearchFilterCheckboxField
