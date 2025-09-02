import {
  Accordion,
  Card,
  CardContent,
  Flex,
  MultiSelect,
} from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import { useRouter } from "next/router"
import type { SyntheticEvent } from "react"
import { useEffect, useRef, useState } from "react"
import {
  buildFilterQuery,
  collapseMultiValueQueryParams,
  getQueryWithoutFiltersOrPage,
} from "../../utils/refineSearchUtils"
import type { Aggregation } from "../../types/filterTypes"
import DateFilter from "./DateFilter"
import { useDateFilter } from "../../hooks/useDateFilter"
import { useFocusContext, idConstants } from "../../context/FocusContext"

let fields = [
  { value: "buildingLocation", label: "Item location" },
  { value: "format", label: "Format" },
  { value: "language", label: "Language" },
  { value: "dateAfter", label: "Start Year" },
  { value: "dateBefore", label: "End Year" },
  { value: "subjectLiteral", label: "Subject" },
]

const SearchFilters = ({
  aggregations,
  lockedFilterValue,
}: {
  aggregations?: Aggregation[]
  lockedFilterValue?: string
}) => {
  const router = useRouter()

  const [appliedFilters, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )
  const { setPersistentFocus } = useFocusContext()
  useEffect(() => {
    const collapsedFilters = collapseMultiValueQueryParams(router.query)
    setAppliedFilters(collapsedFilters)
    setFocusedFilter(null)
  }, [router.query])

  const buildAndPushFilterQuery = (newFilters) => {
    const updatedQuery = {
      ...getQueryWithoutFiltersOrPage(router.query),
      ...buildFilterQuery(newFilters),
    }
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    )
  }

  const handleFilterClear = (field: string) => {
    const newFilters = {
      ...appliedFilters,
      [field]: [],
    }
    setPersistentFocus(
      `accordion-button-multi-select-accordion-${field}-item-0`
    )
    setAppliedFilters(newFilters)
    buildAndPushFilterQuery(newFilters)
  }
  const handleCheckboxChange = (field: string, optionValue: string) => {
    const currentValues = appliedFilters[field] || []
    const isAlreadySelected = currentValues.includes(optionValue)
    const updatedValues = isAlreadySelected
      ? currentValues.filter((val) => val !== optionValue)
      : [...currentValues, optionValue]
    const newFilters = {
      ...appliedFilters,
      [field]: updatedValues,
    }
    setPersistentFocus(optionValue)
    setAppliedFilters(newFilters)
    buildAndPushFilterQuery(newFilters)
  }

  const [focusedFilter, setFocusedFilter] = useState<string | null>(null)

  // Only display Subject filter if there's a query term
  if (router.query?.q === "" || !router.query.q) {
    fields = fields.filter((field) => field.label !== "Subject")
  }

  const filters = fields.map((field) => {
    const filterData = new SearchResultsFilters(aggregations, field)
    if (filterData.options) {
      // Do not display any locked filter values
      const filteredOptions = filterData.options.filter(
        (opt) => opt.value !== lockedFilterValue
      )
      return (
        <div
          key={field.value}
          style={{
            opacity: focusedFilter && focusedFilter !== field.value ? 0.4 : 1,
            pointerEvents:
              focusedFilter && focusedFilter !== field.value ? "none" : "unset",
            transition: "opacity 0.2s ease",
          }}
        >
          <MultiSelect
            isDefaultOpen={field.value !== "subjectLiteral"}
            defaultItemsVisible={1}
            isBlockElement
            isSearchable={field.value !== "buildingLocation"}
            id={field.value}
            buttonText={field.label}
            onClear={() => {
              handleFilterClear(field.value)
              setFocusedFilter(field.value)
            }}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChange(field.value, e.target.id)
              setFocusedFilter(field.value)
            }}
            selectedItems={{
              [field.value]: {
                items: appliedFilters[field.value] || [],
              },
            }}
            items={filteredOptions.map((option) => ({
              id: option.value,
              name: `${option.label} (${option.count.toLocaleString()})`,
            }))}
          />
        </div>
      )
    } else return null
  })

  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]

  const { dateFilterProps, validateDateRange } = useDateFilter({
    changeHandler: (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement
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
    applyHandler: () => {
      setFocusedFilter("date")
      if (validateDateRange() === false) {
        setFocusedFilter(null)
        return
      }
      setPersistentFocus(idConstants.applyDates)
      buildAndPushFilterQuery(appliedFilters)
    },
  })

  const dateFilter = (
    <div
      key="date"
      style={{
        opacity: focusedFilter && focusedFilter !== "date" ? 0.4 : 1,
        pointerEvents:
          focusedFilter && focusedFilter !== "date" ? "none" : "unset",
        transition: "opacity 0.2s ease",
      }}
    >
      <Accordion
        data-testid="date-accordion"
        id="date"
        sx={{
          button: {
            fontWeight: "400 !important",
          },
          bg: "ui.white",
        }}
        accordionData={[
          {
            accordionType: "default",
            ariaLabel: "Date filter",
            label: "Date",
            panel: (
              <Card isCentered layout="row">
                <CardContent>
                  <DateFilter {...dateFilterProps} />
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </div>
  )

  return (
    <Flex flexDir="column" gap="s" pt="xxs" width="100%">
      {filters}
      {dateFilter}
    </Flex>
  )
}

export default SearchFilters
