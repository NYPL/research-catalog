import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import {
  Heading,
  Text,
  useCloseDropDown,
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
    router.push("/search/advanced" + url)
  }

  useMemo(() => {
    const parsedParams = parseItemFilterQueryParams(router.query)
    setAppliedFilters(parsedParams)
  }, [router.query])

  return (
    <div className={styles.filtersContainer}>
      <Text data-testid="filter-text" size="body2" isBold={true}>
        Filter by
      </Text>
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
      <Heading level="h3">{itemsMatched}</Heading>
      <Text>{appliedFiltersDisplay}</Text>
    </div>
  )
}

export default ItemFilterContainer
