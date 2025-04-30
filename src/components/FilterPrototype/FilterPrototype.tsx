import {
  Card,
  CardContent,
  CardHeading,
  Flex,
  MultiSelect,
} from "@nypl/design-system-react-components"
import SearchResultsFilters from "../../models/SearchResultsFilters"
import { useRouter } from "next-router-mock"
import { useEffect, useState } from "react"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"

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
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [appliedFilters, router.query])

  const handleCheckboxChange = (field: string) => {
    // update the parent state to know about the updated selected values
    // setAppliedFilters((prevFilters) => {
    //   return {
    //     ...prevFilters,
    //     [field]: data,
    //   }
    // })
  }

  const filters = fields
    .map((field) => {
      const filterData = new SearchResultsFilters(aggregations, field)
      if (!filterData.options?.length) return null
      return (
        <MultiSelect
          key={field.value}
          isDefaultOpen
          defaultItemsVisible={2}
          isBlockElement
          isSearchable
          id={field.value}
          buttonText={field.label}
          onChange={() => handleCheckboxChange(field.value)}
          items={filterData.options.map((option) => ({
            id: option.value,
            name: option.label,
          }))}
          selectedItems={{}}
        />
      )
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
      <CardHeading size="h6" id="filter-results-heading">
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
