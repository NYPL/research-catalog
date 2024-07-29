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
  type MultiSelectProps,
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

const ItemFilters = ({
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

  // TODO: Replace this with actual filter data
  const multiSelectElements: MultiSelectProps[] = [
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

  // TODO: Connect this to the actual selected filters
  const appliedFilterElements = {}

  // function for renderChildren prop of FilterBarInline
  const filterBarContent = () => {
    return (
      <>
        <MultiSelectGroup
          id="item-filters"
          labelText="Filter by"
          renderMultiSelect={() => multiSelectElements.map(renderMultiSelect)}
        />
        <Box minWidth="440">
          <Label id="year-filter-label" htmlFor="year-filter">
            Search by Year
          </Label>
          <SearchBar
            id="year-filter"
            labelText="Apply"
            aria-labelledby="year-filter-label"
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
    )
  }

  // function passed to multiSelectElements map callback for generating renderMultiSelect prop of MultiSelectGroup
  const renderMultiSelect = (multiSelect: MultiSelectProps) => {
    return (
      <MultiSelect
        buttonText={multiSelect.name}
        id={`${multiSelect.id}-multi-select`}
        data-testid={`${multiSelect.id}-multi-select`}
        items={multiSelect.items}
        key={multiSelect.id}
        width="fitContent"
        __css={{ flex: 1 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          console.log(e.target.value)
        }}
        onClear={() => {
          console.log(multiSelect.id)
        }}
        selectedItems={appliedFilterElements}
      />
    )
  }

  return (
    <>
      <FilterBarInline
        id="item-filters-container"
        data-testid="item-filters-container"
        p="s"
        width="full"
        layout="row"
        bg="ui.gray.x-light-cool"
        mb="m"
        sx={{ fieldset: { lg: { width: "45%" } } }}
        onSubmit={() => {
          // TODO: Pass active filters and refactor submitFilters to handle all filters
          submitFilters([], "field")
        }}
        onClear={() => {
          clearAllFilters()
        }}
        renderChildren={filterBarContent}
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

export default ItemFilters
