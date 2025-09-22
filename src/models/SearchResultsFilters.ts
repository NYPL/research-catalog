import { searchVocabularies } from "../../data/searchVocabularies"
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
      return searchVocabularies.buildingLocations.find(
        (loc) => loc.value === option.value
      ).label
    } else return this.labelTransformations[option.label] || option.label
  }
}

export default SearchResultsFilters
