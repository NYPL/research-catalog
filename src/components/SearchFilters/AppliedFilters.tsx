import { useRouter } from "next/router"
import {
  TagSet,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"

import styles from "../../../styles/components/Search.module.scss"
import {
  getQueryWithoutFilters,
  buildFilterQuery,
  collapseMultiValueQueryParams,
} from "../../utils/refineSearchUtils"
import {
  buildTagsetData,
  buildAppliedFiltersValueArrayWithTagRemoved,
  addLabelPropAndParseFilters,
} from "./appliedFilterUtils"
import type { Aggregation } from "../../types/filterTypes"

const AppliedFilters = ({ aggregations }: { aggregations: Aggregation[] }) => {
  const router = useRouter()
  const appliedFilters = collapseMultiValueQueryParams(router.query)
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )

  const tagSetData = buildTagsetData(appliedFiltersWithLabels)
  const handleRemove = (tag: TagSetFilterDataProps) => {
    if (tag.label === "Clear filters") {
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
