import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import {
  Card,
  SearchBar,
  Box,
  Heading,
  Text,
  useCloseDropDown,
  useNYPLBreakpoints,
  CardHeading,
  CardContent,
} from "@nypl/design-system-react-components"

import styles from "../../../styles/components/ItemFilters.module.scss"
import type { AppliedFilters, ItemAggregation } from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/itemFilterData"
import ItemFilter from "./ItemFilter"
import {
  buildAppliedFiltersString,
  buildItemFilterQueryString,
  buildItemsString,
  parseItemFilterQueryParams,
} from "../../utils/itemFilterUtils"

interface ItemFilterContainerProps {
  itemAggs: ItemAggregation[]
}

const ItemFilterContainer = ({ itemAggs }: ItemFilterContainerProps) => {
  const router = useRouter()
  const { isLargerThanLarge, isLargerThanMedium } = useNYPLBreakpoints()
  const filterGroupClassName = isLargerThanLarge
    ? styles.filterGroup
    : styles.filterGroupMobile
  console.log(filterGroupClassName)
  const filterData = useRef(
    itemAggs.map((agg: ItemAggregation) => {
      if (agg.field === "location") return new LocationFilterData(agg)
      else return new ItemFilterData(agg)
    })
  ).current

  const parsedParams = parseItemFilterQueryParams(router.query)
  const [appliedFilters, setAppliedFilters] = useState(parsedParams)
  const appliedFiltersDisplay = buildAppliedFiltersString(
    parsedParams,
    filterData
  )
  const ref = useRef<HTMLDivElement>(null)
  useCloseDropDown(() => setWhichFilterIsOpen(""), ref)

  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")
  const [itemsMatched] = useState(buildItemsString(router.query))

  const submitFilters = (selection: string[], field: string) => {
    let newFilters: AppliedFilters
    setAppliedFilters((prevFilters) => {
      newFilters = { ...prevFilters, [field]: selection }
      return newFilters
    })
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    const url = buildItemFilterQueryString(
      newFilters,
      locationFilterData.recapLocations()
    )
    setWhichFilterIsOpen("")
    router.push("/search/advanced" + url)
  }

  useMemo(() => {
    const parsedParams = parseItemFilterQueryParams(router.query)
    setAppliedFilters(parsedParams)
  }, [router.query])

  return (
    <>
      <Box
        className={styles.filtersContainer}
        sx={{
          display: "flex",
          flexDirection: isLargerThanMedium ? "row" : "column",
        }}
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
            isBold={true}
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
      <Heading level="h3" size="heading6">
        {itemsMatched}
      </Heading>
      <Text>{appliedFiltersDisplay}</Text>
    </>
  )
}

export default ItemFilterContainer
