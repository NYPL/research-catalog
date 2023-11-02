import type {
  ItemAggregation,
  ItemAggregationOption,
  Option,
} from "../types/filterTypes"

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
    return this.reducedLocations().map((loc) => {
      if (loc.label === "Offsite") {
        return { ...loc, value: "Offsite" }
      } else return loc
    })
  }

  recapLocations(): string[] {
    return this.reducedLocations()
      .filter(({ label }) => label.split("loc:")[0].startsWith("rc"))
      .map((recapOption: ItemAggregationOption) => recapOption.value)
  }

  // There are multiple rc location codes, but we only want to
  // display a single Offsite option in the locations dropdown.This function
  // combines separate Offsite location options into one.
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
