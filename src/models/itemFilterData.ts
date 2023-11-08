import type {
  ItemAggregation,
  ItemAggregationOption,
  Option,
} from "../types/filterTypes"

import { isRecapLocation } from "../utils/itemFilterUtils"

export class ItemFilterData {
  options: ItemAggregationOption[]
  agg: ItemAggregation
  field: string
  constructor(agg: ItemAggregation) {
    this.agg = agg
    this.options = agg.values
    this.field = agg.field
  }

  displayOptions(): Option[] {
    return this.options
  }

  labelForValue(value: string) {
    return this.displayOptions().find((opt: Option) => {
      return opt.value === value
    })?.label
  }

  labelsForConcatenatedValues(values: string) {
    return Array.from(
      new Set(
        values.split(",").map((val: string) => `'${this.labelForValue(val)}'`)
      )
    ).join(", ")
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
