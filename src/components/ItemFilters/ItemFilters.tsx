import { type SyntheticEvent, useState, useRef } from "react"
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
  handleFiltersChange?: (
    newAppliedFilterQuery: ItemFilterQueryParams
  ) => Promise<void>
  appliedFilters?: AppliedItemFilters
  filtersAreApplied?: boolean
}

const ItemFilters = ({
  itemAggregations,
  handleFiltersChange,
  appliedFilters = { location: [], format: [], status: [], year: [] },
  filtersAreApplied = false,
}: ItemFilterContainerProps) => {
  // We have to set the year value in state to be able to test form control in jest.
  // TODO: Remove this if we can find a better way to test form submissions in jest.
  const [year, setYear] = useState(appliedFilters.year[0] || "")
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

  const submitFilters = async (selectedFilters: string[], field: string) => {
    const newFilters = { ...appliedFilters, [field]: selectedFilters }
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    const itemFilterQuery = buildItemFilterQuery(
      newFilters,
      locationFilterData.recapLocations
    )
    await handleFiltersChange(itemFilterQuery)
  }

  const clearAllFilters = async () => {
    setYear("")
    await handleFiltersChange({})
  }

  const handleRemoveFilter = async (id: string) => {
    if (id === "clear-filters") {
      await clearAllFilters()
    } else {
      setYear("")
      const [newValues, field] = removeValueFromFilters(id, appliedFilters)
      await submitFilters(newValues, field)
    }
  }

  const handleMultiSelectChange = async (filterId: string, field: string) => {
    const selectedFieldCheckboxes = appliedFilters[field]

    // If the filter value is already in the array of selected values, remove it. Otherwise, add it.
    if (selectedFieldCheckboxes.indexOf(filterId) >= 0) {
      await handleRemoveFilter(filterId)
    } else {
      await submitFilters([filterId, ...selectedFieldCheckboxes], field)
    }
  }

  const handleClearFilterGroup = async (field: string) => {
    await submitFilters([], field)
  }

  const handleYearSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await submitFilters(year.length ? [year] : [], "year")
  }

  // function for renderChildren prop of FilterBarInline
  const filterBarContent = () => {
    return (
      <>
        <MultiSelectGroup
          id="item-filters"
          labelText="Filter by"
          renderMultiSelect={renderMultiSelect}
        />
        <Box minWidth={{ md: 440 }}>
          <Label id="year-filter-label" htmlFor="searchbar-form-year-filter">
            Search by year
          </Label>
          <SearchBar
            id="year-filter"
            labelText="Apply year filter"
            aria-labelledby="year-filter-label"
            data-testid="year-filter"
            textInputProps={{
              placeholder: "YYYY",
              isClearable: true,
              labelText: "Search by year form input",
              name: "year-filter",
              value: year,
              onChange: ({ target }) => setYear(target.value),
              isClearableCallback: () => setYear(""),
            }}
            onSubmit={handleYearSubmit}
          />
        </Box>
      </>
    )
  }

  // function passed to filterElements map callback for generating renderMultiSelect prop of MultiSelectGroup
  const renderMultiSelect = ({ isBlockElement, multiSelectWidth }) =>
    filterData.map((itemFilterData: ItemFilterData) => {
      const checkboxGroup = itemFilterData.formattedFilterData
      return checkboxGroup?.items.length ? (
        <MultiSelect
          buttonText={checkboxGroup.name}
          id={`${checkboxGroup.id}`}
          data-testid={`${checkboxGroup.id}-multi-select`}
          items={checkboxGroup.items}
          key={checkboxGroup.id}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            await handleMultiSelectChange(e.target.id, checkboxGroup.id)
          }}
          selectedItems={{
            [checkboxGroup.id]: { items: appliedFilters[checkboxGroup.id] },
          }}
          isBlockElement={isBlockElement}
          onClear={() => handleClearFilterGroup(checkboxGroup.id)}
          width={multiSelectWidth}
          closeOnBlur
        />
      ) : null
    })

  return (
    <>
      <Box p="inset.wide" bg="ui.gray.x-light-cool" mb="m">
        <FilterBarInline
          id="item-filters-container"
          data-testid="item-filters-container"
          width="full"
          layout="row"
          sx={{ fieldset: { lg: { width: "45%" } } }}
          renderChildren={filterBarContent}
        />
      </Box>
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
            Active filters
          </Text>
          <TagSet
            id="bib-details-applied-filters"
            isDismissible
            type="filter"
            onClick={async (filterToRemove: TagSetFilterDataProps) => {
              await handleRemoveFilter(filterToRemove.id)
            }}
            tagSetData={appliedFiltersTagSetData}
          />
        </Box>
      ) : null}
    </>
  )
}

export default ItemFilters
