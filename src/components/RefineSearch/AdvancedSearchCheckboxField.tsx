import {
  FormRow,
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"
import { materialTypeOptions } from "../../utils/advancedSearchUtils"
import { searchAggregations } from "../../config/aggregations"

const AdvancedSearchCheckboxField = ({
  searchFormState,
  handleCheckboxChange,
  name,
  label,
}) => {
  const options = {
    format: materialTypeOptions,
    location: searchAggregations.buildingLocation,
  }
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
    <FormRow>
      <FormField id={`advancedSearchFormat${label}`} gap="grid.s">
        <CheckboxGroup
          id={name}
          name={name}
          labelText={label}
          onChange={handleCheckboxChange}
          value={searchFormState}
          __css={checkBoxCSS}
        >
          {options[name].map((materialType) => {
            return (
              <Checkbox
                id={materialType.value}
                key={materialType.value}
                labelText={materialType.label}
                value={materialType.value}
              />
            )
          })}
        </CheckboxGroup>
      </FormField>
    </FormRow>
  )
}

export default AdvancedSearchCheckboxField
