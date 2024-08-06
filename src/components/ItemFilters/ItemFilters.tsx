import { type SyntheticEvent, useEffect, useRef } from "react"
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
  FilterCheckboxGroup,
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

  useEffect(() => {
    console.log("appliedFilters", appliedFilters)
  }, [appliedFilters])

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

  const handleRemoveFilter = (id: string) => {
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

  const handleMultiSelectChange = async (
    filterId: string,
    filterGroupId: string
  ) => {
    const selectedCheckboxes = appliedFilters[filterGroupId]
    const indexOfCheckboxId = selectedCheckboxes.indexOf(filterId)

    if (indexOfCheckboxId >= 0) {
      handleRemoveFilter(filterId)
    }
    submitFilters([filterId, ...selectedCheckboxes], filterGroupId)
  }

  const handleYearSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const year = e.target[0].value
    submitFilters([year], "year")
  }

  const filterCheckboxGroups: FilterCheckboxGroup[] = filterData.map(
    (filter) => filter.formattedFilterData
  )

  // function for renderChildren prop of FilterBarInline
  const filterBarContent = () => {
    return (
      <>
        <MultiSelectGroup
          id="item-filters"
          labelText="Filter by"
          renderMultiSelect={renderMultiSelect}
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

  // function passed to filterElements map callback for generating renderMultiSelect prop of MultiSelectGroup
  const renderMultiSelect = ({ isBlockElement, multiSelectWidth }) =>
    filterCheckboxGroups.map((checkboxGroup: FilterCheckboxGroup) =>
      checkboxGroup?.items.length ? (
        <MultiSelect
          buttonText={checkboxGroup.name}
          id={`${checkboxGroup.id}`}
          data-testid={`${checkboxGroup.id}-multi-select`}
          items={checkboxGroup.items}
          key={checkboxGroup.id}
          onChange={async (
            e: React.ChangeEvent<HTMLInputElement>
          ): Promise<void> => {
            await handleMultiSelectChange(e.target.id, checkboxGroup.id)
          }}
          // TODO: Connect this to data
          selectedItems={{}}
          isBlockElement={isBlockElement}
          width={multiSelectWidth}
          closeOnBlur
        />
      ) : null
    )

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
            Filters Applied
          </Text>
          <TagSet
            id="bib-details-applied-filters"
            isDismissible
            type="filter"
            onClick={(filterToRemove: TagSetFilterDataProps) => {
              handleRemoveFilter(filterToRemove.id)
            }}
            tagSetData={appliedFiltersTagSetData}
          />
        </Box>
      ) : null}
    </>
  )
}

export default ItemFilters
