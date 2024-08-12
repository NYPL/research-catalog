import { capitalize } from "lodash"

import type {
  Aggregation,
  AggregationOption,
  FilterCheckbox,
  FilterCheckboxGroup,
} from "../types/filterTypes"
import { isRecapLocation } from "../utils/itemFilterUtils"

export class ItemFilterData {
  options: AggregationOption[]
  field: string

  constructor(aggregation: Aggregation) {
    this.options = aggregation.values
    this.field = aggregation.field
  }

  displayOptions(): FilterCheckbox[] {
    return this.options.map((option) => {
      return { id: option.value, name: option.label }
    })
  }

  get formattedFilterData(): FilterCheckboxGroup {
    return {
      id: this.field,
      name: capitalize(this.field),
      items: this.displayOptions(),
    }
  }

  labelForValue(value: string) {
    return this.displayOptions().find((checkbox: FilterCheckbox) => {
      return checkbox.id === value || checkbox.name === value
    })?.name
  }
}

export class LocationFilterData extends ItemFilterData {
  constructor(aggregation: Aggregation) {
    super(aggregation)
  }

  // Override display options to add Offsite if there are any Recap locations
  displayOptions(): FilterCheckbox[] {
    let offsiteCount = 0
    const optionsWithoutRecap = this.options.filter(({ value, count }) => {
      if (isRecapLocation(value)) {
        offsiteCount += count
        return false
      } else return true
    })

    const newOptions = offsiteCount
      ? [...optionsWithoutRecap, { label: "Offsite", value: "Offsite" }]
      : optionsWithoutRecap

    // Format the options for the MultiSelect component
    return newOptions.map((option) => {
      return { id: option.value, name: option.label }
    })
  }

  get recapLocations(): string {
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
