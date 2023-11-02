import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import type { ItemAggregation } from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/itemFilterData"
import ItemFilter from "./ItemFilter"
import React from "react"
import { buildQueryParams, parseQueryParams } from "./utils"

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

  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")

  const [tempQueryDisplay, setTempQueryDisplay] = useState("")

  const tempSubmitFilters = () => {
    const locationFilterData = filterData.find(
      (filter) => filter.field() === "location"
    ) as LocationFilterData
    setTempQueryDisplay(
      buildQueryParams(selectedFilters, locationFilterData.recapLocations())
    )
  }

  useEffect(() => {
    setSelectedFilters(parseQueryParams(query))
  }, [query])

  useEffect(() => tempSubmitFilters(), [selectedFilters])

  useEffect(() => console.log({ tempQueryDisplay }), [tempQueryDisplay])
  return (
    <div>
      <p>{tempQueryDisplay}</p>
      {filterData.map((field: ItemFilterData) => (
        <ItemFilter
          isOpen={whichFilterIsOpen === field.field()}
          toggleFilterDisplay={setWhichFilterIsOpen}
          key={field.field()}
          itemFilterData={field}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          submitFilters={tempSubmitFilters}
        />
      ))}
    </div>
  )
}

export default ItemFilterContainer
