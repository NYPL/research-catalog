import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
  Form,
  Icon,
} from "@nypl/design-system-react-components"
import type { Dispatch, SyntheticEvent } from "react"
import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import DateForm from "../SearchFilters/DateForm"
import { useDateForm } from "../../hooks/useDateForm"

import styles from "../../../styles/components/Search.module.scss"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import RefineSearchCheckBoxField from "./RefineSearchCheckboxField"
import {
  collapseMultiValueQueryParams,
  buildFilterQuery,
  getQueryWithoutFilters,
} from "../../utils/refineSearchUtils"
import type {
  Aggregation,
  CollapsedMultiValueAppliedFilters,
} from "../../types/filterTypes"

const fields = [
  { value: "materialType", label: "Format" },
  { value: "language", label: "Language" },
  { value: "dateAfter", label: "Start Year" },
  { value: "dateBefore", label: "End Year" },
  { value: "subjectLiteral", label: "Subject" },
]
interface RefineSearchProps {
  aggregations: Aggregation[]
  setAppliedFilters: Dispatch<
    React.SetStateAction<CollapsedMultiValueAppliedFilters>
  >
  appliedFilters: CollapsedMultiValueAppliedFilters
}

/**
 * Renders a button that when clicked opens the Refine Search dialog.
 */
const RefineSearch = ({
  aggregations,
  appliedFilters,
  setAppliedFilters,
}: RefineSearchProps) => {
  const router = useRouter()
  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]
  const { dateFormProps, validateDateRange } = useDateForm({
    changeHandler: (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement
      // update the parent state to know about the updated dateValues
      setAppliedFilters((prevFilters) => {
        return {
          ...prevFilters,
          [target.name]: [target.value],
        }
      })
    },
    inputRefs: dateInputRefs,
    dateAfter: appliedFilters.dateAfter?.[0],
    dateBefore: appliedFilters.dateBefore?.[0],
  })

  const filters = fields
    .map((field) => {
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
    .concat(<DateForm {...dateFormProps} />)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (validateDateRange() === false) return
    const updatedQuery = {
      // maintain any non-filter query params, eg q=spaghetti, journalTitle=pasta%20fancy
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
        <Button
          className={styles.refineSearchButton}
          onClick={toggleRefine}
          id="refine-search"
          buttonType="secondary"
        >
          Refine Search
        </Button>
      ) : (
        <Form
          className={styles.refineSearchInner}
          id="refine-search"
          onSubmit={handleSubmit}
        >
          <HorizontalRule sx={{ marginBottom: 0 }} />
          <Box className={styles.refineButtons}>
            <Button
              onClick={toggleRefine}
              id="cancel-refine"
              buttonType="secondary"
            >
              <Icon name="close" size="large" align="left" />
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
                <Icon name="actionDelete" align="left" size="large" />
                Clear Filters
              </Button>
              <Button id="submit-refine" type="submit" buttonType="primary">
                <Icon name="check" align="left" size="large" />
                Apply Filters
              </Button>
            </ButtonGroup>
          </Box>
          <HorizontalRule sx={{ marginTop: 0 }} />
          {filters}
        </Form>
      )}
    </Box>
  )
}

export default RefineSearch
