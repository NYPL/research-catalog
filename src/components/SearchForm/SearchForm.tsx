import {
  Box,
  Flex,
  Icon,
  Link,
  SearchBar,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  type SyntheticEvent,
} from "react"
import useLoading from "../../hooks/useLoading"
import styles from "../../../styles/components/Search.module.scss"
import { PATHS, SEARCH_FORM_OPTIONS } from "../../config/constants"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"
import { idConstants, useFocusContext } from "../../context/FocusContext"
import type { Aggregation } from "../../types/filterTypes"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import { getSearchQuery } from "../../utils/searchUtils"
import type { RCPage } from "../../types/pageTypes"

const SearchForm = ({
  activePage,
  aggregations,
  searchResultsCount,
}: {
  activePage: RCPage
  aggregations?: Aggregation[]
  searchResultsCount?: number
}) => {
  const router = useRouter()
  const isLoading = useLoading()
  const { setPersistentFocus } = useFocusContext()
  const [backUrl, setBackUrl] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState((router.query.q as string) || "")
  const [searchScope, setSearchScope] = useState(
    (router?.query?.search_scope as string) || "all"
  )
  const [, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )

  useEffect(() => {
    setAppliedFilters(collapseMultiValueQueryParams(router.query))
    setSearchScope((router.query.search_scope as string) || "all")
    setSearchTerm((router.query.q as string) || "")

    if (typeof window !== "undefined") {
      const ref = document.referrer
      if (ref.includes("/browse?q")) setBackUrl(ref)
    }
  }, [router.query])

  const displayFilters = !!aggregations?.filter((agg) => agg.values.length)
    .length

  const formattedSelectOptions = Object.keys(SEARCH_FORM_OPTIONS).map(
    (key) => ({
      text: SEARCH_FORM_OPTIONS[key].text,
      value: key,
    })
  )

  const placeholder = SEARCH_FORM_OPTIONS[searchScope].placeholder
  const tipText = SEARCH_FORM_OPTIONS[searchScope].searchTip

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const params = {
      q: searchTerm,
      field: searchScope,
    }
    const queryString = getSearchQuery(params)
    setPersistentFocus(idConstants.searchResultsHeading)
    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  return (
    <div className={`${styles.searchContainer} no-print`}>
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "1280px",
          px: { base: "s", md: "m", xl: "s" },
        }}
      >
        <Text size="body2" className={styles.searchTip}>
          <Icon size="medium" name="errorOutline" iconRotation="rotate180" />
          <Box as="span" className={styles.searchTipText}>
            <span className={styles.searchTipTitle}>Search tip: </span>
            {tipText}
          </Box>
        </Text>

        <SearchBar
          id="mainContent"
          action={PATHS.SEARCH}
          method="get"
          onSubmit={handleSubmit}
          labelText="Search Bar Label"
          isDisabled={isLoading}
          selectProps={{
            value: searchScope,
            labelText: "Select a category",
            name: "field",
            optionsData: formattedSelectOptions,
            onChange: (e) => handleChange(e, setSearchScope),
          }}
          textInputProps={{
            isClearable: true,
            onChange: (e) => handleChange(e, setSearchTerm),
            isClearableCallback: () => setSearchTerm(""),
            value: searchTerm,
            name: "q",
            placeholder,
            labelText: tipText,
          }}
        />
        <Flex
          direction="column"
          justifyContent="space-between"
          mt={{ base: "0", md: "xs" }}
        >
          {(activePage === "sh-results" ||
            activePage === "contributor-results") &&
            backUrl && (
              <Link
                variant="buttonSecondary"
                id="back-index"
                width={{ base: "100%", md: "fit-content" }}
                onClick={() => router.push(backUrl)}
                gap="xxs"
                mt="xxs"
                background="white"
                mb={{ base: "xs", md: 0 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                    fill="#0069BF"
                  />
                </svg>
                Back to index
              </Link>
            )}
          <Link
            className={styles.advancedSearch}
            href="/search/advanced"
            isUnderlined={false}
            mb="xs"
          >
            Advanced search
          </Link>
          {displayFilters && (
            <SearchFilterModal
              aggregations={aggregations}
              searchResultsCount={searchResultsCount}
            />
          )}
        </Flex>
      </Box>
    </div>
  )
}

export default SearchForm
