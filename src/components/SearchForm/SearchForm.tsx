import {
  Box,
  Flex,
  Icon,
  SearchBar,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent, Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"
import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../Links/RCLink/RCLink"
import {
  getSearchQuery,
  searchFormSelectOptions,
} from "../../utils/searchUtils"
import { BASE_URL, PATHS, SEARCH_FORM_OPTIONS } from "../../config/constants"
import useLoading from "../../hooks/useLoading"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"
import { useFocusContext } from "../../context/FocusContext"

/**
 * The SearchForm component renders and controls the Search form,
 * mobile filters, and advanced search link.
 */
const SearchForm = ({
  aggregations,
  searchResultsCount,
}: {
  aggregations?: Aggregation[]
  searchResultsCount?: number
}) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(
    (router?.query?.q as string) || ""
  )
  const [searchScope, setSearchScope] = useState(
    (router?.query?.search_scope as string) || "all"
  )
  const [appliedFilters, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )
  const searchTip = SEARCH_FORM_OPTIONS[searchScope].searchTip
  const placeholder = SEARCH_FORM_OPTIONS[searchScope].placeholder

  const isLoading = useLoading()

  const { setLastFocusedId } = useFocusContext()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const searchParams = {
      q: searchTerm,
      field: searchScope,
    }

    // Keeping the feature where if the search scope from the select
    // dropdown is "subject", it will redirect to SHEP.
    if (searchScope === "subject") {
      window.location.href = `${BASE_URL}/subject_headings?filter=${
        searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
      }`
      return
    }

    const queryString = getSearchQuery(searchParams)

    setLastFocusedId(null)
    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  const displayFilters = !!aggregations?.filter(
    (agg: Aggregation) => agg.values.length
  ).length

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [router.query])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContainerInner}>
        <Text size="body2" className={styles.searchTip}>
          <Icon size="medium" name="errorOutline" iconRotation="rotate180" />
          <Box as="span" className={styles.searchTipText}>
            <span className={styles.searchTipTitle}>{"Search tip: "}</span>
            {searchTip}
          </Box>
        </Text>
        <SearchBar
          id="mainContent"
          action={`${BASE_URL}/search`}
          method="get"
          onSubmit={handleSubmit}
          labelText="Search Bar Label"
          isDisabled={isLoading}
          selectProps={{
            value: searchScope,
            onChange: (e) => handleChange(e, setSearchScope),
            labelText: "Select a category",
            name: "search_scope",
            optionsData: searchFormSelectOptions,
          }}
          textInputProps={{
            isClearable: true,
            onChange: (e) => handleChange(e, setSearchTerm),
            isClearableCallback: () => setSearchTerm(""),
            value: searchTerm,
            name: "q",
            labelText: searchTip,
            placeholder,
          }}
        />
        <Flex direction="column" justifyContent="space-between" mt="s">
          <RCLink
            className={styles.advancedSearch}
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
        </Flex>
      </div>
    </div>
  )
}

export default SearchForm
