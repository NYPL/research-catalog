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
  return (
    appliedFilterFields
      .map((field: string) => {
        const appliedFiltersWithLabelsPerField = appliedFiltersWithLabels[field]
        // HOTFIX 5/9/24 - this is a temporary fix to resolve a 500 error on production caused by certain combinations of filters
        // e.g. http://local.nypl.org:8080/research/research-catalog/search?q=shakespeare&filters%5BsubjectLiteral%5D%5B0%5D=Shakespeare%2C+William%2C+1564-1616+--+Characters.&filters%5BmaterialType%5D%5B0%5D=resourcetypes%3Anot
        // TODO: Find the root cause of this issue and remove this override
        if (appliedFiltersWithLabelsPerField.some((filter) => !filter))
          return null
        return appliedFiltersWithLabelsPerField.map((filter: Option) => {
          return {
            id: field + "-" + filter?.label,
            label: filter?.label,
            field,
          }
        })
      })
      // HOTFIX 5/9/24
      // See comment above
      .filter((filterArr) => !!filterArr)
      .flat()
  )
}
