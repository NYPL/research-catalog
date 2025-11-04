import { useRouter } from "next/router"
import {
  useNYPLBreakpoints,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"

import {
  getQueryWithoutFiltersOrPage,
  buildFilterQuery,
  collapseMultiValueQueryParams,
} from "../../utils/refineSearchUtils"
import {
  buildTagsetData,
  buildAppliedFiltersValueArrayWithTagRemoved,
  addLabelPropAndParseFilters,
} from "./appliedFilterUtils"
import type { Aggregation } from "../../types/filterTypes"
import ActiveFilters from "../ItemFilters/ActiveFilters"
import { useFocusContext, idConstants } from "../../context/FocusContext"

const AppliedFilters = ({ aggregations }: { aggregations: Aggregation[] }) => {
  const router = useRouter()
  const appliedFilters = collapseMultiValueQueryParams(router.query)
  const appliedFiltersWithLabels = addLabelPropAndParseFilters(
    aggregations,
    appliedFilters
  )
  const { isLargerThanMobile } = useNYPLBreakpoints()
  const { setPersistentFocus } = useFocusContext()

  // this type cast is happening because Option type had to be updated to
  // account for Offsite's Element label. That label does
  // not pass thru this part of the code, but this is to placate the
  // compiler.
  const tagSetData = buildTagsetData(
    appliedFiltersWithLabels
  ) as TagSetFilterDataProps[]
  const handleRemove = (tag: TagSetFilterDataProps) => {
    if (tag.label === "Clear filters") {
      setPersistentFocus(idConstants.filterResultsHeading)
      router.push({
        pathname: "/search",
        query: getQueryWithoutFiltersOrPage(router.query),
      })
      return
    }
    const updatedFilters = buildAppliedFiltersValueArrayWithTagRemoved(
      tag,
      appliedFiltersWithLabels
    )
    const updatedQuery = {
      ...getQueryWithoutFiltersOrPage(router.query),
      ...buildFilterQuery(updatedFilters),
    }
    if (tagSetData.length >= 2) {
      setPersistentFocus(idConstants.activeFiltersHeading)
    } else {
      setPersistentFocus(
        isLargerThanMobile
          ? idConstants.filterResultsHeading
          : idConstants.searchFiltersModal
      )
    }
    router.push(
      {
        pathname: "/search",
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    )
  }

  if (!tagSetData.length) return null
  const sortedTagSetData = [...tagSetData].sort((a, b) => {
    if (a.field === "dateFrom" && b.field === "dateTo") return -1
    if (a.field === "dateTo" && b.field === "dateFrom") return 1
    return 0
  })
  return (
    <ActiveFilters
      onClick={handleRemove}
      tagSetData={sortedTagSetData}
      filterName="search-results"
    />
  )
}

export default AppliedFilters
