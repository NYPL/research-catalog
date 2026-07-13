import { capitalize } from "lodash"

import type {
  Aggregation,
  AggregationOption,
  FilterCheckbox,
  FilterCheckboxGroup,
} from "../types/filterTypes"

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
    const displayNames: Record<string, string> = {
      location: "Item location",
      status: "Availability",
    }

    return {
      id: this.field,
      name: displayNames[this.field] || capitalize(this.field),
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

  displayOptions(): FilterCheckbox[] {
    // Format the options for the MultiSelect component
    return this.options.map((option) => {
      return { id: option.value, name: option.label }
    })
  }
}
