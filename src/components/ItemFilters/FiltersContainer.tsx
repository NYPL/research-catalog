import { useState } from "react"

import type { ItemAggregation } from "../../types/filterTypes"
import { ItemFilterData, LocationFilterData } from "../../models/itemFilterData"
import ItemFilter from "./ItemFilter"
import React from "react"
import { combineRecapLocations } from "./utils"

interface ItemFilterContainerProps {
  itemAggs: ItemAggregation[]
}

const tempInitialFilters = {
  location: ["loc:rc2ma"],
  format: ["Text"],
  status: ["status:a"],
}

const ItemFilterContainer = ({ itemAggs }: ItemFilterContainerProps) => {
  const filterData = itemAggs.map((agg: ItemAggregation) => {
    if (agg.field === "location") return new LocationFilterData(agg)
    else return new ItemFilterData(agg)
  })
  const [selectedFilters, setSelectedFilters] = useState({
    ...tempInitialFilters,
    location: combineRecapLocations(tempInitialFilters.location),
  })

  return (
    <div>
      {filterData.map((field: ItemFilterData) => (
        <ItemFilter
          key={field.field()}
          itemFilterData={field}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        />
      ))}
    </div>
  )
}

export default ItemFilterContainer
