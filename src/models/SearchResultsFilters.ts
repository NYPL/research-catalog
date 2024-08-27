import type {
  AggregationOption,
  Aggregation,
  Option,
} from "../types/filterTypes"

class SearchResultsFilters {
  options: AggregationOption[]
  field: string
  labelTransformations: Record<string, string>
  constructor(aggregationsResults: Aggregation[], field: Option) {
    this.labelTransformations = {
      "Greek, Modern (1453- )": "Greek, Modern (1453-present)",
    }
    this.options =
      field.value === "holdingLocation"
        ? [
            { label: "Schomburg", value: "loc:scff2,loc:scff3" },
            { label: "SASB", value: "loc:mal82,loc:mal92" },
          ]
        : aggregationsResults
            .find((f) => f.id === field.value)
            ?.values.map((option) => ({
              ...option,
              label: this.labelTransformations[option.label] || option.label,
            }))
    this.field = field.value
  }
}

export default SearchResultsFilters
