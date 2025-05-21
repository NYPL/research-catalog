import {
  Accordion,
  Card,
  CardContent,
  Flex,
  MultiSelect,
} from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import { useEffect, useRef, useState } from "react"
import type { Aggregation } from "../../types/filterTypes"
import { useRouter } from "next/router"
import {
  buildFilterQuery,
  collapseMultiValueQueryParams,
  getQueryWithoutFilters,
} from "../../utils/refineSearchUtils"
import DateFilter from "./DateFilter"

const fields = [
  { value: "buildingLocation", label: "Item location" },
  { value: "format", label: "Format" },
  { value: "language", label: "Language" },
  { value: "dateAfter", label: "Start Year" },
  { value: "dateBefore", label: "End Year" },
  { value: "subjectLiteral", label: "Subject" },
]

const MobileSearchFilters = ({
  aggregations,
}: {
  aggregations: Aggregation[]
}) => {
  const router = useRouter()
  const [appliedFilters, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )

  useEffect(() => {
    const collapsedFilters = collapseMultiValueQueryParams(router.query)
    setAppliedFilters(collapsedFilters)
    setFocusedFilter(null)
  }, [router.query])

  const handleFilterClear = (field: string) => {
    setAppliedFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [field]: [],
      }

      const updatedQuery = {
        ...getQueryWithoutFilters(router.query),
        ...buildFilterQuery(newFilters),
      }

      router.push(
        {
          pathname: "/search",
          query: updatedQuery,
        },
        undefined,
        { scroll: false }
      )

      return newFilters
    })
  }

  const handleCheckboxChange = (field: string, optionValue: string) => {
    setAppliedFilters((prevFilters) => {
      const currentValues = prevFilters[field] || []
      const isAlreadySelected = currentValues.includes(optionValue)
      const updatedValues = isAlreadySelected
        ? currentValues.filter((val) => val !== optionValue)
        : [...currentValues, optionValue]

      const newFilters = {
        ...prevFilters,
        [field]: updatedValues,
      }

      const updatedQuery = {
        ...getQueryWithoutFilters(router.query),
        ...buildFilterQuery(newFilters),
      }

      router.push(
        {
          pathname: "/search",
          query: updatedQuery,
        },
        undefined,
        { scroll: false }
      )

      return newFilters
    })
  }

  const [focusedFilter, setFocusedFilter] = useState<string | null>(null)
  const filters = fields.map((field) => {
    const filterData = new SearchResultsFilters(aggregations, field)
    if (filterData.options) {
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
            defaultItemsVisible={3}
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
            items={filterData.options.map((option) => ({
              id: option.value,
              name:
                option.value === "rc"
                  ? `Offsite - deliverable to all NYPL research libraries (${option.count})`
                  : `${option.label} (${option.count})`,
            }))}
          />
        </div>
      )
    } else return null
  })

  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]
  const dateFormProps = {
    setAppliedFilters: setAppliedFilters,
    inputRefs: dateInputRefs,
    dateAfter: appliedFilters.dateAfter?.[0],
    dateBefore: appliedFilters.dateBefore?.[0],
    applyHandler: () => {
      setFocusedFilter("date")
      const updatedQuery = {
        ...getQueryWithoutFilters(router.query),
        ...buildFilterQuery(appliedFilters),
      }
      router.push(
        {
          pathname: "/search",
          query: updatedQuery,
        },
        undefined,
        { scroll: false }
      )
    },
  }

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
        data-testid="acc"
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
                  <DateFilter {...dateFormProps} />
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </div>
  )

  return (
    <Flex flexDir="column" gap="s" pt="xxs">
      {filters}
      {dateFilter}
    </Flex>
  )
}

export default MobileSearchFilters
