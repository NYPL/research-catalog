import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
} from "@nypl/design-system-react-components"
import type { Dispatch, SyntheticEvent } from "react"
import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/router"

import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import RefineSearchCheckBoxField from "./RefineSearchCheckboxField"
import {
  collapseMultiValueQueryParams,
  buildFilterQuery,
  getQueryWithoutFilters,
} from "../../utils/refineSearchUtils"
import type { Aggregation } from "../../types/filterTypes"

interface RefineSearchProps {
  aggregations: Aggregation[]
  setAppliedFilters: Dispatch<React.SetStateAction<Record<string, string[]>>>
  appliedFilters: Record<string, string[]>
}

const RefineSearch = ({
  aggregations,
  appliedFilters,
  setAppliedFilters,
}: RefineSearchProps) => {
  const router = useRouter()
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
      // maintain any non-filter query params, eg q=spaghetti
      ...getQueryWithoutFilters(router.query),
      // build out multi-value query params for selected filters
      ...buildFilterQuery(appliedFilters),
    }
    router.push({
      pathname: "/search",
      query: updatedQuery,
    })
    // refine search dialog closes after url is pushed
    toggleRefine()
  }

  const [refineSearchClosed, setRefineSearchClosed] = useState(true)

  // runs when refine search button is clicked to open and close the dialog
  const toggleRefine = useCallback(() => {
    setRefineSearchClosed((prevRefineSearchClosed) => {
      // if refine search is open (and this toggle is going to close it)
      if (!prevRefineSearchClosed) {
        // reset filters to the values from the url (removing those that were
        // clicked on but left unapplied)
        setAppliedFilters(collapseMultiValueQueryParams(router.query))
      }
      return !prevRefineSearchClosed
    })
  }, [router.query, setAppliedFilters, setRefineSearchClosed])

  const handleClear = () => {
    // remove applied filters from state
    // console.log(getQueryWithoutFilters(router.query))
    setAppliedFilters({})
    // pushing to router with just the original query will refetch the bibs
    router.push({
      pathname: "/search",
      query: getQueryWithoutFilters(router.query),
    })
    // close the dialog
    toggleRefine()
  }

  return (
    <Box className={styles.refineSearchContainer}>
      {refineSearchClosed ? (
        <Box className={styles.refineSearchInner}>
          <Button
            onClick={toggleRefine}
            id="refine-search"
            buttonType="secondary"
          >
            Refine Search
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
                data-testid="clear-filters-button"
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
          {filters}
        </Form>
      )}
    </Box>
  )
}

export default RefineSearch
