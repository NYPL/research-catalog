import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
} from "@nypl/design-system-react-components"
import type { SyntheticEvent } from "react"

import sampleFilters from "./sampleFilters.json"
import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import RefineSearchCheckBoxField from "./RefineSearchCheckboxField"

interface RefineSearchProps {
  toggleRefine: () => void
}

const RefineSearch = ({ toggleRefine }: RefineSearchProps) => {
  const fields = [
    { value: "materialType", label: "Format", selectedOptions: [] },
    { value: "language", label: "Language", selectedOptions: [] },
    { value: "dateAfter", label: "Start Year", selectedOptions: [] },
    { value: "dateBefore", label: "End Year", selectedOptions: [] },
    { value: "subjectLiteral", label: "Subject", selectedOptions: [] },
  ]
  // these should be constructed from the url so we can reset to the original search.
  const activeFilters = ["resourcetypes:txt"]
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
      {fields.map((field) => {
        const filterData = new SearchResultsFilters(sampleFilters, field)
        if (filterData.options) {
          return (
            <RefineSearchCheckBoxField
              key={field.label}
              field={field}
              activeFilters={activeFilters}
              options={filterData.options}
            />
          )
        } else return null
      })}
    </Form>
  )
}

export default RefineSearch
