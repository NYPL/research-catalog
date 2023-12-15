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
import {
  parseFilters,
  buildFilters,
  removeFiltersFromQuery,
} from "../../utils/refineSearchUtils"
import type { SearchResults } from "../../types/searchTypes"

interface RefineSearchProps {
  toggleRefine: () => void
  aggregations: SearchResults
}

const RefineSearch = ({ toggleRefine, aggregations }: RefineSearchProps) => {
  const fields = [
    { value: "materialType", label: "Format" },
    { value: "language", label: "Language" },
    { value: "dateAfter", label: "Start Year" },
    { value: "dateBefore", label: "End Year" },
    { value: "subjectLiteral", label: "Subject" },
  ]

  const router = useRouter()
  const [appliedFilters, setAppliedFilters] = useState(
    parseFilters(router.query)
  )

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const updatedQuery = {
      ...removeFiltersFromQuery(router.query),
      ...buildFilters(appliedFilters),
    }
    router.push({
      pathname: "/search",
      query: updatedQuery,
    })
    toggleRefine()
  }

  const handleClear = () => {
    setAppliedFilters(removeFiltersFromQuery(router.query))
    router.push({
      pathname: "/search",
      query: removeFiltersFromQuery(router.query),
    })
    toggleRefine()
  }

  return (
    <Form id="refine-search" onSubmit={handleSubmit}>
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
          <Button
            onClick={handleClear}
            id="reset-refine"
            type="reset"
            buttonType="secondary"
          >
            Clear Filters
          </Button>
          <Button id="submit-refine" type="submit" buttonType="secondary">
            Apply Filters
          </Button>
        </ButtonGroup>
      </Box>
      <HorizontalRule />
      {fields.map((field) => {
        const filterData = new SearchResultsFilters(aggregations, field)
        if (filterData.options) {
          return (
            <RefineSearchCheckBoxField
              setAppliedFilters={setAppliedFilters}
              key={field.label}
              field={field}
              appliedFilters={appliedFilters[field.value]}
              options={filterData.options}
            />
          )
        } else return null
      })}
    </Form>
  )
}

export default RefineSearch
