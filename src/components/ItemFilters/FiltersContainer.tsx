import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import {
  Text,
  Card,
  SearchBar,
  Box,
  Heading,
  useCloseDropDown,
  useNYPLBreakpoints,
  CardHeading,
  CardContent,
} from "@nypl/design-system-react-components"

import styles from "../../../styles/components/ItemFilters.module.scss"
import type {
  Aggregation,
  ItemFilterQueryParams,
} from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/ItemFilterData"
import ItemFilter from "./ItemFilter"
import {
  buildAppliedFiltersString,
  buildItemFilterQuery,
  buildItemsMatchedStringString,
  parseItemFilterQueryParams,
} from "../../utils/itemFilterUtils"

interface ItemFilterContainerProps {
  itemAggregations: Aggregation[]
  handleFiltersChange?: (newAppliedFilterQuery: ItemFilterQueryParams) => void
  numItemsMatched?: number
  itemsLoading?: boolean
}

const FiltersContainer = ({
  itemAggregations,
  handleFiltersChange,
  numItemsMatched = 0,
  itemsLoading = false,
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

  const appliedFilters = useMemo(() => {
    return parseItemFilterQueryParams(router.query)
  }, [router.query])

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
      {!itemsLoading ? (
        <Heading level="h3" size="heading6" mb="s">
          {itemsMatchedMessage}
        </Heading>
      ) : null}
      {appliedFiltersDisplay?.length ? (
        <Text mb="m">{appliedFiltersDisplay}</Text>
      ) : null}
    </>
  )
}

export default FiltersContainer
