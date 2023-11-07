import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import React from "react"
import type { AccordionTypes } from "@nypl/design-system-react-components"
import {
  Text,
  useCloseDropDown,
  Accordion,
} from "@nypl/design-system-react-components"

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
  const [activeFilters, setAppliedFilters] = useState({
    location: [],
    format: [],
    status: [],
  })

  const ref = useRef<HTMLDivElement>(null)
  // useCloseDropDown(() => setWhichFilterIsOpen(""), ref)

  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")

  const [tempQueryDisplay, setTempQueryDisplay] = useState("")

  const tempSubmitFilters = () => {
    const locationFilterData = filterData.find(
      (filter) => filter.field === "location"
    ) as LocationFilterData
    setTempQueryDisplay(
      buildItemFilterQueryParams(
        activeFilters,
        locationFilterData.recapLocations()
      )
    )
  }

  useEffect(() => {
    setAppliedFilters(parseItemFilterQueryParams(query))
  }, [query])

  useEffect(tempSubmitFilters, [activeFilters, tempSubmitFilters])

  const accordionData = filterData.map((field: ItemFilterData) => {
    const fieldFormatted =
      field.field[0].toUpperCase() + field.field.substring(1)
    return {
      isAlwaysRendered: true,
      accordionType: "default" as AccordionTypes,
      label: fieldFormatted,
      panel: (
        <ItemFilter
          isOpen={true}
          className={styles.itemFilter}
          setWhichFilterIsOpen={setWhichFilterIsOpen}
          key={field.field}
          itemFilterData={field}
          setAppliedFilters={setAppliedFilters}
          activeFilters={activeFilters}
          submitFilters={tempSubmitFilters}
        />
      ),
    }
  })

  return (
    <div className={styles.filtersContainer}>
      <Text data-testid="filter-text" size="body2" isBold={true}>
        Filter by
      </Text>
      <Accordion
        // className={styles.filterGroup}
        ref={ref}
        accordionData={accordionData}
      />
      <p>{tempQueryDisplay}</p>
    </div>
  )
}

export default ItemFilterContainer
