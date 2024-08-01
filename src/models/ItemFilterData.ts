import { capitalize } from "lodash"

import type {
  Aggregation,
  AggregationOption,
  Option,
} from "../types/filterTypes"
import { isRecapLocation } from "../utils/itemFilterUtils"
import type { FilterCheckboxGroup } from "../types/filterTypes"

export class ItemFilterData {
  options: AggregationOption[]
  field: string

  constructor(aggregation: Aggregation) {
    this.options = aggregation.values
    this.field = aggregation.field
  }

  displayOptions(): Option[] {
    return this.options
  }

  get formattedFilterData(): FilterCheckboxGroup {
    return {
      id: this.field,
      name: capitalize(this.field),
      items: this.displayOptions().map((option) => {
        return { id: option.value, name: option.label }
      }),
    }
  }

  labelForValue(value: string) {
    return this.options.find((opt: Option) => {
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
