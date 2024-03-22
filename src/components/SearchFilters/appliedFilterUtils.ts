import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"
import type {
  CollapsedMultiValueAppliedFilters,
  Option,
} from "../../types/filterTypes"

export const buildAppliedFiltersValueArrayWithTagRemoved = (
  tag: TagSetFilterDataProps,
  appliedFiltersWithLabels: Record<string, Option[]>
): Record<string, string[]> => {
  const fieldToUpdate = tag.field
  const doesNotMatchLabelToRemove = (option: Option) =>
    option.label !== tag.label

  const updatedFilters = {} as CollapsedMultiValueAppliedFilters
  for (const field in appliedFiltersWithLabels) {
    if (field !== fieldToUpdate) {
      updatedFilters[field] = appliedFiltersWithLabels[field].map(
        (option: Option) => option.value
      )
    } else {
      // regenerate the selected options for the relevant field by removing only
      // the tag that was selected.
      updatedFilters[field] = appliedFiltersWithLabels[field]
        .filter(doesNotMatchLabelToRemove)
        // only return the value so we can generate the query again
        .map((option: Option) => option.value)
    }
  }

  return updatedFilters
}

export const buildTagsetData = (
  appliedFiltersWithLabels: Record<string, Option[]>
) => {
  const appliedFilterFields = Object.keys(appliedFiltersWithLabels)
  return appliedFilterFields
    .map((field: string) => {
      const appliedFiltersWithLabelsPerField = appliedFiltersWithLabels[field]
      return appliedFiltersWithLabelsPerField.map((filter: Option) => {
        return { id: field + "-" + filter.label, label: filter.label, field }
      })
    })
    .flat()
}
