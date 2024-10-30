import type {
  AggregationOption,
  Aggregation,
  Option,
} from "../types/filterTypes"
import { searchAggregations } from "../config/aggregations.tsx"

class SearchResultsFilters {
  options: AggregationOption[]
  field: string
  labelTransformations: Record<string, string>
  constructor(aggregationsResults: Aggregation[], field: Option) {
    this.labelTransformations = {
      "Greek, Modern (1453- )": "Greek, Modern (1453-present)",
    }

    this.options = aggregationsResults
      .find((f) => f.id === field.value)
      ?.values.map((option) => ({
        ...option,
        label: this.getLabel(option, field),
      }))
    this.field = field.value
  }
  getLabel(option, field) {
    if (field.value === "buildingLocation") {
      return searchAggregations.buildingLocation.find(
        (loc) => loc.value === option.value
      ).label
    } else return this.labelTransformations[option.label] || option.label
  }
}

export default SearchResultsFilters
