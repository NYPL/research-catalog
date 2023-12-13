import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
  FormField,
  CheckboxGroup,
  Checkbox,
} from "@nypl/design-system-react-components"

import sampleFilters from "./sampleFilters.json"
import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"

interface RefineSearchProps {
  toggleRefine: () => void
}

const RefineSearch = ({ toggleRefine }: RefineSearchProps) => {
  const filterData = new SearchResultsFilters(sampleFilters)
  console.log(filterData)
  return (
    <Form id="refine-search">
      <HorizontalRule />
      <Box className={styles.refineButtons}>
        <Button
          onClick={toggleRefine}
          id="cancel-refine"
          buttonType="secondary"
        >
          Cancel
        </Button>
        <ButtonGroup className={styles.re}>
          <Button id="reset-refine" type="reset" buttonType="secondary">
            Clear Filters
          </Button>
          <Button id="submit-refine" type="submit" buttonType="secondary">
            Apply Filters
          </Button>
        </ButtonGroup>
      </Box>
      <HorizontalRule />
      <FormField>
        <CheckboxGroup id="refine-format" labelText="format" name="format">
          {filterData.format.map(({ value, label }) => {
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
      </FormField>
    </Form>
  )
}

export default RefineSearch
