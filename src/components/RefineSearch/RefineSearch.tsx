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
import { useState, useCallback, useRef, useEffect } from "react"
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
    toggleRefine()
  }

  // the two buttons can share a ref because they are never rendered at the same
  // time.
  const refineOrCancelRef = useRef(null)

  const [refineSearchClosed, setRefineSearchClosed] = useState(true)

  // focus has to happen after refineSearchClosed updates in order for the
  // element we want to focus on to be present in the dom.
  useEffect(() => {
    refineOrCancelRef.current.focus()
  }, [refineSearchClosed])

  // runs when refine search button is clicked to open and close the dialog
  const toggleRefine = useCallback(() => {
    setRefineSearchClosed((closed) => !closed)
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [setRefineSearchClosed, setAppliedFilters, router.query])

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
          ref={refineOrCancelRef}
          onClick={toggleRefine}
          id="refine-search"
          buttonType="secondary"
          backgroundColor="ui.white"
          className={styles.refineSearchButton}
        >
          Refine Search
        </Button>
      ) : (
        <Form
          className={styles.refineSearchInner}
          id="refine-search"
          onSubmit={handleSubmit}
        >
          <HorizontalRule mb={0} />
          <Box className={styles.refineButtons}>
            <Button
              onClick={toggleRefine}
              id="cancel-refine"
              buttonType="secondary"
              ref={refineOrCancelRef}
              backgroundColor="ui.white"
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
                backgroundColor="ui.white"
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
          <HorizontalRule m={0} />
          {filters}
        </Form>
      )}
    </Box>
  )
}

export default RefineSearch
