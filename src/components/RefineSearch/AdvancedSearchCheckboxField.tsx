import {
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"

// TODO: standardize refine search and advanced search checkbox fields
const AdvancedSearchCheckboxField = ({
  searchFormState,
  handleCheckboxChange,
  name,
  label,
  options,
}) => {
  const checkBoxCSS = {
    "> div": {
      display: "grid",
      gridTemplateColumns: { md: "repeat(2, minmax(0, 1fr))" },
      gridGap: "var(--nypl-space-s)",
      div: {
        marginTop: "0 !important",
      },
    },
  }

  return (
    <FormField id={`advancedSearchFormat${label}`} gap="grid.s">
      <CheckboxGroup
        id={name}
        name={name}
        labelText={label}
        onChange={handleCheckboxChange}
        value={searchFormState}
        __css={checkBoxCSS}
      >
        {options.map((option) => {
          return (
            <Checkbox
              id={option.value}
              key={option.value}
              labelText={option.label}
              value={option.value}
            />
          )
        })}
      </CheckboxGroup>
    </FormField>
  )
}

export default AdvancedSearchCheckboxField
