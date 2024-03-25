import { useRouter } from "next/router"
import {
  TagSet,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"

import styles from "../../../styles/components/Search.module.scss"
import {
  getQueryWithoutFilters,
  buildFilterQuery,
  addLabelPropAndParseFilters,
  collapseMultiValueQueryParams,
} from "../../utils/refineSearchUtils"
import { useContext } from "react"
import { SearchResultsAggregationsContext } from "../../context/SearchResultsAggregationsContext"
import {
  buildTagsetData,
  buildAppliedFiltersValueArrayWithTagRemoved,
} from "./appliedFilterUtils"

const AppliedFilters = () => {
  const aggregations = useContext(SearchResultsAggregationsContext)
  const router = useRouter()
  const appliedFilters = collapseMultiValueQueryParams(router.query)
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )

  const tagSetData = buildTagsetData(appliedFiltersWithLabels)
  const handleRemove = (tag: TagSetFilterDataProps) => {
    if (tag.label === "Clear Filters") {
      router.push({
        pathname: "/search",
        query: getQueryWithoutFilters(router.query),
      })
      return
    }
    const updatedFilters = buildAppliedFiltersValueArrayWithTagRemoved(
      tag,
      appliedFiltersWithLabels
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
