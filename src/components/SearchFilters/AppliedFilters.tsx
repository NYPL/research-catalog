import { useRouter } from "next/router"
import { TagSet } from "@nypl/design-system-react-components"

import styles from "../../../styles/components/Search.module.scss"
import {
  getQueryWithoutFilters,
  buildFilterQuery,
  addLabelPropAndParseFilters,
  collapseMultiValueQueryParams,
} from "../../utils/refineSearchUtils"
import type { Option } from "../../types/filterTypes"
import { useContext } from "react"
import { SearchResultsAggregationsContext } from "../../context/SearchResultsAggregationsContext"
import { removeSelectedTag } from "./appliedFilterUtils"

const AppliedFilters = () => {
  const aggregations = useContext(SearchResultsAggregationsContext)
  const router = useRouter()
  const appliedFilters = collapseMultiValueQueryParams(router.query)
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

  const handleRemove = (tag: { label: string; field: string }) => {
    console.log(tag)
    if (tag.label === "Clear Filters") {
      router.push({
        pathname: "/search",
        query: getQueryWithoutFilters(router.query),
      })
      return
    }
    const updatedFilters = removeSelectedTag(
      tag,
      appliedFiltersWithLabels,
      appliedFilters
    )
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
