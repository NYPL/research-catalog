import { useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import {
  Card,
  SearchBar,
  Box,
  useCloseDropDown,
  useNYPLBreakpoints,
  CardHeading,
  CardContent,
  Text,
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
  buildAppliedFiltersString,
  buildItemFilterQuery,
  buildItemsMatchedStringString,
  filtersAreApplied,
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
  numItemsMatched = 0,
  appliedFilters = { location: [], format: [], status: [] },
}: ItemFilterContainerProps) => {
  const router = useRouter()
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

  const appliedFiltersDisplay = buildAppliedFiltersString(
    appliedFilters,
    filterData
  )
  const ref = useRef<HTMLDivElement>(null)

  useCloseDropDown(() => setWhichFilterIsOpen(""), ref)

  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")

  const itemsMatchedMessage = buildItemsMatchedStringString(
    router.query,
    numItemsMatched
  )

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

  const handleAppliedFiltersClick = (tagSetData: TagSetFilterDataProps) => {
    console.log(tagSetData)
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
        <Card className={filterGroupClassName} ref={ref}>
          <CardHeading level="h3" size="body2">
            Filter by
          </CardHeading>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: isLargerThanLarge ? "row" : "column",
              }}
              gap="nypl-s"
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
          </CardContent>
        </Card>
        <Card className={filterGroupClassName}>
          <CardHeading
            level="h3"
            size="body2"
            data-testid="filter-text"
            fontWeight="bold"
          >
            Search by Year
          </CardHeading>
          <CardContent>
            <SearchBar
              id="year-filter"
              labelText="Apply"
              textInputProps={{
                defaultValue: "YYYY",
                isClearable: true,
                labelText: "Item Search",
                name: "textInputName",
              }}
              onSubmit={() => console.log("spaghetti!")}
            />
          </CardContent>
        </Card>
      </Box>
      {filtersApplied ? (
        <Box display="flex" mr="s" mb="m">
          <Text
            fontSize="desktop.body.body2"
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
            onClick={handleAppliedFiltersClick}
            tagSetData={[
              { iconName: "close", id: "one", label: "one" },
              { iconName: "close", id: "two", label: "two" },
            ]}
          />
        </Box>
      ) : null}
    </>
  )
}

export default FiltersContainer
