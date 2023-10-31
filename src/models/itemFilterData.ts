import type {
  ItemAggregation,
  ItemAggregationOption,
  option as optionType,
} from "../types/filterTypes"

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
    return this.reducedLocations().map((loc) => {
      if (loc.label === "Offsite") {
        return { ...loc, value: "offsite" }
      } else return loc
    })
  }

  recapLocations(): ItemAggregationOption[] {
    return this.reducedLocations().filter(({ label }) =>
      label.split("loc:")[0].startsWith("rc")
    )
  }

  // There are multiple rc location codes, but we only want to
  // display a single Offsite option in the locations dropdown.This function
  // combines separate offsite location options into one.
  reducedLocations(): ItemAggregationOption[] {
    const reducedOptionsMap = {}
    let count = 0
    this.options
      .filter((option: ItemAggregationOption) => option.label?.length)
      .forEach((option: ItemAggregationOption) => {
        let label = option.label
        if (label.toLowerCase().replace(/[^\w]/g, "") === "offsite") {
          label = "Offsite"
        }
        if (!reducedOptionsMap[label]) {
          reducedOptionsMap[label] = new Set()
        }
        reducedOptionsMap[label].add(option.value)
        count += option.count
      })
    return Object.keys(reducedOptionsMap).map((label) => ({
      value: Array.from(reducedOptionsMap[label]).join(","),
      label: label,
      count,
    }))
  }
}
