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
import { useEffect, useRef, useState } from "react"
import {
  buildFilterQuery,
  collapseMultiValueQueryParams,
  getQueryWithoutFiltersOrPage,
} from "../../utils/refineSearchUtils"
import type { Aggregation } from "../../types/filterTypes"
import { useFocusContext, idConstants } from "../../context/FocusContext"
import MultiSelectWithGroupTitles from "../AdvancedSearch/MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import { mapCollectionsIntoLocations } from "../../utils/advancedSearchUtils"
import DateFilter from "../DateFilter/DateFilter"
import { useDateFilter } from "../../hooks/useDateFilter"

let fields = [
  { value: "buildingLocation", label: "Item location" },
  { value: "format", label: "Format" },
  { value: "language", label: "Language" },
  { value: "dateFrom", label: "Start Year" },
  { value: "dateTo", label: "End Year" },
  { value: "subjectLiteral", label: "Subject" },
  { value: "collection", label: "Collection" },
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

  // Do not display Subject filter if there is no query term and a subject filter is applied
  if (
    (router.query?.q === "" || !router.query.q) &&
    (Object.hasOwn(appliedFilters, "subjectLiteral") || lockedFilterValue)
  ) {
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
          {!(field.value === "collection") ? (
            <MultiSelect
              sx={{
                "div > div > button": {
                  height: "40px",
                },
              }}
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
              items={filteredOptions
                .filter((option) => option.label && option.label.trim() !== "")
                .map((option) => ({
                  id: option.value,
                  name: `${option.label} (${option.count.toLocaleString()})`,
                }))}
            />
          ) : (
            <MultiSelectWithGroupTitles
              key={field.value}
              isBlockElement
              field={{ value: field.value, label: "Division" }}
              groupedItems={mapCollectionsIntoLocations(filteredOptions)}
              onChange={(e) => {
                handleCheckboxChange("division", e.target.id)
                setFocusedFilter(field.value)
              }}
              onClear={() => {
                handleFilterClear(field.value)
                setFocusedFilter(field.value)
              }}
              selectedItems={{
                [field.value]: {
                  items: appliedFilters[field.value],
                },
              }}
            />
          )}
        </div>
      )
    } else return null
  })

  const clearDates = () => {
    const newFilters = {
      ...appliedFilters,
      dateFrom: [""],
      dateTo: [""],
    }
    setAppliedFilters(newFilters)
    buildAndPushFilterQuery(newFilters)
  }

  const { dateFilterProps } = useDateFilter({
    dateFrom: appliedFilters.dateFrom?.[0],
    dateTo: appliedFilters.dateTo?.[0],
    applyHandler: () => {
      setFocusedFilter("date")
      setPersistentFocus(idConstants.applyDates)
      buildAndPushFilterQuery(appliedFilters)
    },
    changeHandler: (e: React.SyntheticEvent) => {
      const target = e.target as HTMLInputElement
      setAppliedFilters((prevFilters) => {
        return {
          ...prevFilters,
          [target.name]: [target.value],
        }
      })
    },
    clearHandler: clearDates,
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
        isDefaultOpen
        sx={{
          button: {
            fontWeight: "400 !important",
          },
          bg: "ui.white",
        }}
        accordionData={[
          {
            variant: "default",
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
