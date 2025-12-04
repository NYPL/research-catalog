import { type SyntheticEvent, useState, useRef } from "react"
import React from "react"
import {
  FilterBarInline,
  MultiSelectGroup,
  MultiSelect,
  SearchBar,
  Box,
  Label,
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
import ActiveFilters from "./ActiveFilters"

interface ItemFilterContainerProps {
  itemAggregations: Aggregation[]
  handleFiltersChange?: (
    newAppliedFilterQuery: ItemFilterQueryParams,
    refreshedViaCheckbox?: boolean
  ) => Promise<void>
  appliedFilters?: AppliedItemFilters
  filtersAreApplied?: boolean
  showDateFilter?: boolean
}

const ItemFilters = ({
  itemAggregations,
  handleFiltersChange,
  appliedFilters = { location: [], status: [], year: [] },
  filtersAreApplied = false,
  showDateFilter = false,
}: ItemFilterContainerProps) => {
  // We have to set the year value in state to be able to test form control in jest.
  // TODO: Remove this if we can find a better way to test form submissions in jest.
  const [year, setYear] = useState(appliedFilters.year[0] || "")

  const [invalidYear, setInvalidYear] = useState(false)

  const filterData = useRef<ItemFilterData[]>(
    itemAggregations
      .filter((aggregation: Aggregation) => aggregation.field !== "format")
      .map((aggregation: Aggregation) => {
        if (aggregation.field === "location") {
          return new LocationFilterData(aggregation)
        } else {
          return new ItemFilterData(aggregation)
        }
      })
  ).current

  const appliedFiltersTagSetData = buildAppliedFiltersTagSetData(
    appliedFilters,
    filterData
  )

  const submitFilters = async (
    selectedFilters: string[],
    field: string,
    refreshedViaCheckbox = false
  ) => {
    const newFilters = { ...appliedFilters, [field]: selectedFilters }
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    const itemFilterQuery = buildItemFilterQuery(
      newFilters,
      locationFilterData.recapLocations
    )
    await handleFiltersChange(itemFilterQuery, refreshedViaCheckbox)
  }

  const clearAllFilters = async () => {
    setYear("")
    await handleFiltersChange({})
  }

  const handleRemoveFilter = async (
    id: string,
    refreshedViaCheckbox = false
  ) => {
    if (id === "clear-filters") {
      await clearAllFilters()
    } else {
      setYear("")
      const [newValues, field] = removeValueFromFilters(id, appliedFilters)
      await submitFilters(newValues, field, refreshedViaCheckbox)
    }
  }

  const handleMultiSelectChange = async (filterId: string, field: string) => {
    const selectedFieldCheckboxes = appliedFilters[field]

    // If the filter value is already in the array of selected values, remove it. Otherwise, add it.
    if (selectedFieldCheckboxes.indexOf(filterId) >= 0) {
      await handleRemoveFilter(filterId, true)
    } else {
      await submitFilters([filterId, ...selectedFieldCheckboxes], field, true)
    }
  }

  const handleClearFilterGroup = async (field: string) => {
    await submitFilters([], field)
  }

  const handleYearSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const isNumeric: boolean = /^[0-9]*$/.test(year)

    if (year.length !== 4 || !isNumeric) {
      setInvalidYear(true)
    } else {
      setInvalidYear(false)
      await submitFilters([year], "year")
    }
  }

  // function for renderChildren prop of FilterBarInline
  const filterBarContent = () => {
    return (
      <>
        <MultiSelectGroup
          id="item-filters"
          labelText="Filter by"
          renderMultiSelect={renderMultiSelect}
          mt={{ base: 0, md: "xxs" }}
        />
        {showDateFilter ? (
          <Box width={{ base: "100%", md: 440 }}>
            <Label
              id="year-filter-label"
              pb="xs"
              htmlFor="searchbar-form-year-filter"
            >
              Search by year
            </Label>
            <SearchBar
              id="year-filter"
              labelText="Apply year filter"
              aria-labelledby="year-filter-label"
              data-testid="year-filter"
              isInvalid={invalidYear}
              invalidText="Please enter a valid year."
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
        ) : null}
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
          mt={{ base: "0", md: "6px" }}
        />
      ) : null
    })

  return (
    <>
      <Box
        p="m"
        bg="ui.bg.default"
        mb="m"
        borderRadius="8px"
        className="no-print"
      >
        <FilterBarInline
          id="item-filters-container"
          data-testid="item-filters-container"
          width="full"
          layout="row"
          sx={{
            fieldset: { width: { base: "100%", md: "45%" } },
            "> div": { alignItems: "flex-start" },
          }}
          renderChildren={filterBarContent}
        />
      </Box>
      {filtersAreApplied ? (
        <ActiveFilters
          filterName="bib-details"
          onClick={async (filterToRemove: TagSetFilterDataProps) => {
            await handleRemoveFilter(filterToRemove.id)
          }}
          tagSetData={appliedFiltersTagSetData}
        />
      ) : null}
    </>
  )
}

export default ItemFilters
