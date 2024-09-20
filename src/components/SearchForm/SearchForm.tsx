import { Box, SearchBar } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent, Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../Links/RCLink/RCLink"
import { getSearchQuery } from "../../utils/searchUtils"
import { BASE_URL, PATHS } from "../../config/constants"
import EDSLink from "../EDSLink"
import useLoading from "../../hooks/useLoading"
import RefineSearch from "../RefineSearch/RefineSearch"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = ({ aggregations }: { aggregations?: Aggregation[] }) => {
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

  const isLoading = useLoading()

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

    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  const displayRefineResults = !!aggregations?.filter(
    (agg: Aggregation) => agg.values.length
  ).length

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
  }, [router.query])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContainerInner}>
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
            optionsData: [
              { text: "Keyword", value: "all" },
              { text: "Title", value: "title" },
              { text: "Author/contributor", value: "contributor" },
              { text: "Journal title", value: "journal_title" },
              { text: "Call number", value: "callnumber" },
              { text: "Control numbers/identifiers", value: "standard_number" },
              { text: "Subject", value: "subject" },
            ],
          }}
          textInputProps={{
            isClearable: true,
            onChange: (e) => handleChange(e, setSearchTerm),
            isClearableCallback: () => setSearchTerm(""),
            value: searchTerm,
            labelText:
              "Search by keyword, title, journal title, or author/contributor",
            name: "q",
            placeholder: "Keyword, title, journal title, or author/contributor",
          }}
          sx={{
            ".chakra-select__icon-wrapper": { "z-index": "999 !important" },
          }}
        />
        <Box className={styles.auxSearchContainer}>
          <RCLink
            className={styles.advancedSearch}
            href="/search/advanced"
            isUnderlined={false}
            mb="xs"
          >
            Advanced Search
          </RCLink>
          {displayRefineResults && (
            <RefineSearch
              setAppliedFilters={setAppliedFilters}
              appliedFilters={appliedFilters}
              aggregations={aggregations}
            />
          )}
        </Box>
        <EDSLink />
      </div>
    </div>
  )
}

export default SearchForm
