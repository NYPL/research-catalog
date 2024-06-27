import { useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import {
  SearchBar,
  Box,
  useCloseDropDown,
  useNYPLBreakpoints,
  Text,
  Label,
  TagSet,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"

import styles from "../../../styles/components/ItemFilters.module.scss"
import type {
  Aggregation,
  ItemFilterQueryParams,
  AppliedItemFilters,
} from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/ItemFilterData"
import ItemFilter from "./ItemFilter"
import {
  buildAppliedFiltersTagSetData,
  buildItemFilterQuery,
  filtersAreApplied,
  removeValueFromFilters,
} from "../../utils/itemFilterUtils"

interface ItemFilterContainerProps {
  itemAggregations: Aggregation[]
  handleFiltersChange?: (newAppliedFilterQuery: ItemFilterQueryParams) => void
  numItemsMatched?: number
  appliedFilters?: AppliedItemFilters
}

const FiltersContainer = ({
  itemAggregations,
  handleFiltersChange,
  appliedFilters = { location: [], format: [], status: [] },
}: ItemFilterContainerProps) => {
  const { isLargerThanLarge, isLargerThanMedium } = useNYPLBreakpoints()
  const filterGroupClassName = isLargerThanLarge
    ? styles.filterGroup
    : styles.filterGroupMobile

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

  const ref = useRef<HTMLDivElement>(null)

  useCloseDropDown(() => setWhichFilterIsOpen(""), ref)

  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")

  const filtersApplied = filtersAreApplied(appliedFilters)

  const submitFilters = (selection: string[], field: string) => {
    const newFilters = { ...appliedFilters, [field]: selection }
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    const itemFilterQuery = buildItemFilterQuery(
      newFilters,
      locationFilterData.recapLocations()
    )
    handleFiltersChange(itemFilterQuery)
    setWhichFilterIsOpen("")
  }

  const clearAllFilters = () => {
    handleFiltersChange({})
    setWhichFilterIsOpen("")
  }

  const handleRemoveAppliedFilterClick = ({ id }: TagSetFilterDataProps) => {
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

  return (
    <>
      <Box
        className={styles.filtersContainer}
        sx={{
          display: "flex",
          flexDirection: isLargerThanMedium ? "row" : "column",
        }}
        mb="m"
      >
        <Box className={filterGroupClassName} ref={ref}>
          <Label htmlFor="item-filters" fontWeight="bold">
            Filter By
          </Label>
          <Box
            sx={{
              display: "flex",
              flexDirection: isLargerThanLarge ? "row" : "column",
            }}
            gap="nypl-s"
            id="item-filters"
          >
            {filterData.map((field: ItemFilterData) => (
              <ItemFilter
                isOpen={whichFilterIsOpen === field.field}
                setWhichFilterIsOpen={setWhichFilterIsOpen}
                key={field.field}
                itemFilterData={field}
                appliedFilters={appliedFilters}
                submitFilters={submitFilters}
              />
            ))}
          </Box>
        </Box>
        <Box className={filterGroupClassName} minWidth={440}>
          <Label htmlFor="year-filter" fontWeight="bold">
            Search by Year
          </Label>
          <SearchBar
            id="year-filter"
            labelText="Apply"
            textInputProps={{
              placeholder: "YYYY",
              isClearable: true,
              labelText: "Item Search",
              name: "textInputName",
            }}
            onSubmit={() => console.log("spaghetti!")}
          />
        </Box>
      </Box>
      {filtersApplied ? (
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
            onClick={handleRemoveAppliedFilterClick}
            tagSetData={appliedFiltersTagSetData}
          />
        </Box>
      ) : null}
    </>
  )
}

export default FiltersContainer
