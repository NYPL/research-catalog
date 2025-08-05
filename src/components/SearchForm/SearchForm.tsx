import {
  searchFormSelectOptions,
  getSearchQuery,
} from "../../utils/searchUtils"
import { PATHS, SEARCH_FORM_OPTIONS } from "../../config/constants"
import RCLink from "../Links/RCLink/RCLink"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"
import { idConstants } from "../../context/FocusContext"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import SearchBrowseForm from "./SearchBrowseForm"

const SearchForm = ({
  aggregations,
  searchResultsCount,
}: {
  aggregations?: Aggregation[]
  searchResultsCount?: number
}) => {
  const router = useRouter()
  const [, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [router.query])

  const searchScope = (router.query.search_scope as string) || "all"
  const { searchTip, placeholder } = SEARCH_FORM_OPTIONS[searchScope] || {}

  const displayFilters = !!aggregations?.filter((agg) => agg.values.length)
    .length

  return (
    <SearchBrowseForm
      initialScope="all"
      path={PATHS.SEARCH}
      placeholder={placeholder}
      tipTitle="Search tip: "
      tipText={searchTip}
      selectOptions={searchFormSelectOptions}
      queryParamKeys={{ searchTerm: "q", searchScope: "search_scope" }}
      getQueryString={getSearchQuery}
      onSubmitFocusId={idConstants.searchResultsHeading}
    >
      <RCLink
        className="advancedSearch"
        href="/search/advanced"
        isUnderlined={false}
        mb="xs"
      >
        Advanced search
      </RCLink>
      {displayFilters && (
        <SearchFilterModal
          aggregations={aggregations}
          searchResultsCount={searchResultsCount}
        />
      )}
    </SearchBrowseForm>
  )
}

export default SearchForm
