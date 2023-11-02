import type {
  ItemAggregation,
  ItemAggregationOption,
  Option,
} from "../types/filterTypes"

import { isRecapLocation } from "../components/ItemFilters/utils"

export class ItemFilterData {
  options: ItemAggregationOption[]
  agg: ItemAggregation
  constructor(agg: ItemAggregation) {
    this.agg = agg
    this.options = agg.values
  }

  displayOptions(): Option[] {
    return this.options
  }

  field(formatted = false) {
    const f = this.agg.field
    const upperCased = f[0].toUpperCase() + f.substring(1)
    return formatted ? upperCased : f
  }
}

export class LocationFilterData extends ItemFilterData {
  constructor(aggs: ItemAggregation) {
    super(aggs)
  }

  displayOptions(): ItemAggregationOption[] {
    let offsiteCount = 0
    const optionsWithoutRecap = this.options.filter(({ value, count }) => {
      if (isRecapLocation(value)) {
        offsiteCount += count
        return false
      } else return true
    })
    if (offsiteCount) {
      return [
        ...optionsWithoutRecap,
        { label: "Offsite", value: "Offsite", count: offsiteCount },
      ]
    } else return optionsWithoutRecap
  }

  recapLocations(): string {
    return (
      this.options
        .map(({ value }) => {
          if (isRecapLocation(value)) {
            return value
          }
        })
        // remove null values
        .filter((loc) => loc)
        .join(",")
    )
  }
}
