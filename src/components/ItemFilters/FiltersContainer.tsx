import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import {
  Box,
  Heading,
  useCloseDropDown,
} from "@nypl/design-system-react-components"

import styles from "../../../styles/components/ItemFilters.module.scss"
import type { ItemAggregation } from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/itemFilterData"
import ItemFilter from "./ItemFilter"
import {
  buildAppliedFiltersString,
  buildItemFilterQueryString,
  buildItemsMatchedStringString,
  parseItemFilterQueryParams,
} from "../../utils/itemFilterUtils"

interface ItemFilterContainerProps {
  itemAggs: ItemAggregation[]
}

const ItemFilterContainer = ({ itemAggs }: ItemFilterContainerProps) => {
  const router = useRouter()

  const filterData = useRef<ItemFilterData[]>(
    itemAggs.map((agg: ItemAggregation) => {
      if (agg.field === "location") return new LocationFilterData(agg)
      else return new ItemFilterData(agg)
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

  const itemsMatched = buildItemsMatchedStringString(router.query)

  const submitFilters = (selection: string[], field: string) => {
    const newFilters = { ...appliedFilters, [field]: selection }
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    const url = buildItemFilterQueryString(
      newFilters,
      locationFilterData.recapLocations()
    )
    router.push("/search/advanced" + url)
  }

  return (
    <Box className={styles.filtersContainer}>
      <Heading data-testid="filter-text" level="h4" size="heading6">
        Filter by
      </Heading>
      <div className={styles.filterGroup} ref={ref}>
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
      </div>

      {/* TODO: Heading levels for the bib page need to be ironed out. This
      h4 is based on the assumption that there is an H3 above the item filters
      that says "Items in the library and Offsite"  

      NB: suggested approach for adding clear button is to make this a grid and 
      have the button be in the second column*/}
      <Heading
        mt="s"
        subtitle={appliedFiltersDisplay}
        level="h4"
        size="heading6"
      >
        {itemsMatched}
      </Heading>
    </Box>
  )
}

export default ItemFilterContainer
