import {
  Card,
  CardContent,
  CardHeading,
  Flex,
  MultiSelect,
} from "@nypl/design-system-react-components"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  buildFilterQuery,
  collapseMultiValueQueryParams,
  getQueryWithoutFilters,
} from "../../utils/refineSearchUtils"

const fields = [
  { value: "buildingLocation", label: "Item location" },
  { value: "format", label: "Format" },
  { value: "language", label: "Language" },
  { value: "dateAfter", label: "Start Year" },
  { value: "dateBefore", label: "End Year" },
  { value: "subjectLiteral", label: "Subject" },
]

const FilterPrototype = ({ aggregations }) => {
  const router = useRouter()
  const [appliedFilters, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )
  useEffect(() => {
    const collapsedFilters = collapseMultiValueQueryParams(router.query)
    setAppliedFilters(collapsedFilters)
  }, [router.query])

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

      // Update URL query
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
  const filters = fields
    .map((field) => {
      const filterData = new SearchResultsFilters(aggregations, field)
      if (filterData.options && field) {
        return (
          <MultiSelect
            key={field.value}
            isDefaultOpen={field.value !== "subjectLiteral"}
            defaultItemsVisible={3}
            isBlockElement
            isSearchable={field.value !== "buildingLocation"}
            id={field.value}
            buttonText={field.label}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChange(field.value, e.target.id)
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
        )
      }
    })
    .filter(Boolean)

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
        </Flex>
      </CardContent>
    </Card>
  )
}

export default FilterPrototype
