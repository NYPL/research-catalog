import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
} from "@nypl/design-system-react-components"
import type { SyntheticEvent } from "react"
import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/router"

import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import RefineSearchCheckBoxField from "./RefineSearchCheckboxField"
import {
  parseFilters,
  buildFilters,
  removeFiltersFromQuery,
} from "../../utils/refineSearchUtils"
import type { Aggregation } from "../../types/filterTypes"

interface RefineSearchProps {
  aggregations: Aggregation[]
}

const RefineSearch = ({ aggregations }: RefineSearchProps) => {
  const router = useRouter()
  const [appliedFilters, setAppliedFilters] = useState(
    parseFilters(router.query)
  )

  const fields = useRef([
    { value: "materialType", label: "Format" },
    { value: "language", label: "Language" },
    { value: "dateAfter", label: "Start Year" },
    { value: "dateBefore", label: "End Year" },
    { value: "subjectLiteral", label: "Subject" },
  ]).current

  const filters = fields.map((field) => {
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
  })

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

  const [refineSearchClosed, setRefineSearchClosed] = useState(true)

  const toggleRefine = useCallback(() => {
    setRefineSearchClosed((prevState) => {
      if (!prevState) setAppliedFilters(parseFilters(router.query))
      return !prevState
    })
  }, [router.query, setAppliedFilters, setRefineSearchClosed])

  const handleClear = () => {
    setAppliedFilters(removeFiltersFromQuery(router.query))
    router.push({
      pathname: "/search",
      query: removeFiltersFromQuery(router.query),
    })
    toggleRefine()
  }
  return (
    <Box className={styles.refineSearchContainer}>
      {refineSearchClosed ? (
        <Box className={styles.refineSearchInner}>
          <Button
            data-testId="refine-search-button"
            onClick={toggleRefine}
            id="refine-search"
            buttonType="secondary"
          >
            {"Refine Search"}
          </Button>
        </Box>
      ) : (
        <Form
          className={styles.refineSearchInner}
          id="refine-search"
          onSubmit={handleSubmit}
        >
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
                data-testId="clear-filters-button"
              >
                Clear Filters
              </Button>
              <Button
                data-testId="apply-filters-button"
                id="submit-refine"
                type="submit"
                buttonType="secondary"
              >
                Apply Filters
              </Button>
            </ButtonGroup>
          </Box>
          <HorizontalRule />
          {filters}
        </Form>
      )}
    </Box>
  )
}

export default RefineSearch
