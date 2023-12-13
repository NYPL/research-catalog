import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
} from "@nypl/design-system-react-components"
import type { SyntheticEvent } from "react"
import { useState } from "react"
import { useRouter } from "next/router"

import sampleFilters from "./sampleFilters.json"
import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import RefineSearchCheckBoxField from "./RefineSearchCheckboxField"

interface RefineSearchProps {
  toggleRefine: () => void
}

const RefineSearch = ({ toggleRefine }: RefineSearchProps) => {
  const fields = [
    { value: "materialType", label: "Format" },
    { value: "language", label: "Language" },
    { value: "dateAfter", label: "Start Year" },
    { value: "dateBefore", label: "End Year" },
    { value: "subjectLiteral", label: "Subject" },
  ]
  const router = useRouter()
  console.log(router.query)
  const [selectedFilters, setSelectedFilters] = useState({})
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
