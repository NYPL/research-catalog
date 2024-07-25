import { type SyntheticEvent, useRef } from "react"
import React from "react"
import {
  FilterBarInline,
  MultiSelectGroup,
  MultiSelect,
  SearchBar,
  Box,
  Text,
  Label,
  TagSet,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"
import type {
  Aggregation,
  ItemFilterQueryParams,
  AppliedItemFilters,
} from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/ItemFilterData"
import {
  buildAppliedFiltersTagSetData,
  buildItemFilterQuery,
  removeValueFromFilters,
} from "../../utils/itemFilterUtils"

interface ItemFilterContainerProps {
  itemAggregations: Aggregation[]
  handleFiltersChange?: (newAppliedFilterQuery: ItemFilterQueryParams) => void
  appliedFilters?: AppliedItemFilters
  filtersAreApplied?: boolean
}

const FiltersContainer = ({
  itemAggregations,
  handleFiltersChange,
  appliedFilters = { location: [], format: [], status: [], year: [] },
  filtersAreApplied = false,
}: ItemFilterContainerProps) => {
  const filterData = useRef<ItemFilterData[]>(
    itemAggregations.map((aggregation: Aggregation) => {
      if (aggregation.field === "location")
        return new LocationFilterData(aggregation)
      else return new ItemFilterData(aggregation)
    })
  ).current

  const appliedFiltersTagSetData = buildAppliedFiltersTagSetData(
    appliedFilters,
    filterData
  )

  const submitFilters = (selectedFilters: string[], field: string) => {
    const newFilters = { ...appliedFilters, [field]: selectedFilters }
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    const itemFilterQuery = buildItemFilterQuery(
      newFilters,
      locationFilterData.recapLocations()
    )
    handleFiltersChange(itemFilterQuery)
  }

  const clearAllFilters = () => {
    handleFiltersChange({})
  }

  const handleRemoveFilterClick = ({ id }: TagSetFilterDataProps) => {
    if (id === "clear-filters") {
      clearAllFilters()
    } else {
      const [filtersWithValueRemoved, field] = removeValueFromFilters(
        id,
        appliedFilters
      )
      if (filtersWithValueRemoved && field)
        submitFilters(filtersWithValueRemoved, field)
    }
  }

  const handleYearSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const year = e.target[0].value
    submitFilters([year], "year")
  }

  const multiSelectItems = [
    {
      id: "location",
      name: "Location",
      items: [{ id: "item-id", name: "Test" }],
    },
    {
      id: "format",
      name: "Format",
      items: [],
    },
    {
      id: "status",
      name: "Status",
      items: [],
    },
  ]

  const selectedItems = {}

  return (
    <>
      <FilterBarInline
        id="item-filters-container"
        p="s"
        width="full"
        layout="row"
        bg="ui.gray.x-light-cool"
        mb="m"
        sx={{ fieldset: { lg: { width: "50%" } } }}
        renderChildren={() => (
          <>
            <MultiSelectGroup
              id="item-filters"
              labelText="Filter by"
              renderMultiSelect={() => {
                return multiSelectItems.map((multiSelect) => (
                  <MultiSelect
                    buttonText={multiSelect.name}
                    id={multiSelect.id}
                    items={multiSelect.items}
                    key={multiSelect.id}
                    width="fitContent"
                    __css={{ flex: 1 }}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      console.log(e.target.value)
                    }}
                    onClear={() => {
                      console.log(multiSelect.id)
                    }}
                    selectedItems={selectedItems}
                  />
                ))
              }}
            />
            <Box minWidth={440}>
              <Label
                id="year-filter-label"
                htmlFor="year-filter"
                data-testid="year-filter-label"
              >
                Search by Year
              </Label>
              <SearchBar
                id="year-filter"
                labelText="Apply"
                textInputProps={{
                  placeholder: "YYYY",
                  isClearable: true,
                  labelText: "Search by year",
                  name: "textInputName",
                  value: appliedFilters.year[0] || "",
                }}
                onSubmit={handleYearSubmit}
              />
            </Box>
          </>
        )}
      />
      {filtersAreApplied ? (
        <Box display="flex" mr="s" mb="m">
          <Text
            fontSize="body2"
            fontWeight="bold"
            mr="s"
            mb={0}
            lineHeight={2}
            display="table-cell"
          >
            Filters Applied
          </Text>
          <TagSet
            id="bib-details-applied-filters"
            isDismissible
            type="filter"
            onClick={handleRemoveFilterClick}
            tagSetData={appliedFiltersTagSetData}
          />
        </Box>
      ) : null}
    </>
  )
}

export default FiltersContainer
