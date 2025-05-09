import {
  Accordion,
  Card,
  CardContent,
  CardHeading,
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
  getQueryWithoutFilters,
} from "../../utils/refineSearchUtils"
import DatePrototype from "../SearchFilters/DatePrototype"
import type { Aggregation } from "../../types/filterTypes"

const fields = [
  { value: "buildingLocation", label: "Item location" },
  { value: "format", label: "Format" },
  { value: "language", label: "Language" },
  { value: "dateAfter", label: "Start Year" },
  { value: "dateBefore", label: "End Year" },
  { value: "subjectLiteral", label: "Subject" },
]

const FilterPrototype = ({
  aggregations,
}: {
  aggregations?: Aggregation[]
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
                  ? `Offsite (${option.count})`
                  : `${option.label} (${option.count})`,
            }))}
          />
        </div>
      )
    } else return null
  })

  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]
  const dateFormProps = {
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
    applyHandler: () => {
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
                  <DatePrototype {...dateFormProps} />
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </div>
  )

  return (
    <Card
      id="filter-sidebar-container"
      backgroundColor="ui.bg.default"
      p="s"
      borderRadius="5px"
      mb="s"
    >
      <CardHeading size="heading6" id="filter-results-heading">
        Filter results
      </CardHeading>
      <CardContent>
        <Flex flexDir="column" gap="s">
          {filters}
          {dateFilter}
        </Flex>
      </CardContent>
    </Card>
  )
}

export default FilterPrototype
