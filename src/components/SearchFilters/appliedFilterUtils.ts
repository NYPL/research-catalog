import type { Option } from "../../types/filterTypes"

export const removeSelectedTag = (
  tag: { label: string; field: string },
  appliedFiltersWithLabels: Record<string, Option[]>,
  appliedFilters
) => {
  const relevantField = tag.field
  const doesNotMatchLabelToRemove = (option: Option) =>
    option.label !== tag.label
  // regenerate the selected options for the relevant field by removing only
  // the tag that was selected.
  const updatedField = appliedFiltersWithLabels[relevantField]
    .filter(doesNotMatchLabelToRemove)
    // only return the value so we can generate the query again
    .map((selectedOption: Option) => selectedOption.value)

  const updatedFilters = appliedFilters
  // if there are elements left in the relevant field, we want those in the \
  // query
  if (updatedField.length) {
    updatedFilters[relevantField] = updatedField
    // otherwise, remove the field from the query so we don't have an
    // undefined query param
  } else delete updatedFilters[relevantField]
  return updatedFilters
}
