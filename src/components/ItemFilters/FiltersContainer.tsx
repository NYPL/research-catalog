import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import { Text, useCloseDropDown } from "@nypl/design-system-react-components"

import styles from "../../../styles/components/ItemFilters.module.scss"
import type { ItemAggregation } from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/itemFilterData"
import ItemFilter from "./ItemFilter"
import {
  buildItemFilterQueryParams,
  parseItemFilterQueryParams,
} from "../../utils/itemFilterUtils"

interface ItemFilterContainerProps {
  itemAggs: ItemAggregation[]
}

const ItemFilterContainer = ({ itemAggs }: ItemFilterContainerProps) => {
  const { query } = useRouter()
  const filterData = itemAggs.map((agg: ItemAggregation) => {
    if (agg.field === "location") return new LocationFilterData(agg)
    else return new ItemFilterData(agg)
  })
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    format: [],
    status: [],
  })

  const ref = useRef<HTMLDivElement>(null)
  useCloseDropDown(() => setWhichFilterIsOpen(""), ref)

  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")

  const [tempQueryDisplay, setTempQueryDisplay] = useState("")

  const tempSubmitFilters = () => {
    const locationFilterData = filterData.find(
      (filter) => filter.field() === "location"
    ) as LocationFilterData
    setTempQueryDisplay(
      buildItemFilterQueryParams(
        selectedFilters,
        locationFilterData.recapLocations()
      )
    )
  }

  useEffect(() => {
    setSelectedFilters(parseItemFilterQueryParams(query))
  }, [query])

  useEffect(tempSubmitFilters, [selectedFilters, tempSubmitFilters])

  return (
    <div className={styles.filtersContainer}>
      <Text size="body2" isBold={true}>
        Filter by
      </Text>
      <div className={styles.filterGroup} ref={ref}>
        {filterData.map((field: ItemFilterData) => (
          <ItemFilter
            isOpen={whichFilterIsOpen === field.field()}
            setWhichFilterIsOpen={setWhichFilterIsOpen}
            key={field.field()}
            itemFilterData={field}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            submitFilters={tempSubmitFilters}
          />
        ))}
      </div>
      <p>{tempQueryDisplay}</p>
    </div>
  )
}

export default ItemFilterContainer
