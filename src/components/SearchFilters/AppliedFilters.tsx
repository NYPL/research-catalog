import { useRouter } from "next/router"
import { TagSet } from "@nypl/design-system-react-components"

import {
  addLabelToParsedFilters,
  removeFiltersFromQuery,
  buildFilters,
} from "../../utils/refineSearchUtils"
import type { Option } from "../../types/filterTypes"

const AppliedFilters = ({ aggregations }) => {
  const router = useRouter()

  const appliedFilters = addLabelToParsedFilters(aggregations, router.query)
  const appliedFilterFields = Object.keys(appliedFilters)
  console.log(appliedFilters)
  const tagSetData = appliedFilterFields
    .map((field: string) => {
      const appliedFiltersPerField = appliedFilters[field]
      return appliedFiltersPerField.map((filter: Option) => {
        return { id: field + "-" + filter.label, label: filter.label, field }
      })
    })
    .flat()

  const handleRemove = (tagLabel: string) => {
    // This click handler only returns the label, but we need the field so
    // we don't remove the wrong filter
    const relevantField = tagSetData.find(
      (appliedFilter) => appliedFilter.label === tagLabel
    ).field
    const doesNotMatchLabelFromTag = (filter) => filter.label !== tagLabel
    const updatedField = appliedFilters[relevantField].filter(
      doesNotMatchLabelFromTag
    )
    const updatedFilters = { ...appliedFilters, [relevantField]: updatedField }
    const updatedQuery = {
      ...removeFiltersFromQuery(router.query),
      ...buildFilters(updatedFilters),
    }
    router.push({
      pathname: "/search",
      query: updatedQuery,
    })
  }
  if (!tagSetData.length) return null
  return (
    <TagSet
      onClick={handleRemove}
      tagSetData={tagSetData}
      isDismissible={true}
      type="filter"
    />
  )
}

export default AppliedFilters
