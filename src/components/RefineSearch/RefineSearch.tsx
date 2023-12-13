import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import sampleFilters from "./sampleFilters.json"
import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import RefineSearchCheckBoxField from "./RefineSearchCheckboxField"

interface RefineSearchProps {
  toggleRefine: () => void
}

const RefineSearch = ({ toggleRefine }: RefineSearchProps) => {
  const fields = ["materialType"]
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
        return (
          <RefineSearchCheckBoxField
            key={field}
            field={field}
            activeFilters={activeFilters}
            options={filterData.options}
          />
        )
      })}
    </Form>
  )
}

export default RefineSearch
