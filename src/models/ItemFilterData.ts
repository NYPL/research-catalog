import type {
  Aggregation,
  AggregationOption,
  Option,
} from "../types/filterTypes"

import { isRecapLocation } from "../utils/itemFilterUtils"

export class ItemFilterData {
  options: AggregationOption[]
  field: string

  constructor(aggregation: Aggregation) {
    this.options = this.formatOptions(aggregation.values)
    this.field = aggregation.field
  }

  formatOptions(aggregationValues: AggregationOption[]): AggregationOption[] {
    console.log(aggregationValues)
    return []
  }

  displayOptions(): Option[] {
    return this.options
  }

  labelForValue(value: string) {
    return this.displayOptions().find((opt: Option) => {
      return opt.value === value || opt.label === value
    })?.label
  }
}

export class LocationFilterData extends ItemFilterData {
  constructor(aggregation: Aggregation) {
    super(aggregation)
  }

  displayOptions(): AggregationOption[] {
    let offsiteCount = 0
    const optionsWithoutRecap = this.options.filter(({ value }) => {
      if (isRecapLocation(value)) {
        offsiteCount += count
        return false
      } else return true
    })
    if (offsiteCount) {
      return [...optionsWithoutRecap, { label: "Offsite", value: "Offsite" }]
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
