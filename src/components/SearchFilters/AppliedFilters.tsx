import { useRouter } from "next/router"
import { TagSet } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import {
  getQueryWithoutFilters,
  buildFilters,
  addLabelPropAndParseFilters,
} from "../../utils/refineSearchUtils"
import type { Aggregation, Option } from "../../types/filterTypes"

interface AppliedFiltersPropsType {
  aggregations: Aggregation[]
  setAppliedFilters: Dispatch<React.SetStateAction<Record<string, string[]>>>
  appliedFilters: Record<string, string[]>
}

const AppliedFilters = ({
  appliedFilters,
  setAppliedFilters,
  aggregations,
}: AppliedFiltersPropsType) => {
  const router = useRouter()
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )

  const appliedFilterFields = Object.keys(appliedFiltersWithLabels)
  console.log("tagset", appliedFiltersWithLabels)
  const tagSetData = appliedFilterFields
    .map((field: string) => {
      const appliedFiltersWithLabelsPerField = appliedFiltersWithLabels[field]
      return appliedFiltersWithLabelsPerField.map((filter: Option) => {
        return { id: field + "-" + filter.label, label: filter.label, field }
      })
    })
    .flat()

  const handleRemove = (tagLabel: string) => {
    let updatedFilters
    console.log({ tagLabel })
    if (tagLabel === "clearFilters") {
      updatedFilters = {}
    } else {
      // This click handler only returns the label, but we need the field so
      // we don't remove the wrong filter
      const relevantField = tagSetData.find(
        (appliedFilter) => appliedFilter.label === tagLabel
      ).field
      console.log({ relevantField })
      const doesNotMatchLabelFromTag = (filter) => filter.label !== tagLabel
      console.log({ doesNotMatchLabelFromTag })
      const updatedField = appliedFiltersWithLabels[relevantField]
        .filter(doesNotMatchLabelFromTag)
        .map((updatedOption: Option) => updatedOption.value)
      updatedFilters = {
        ...appliedFiltersWithLabels,
        [relevantField]: updatedField,
      }
      console.log({ updatedFilters })
    }
    const updatedQuery = {
      ...getQueryWithoutFilters(router.query),
      ...buildFilters(updatedFilters),
    }
    console.log({ appliedFilters: updatedQuery })
    router.push({
      pathname: "/search",
      query: updatedQuery,
    })
    // setAppliedFilters(updatedFilters)
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
