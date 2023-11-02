import type {
  ItemAggregation,
  ItemAggregationOption,
  option as optionType,
} from "../types/filterTypes"

import { isRecapLocation } from "../components/ItemFilters/utils"

export class ItemFilterData {
  options: ItemAggregationOption[]
  _field: string
  constructor(agg: ItemAggregation) {
    this._field = agg.field
    this.options = agg.values
  }

  displayOptions(): optionType[] {
    return this.options
  }

  field(formatted = false) {
    const f = this._field
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
