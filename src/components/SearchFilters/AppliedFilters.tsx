import { useRouter } from "next/router"
import { TagSet } from "@nypl/design-system-react-components"

import styles from "../../../styles/components/Search.module.scss"
import {
  getQueryWithoutFilters,
  buildFilterQuery,
  addLabelPropAndParseFilters,
} from "../../utils/refineSearchUtils"
import type { Aggregation, Option } from "../../types/filterTypes"

interface AppliedFiltersPropsType {
  aggregations: Aggregation[]
  appliedFilters: Record<string, string[]>
}

const AppliedFilters = ({
  appliedFilters,
  aggregations,
}: AppliedFiltersPropsType) => {
  const router = useRouter()
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )
  const appliedFilterFields = Object.keys(appliedFiltersWithLabels)
  const tagSetData = appliedFilterFields
    .map((field: string) => {
      const appliedFiltersWithLabelsPerField = appliedFiltersWithLabels[field]
      return appliedFiltersWithLabelsPerField.map((filter: Option) => {
        return { id: field + "-" + filter.label, label: filter.label, field }
      })
    })
    .flat()

  const handleRemove = (tagLabel: string) => {
    if (tagLabel === "clearFilters") {
      router.push({
        pathname: "/search",
        query: getQueryWithoutFilters(router.query),
      })
      return
    }
    // This click handler only returns the label, but we need the field so
    // we don't remove the wrong filter
    const relevantField = tagSetData.find(
      (appliedFilter) => appliedFilter.label === tagLabel
    ).field
    const doesNotMatchLabelToRemove = (option: Option) =>
      option.label !== tagLabel
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

    const updatedQuery = {
      ...getQueryWithoutFilters(router.query),
      ...buildFilterQuery(updatedFilters),
    }
    router.push({
      pathname: "/search",
      query: updatedQuery,
    })
  }

  if (!tagSetData.length) return null
  return (
    <TagSet
      className={styles.filterTags}
      onClick={handleRemove}
      tagSetData={tagSetData}
      isDismissible={true}
      type="filter"
    />
  )
}

export default AppliedFilters
