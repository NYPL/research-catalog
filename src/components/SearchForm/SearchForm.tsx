import {
  Box,
  Flex,
  Icon,
  SearchBar,
  Text,
  type AutoCompleteValues,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import router from "next/router"
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
import Link from "../Link/Link"
import SearchAutocomplete from "./SearchAutocomplete"
import { useSearchAutocomplete } from "../../hooks/useSearchAutocomplete"

export type TextInputProps = {
  /** The starting value of the input field. */
  defaultValue?: string
  /** ID that other components can cross reference for accessibility purposes */
  id: string
  /** Adds a button to clear existing text in the input field. */
  isClearable?: boolean
  /** The callback function that is called when the clear button is clicked. */
  isClearableCallback?: () => void
  /** Provides text for a `Label` component if `showLabel` is set to true;
   * populates an `aria-label` attribute if `showLabel` is set to false. */
  labelText: string
  /** Used to reference the input element in forms. */
  name?: string
  /** The action to perform on the `input`/`textarea`'s onChange function  */
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  /** Regex to query the user input against. */
  pattern?: string
  /** Populates the placeholder for the input/textarea elements */
  placeholder?: string
  /** Populates the value of the input/textarea elements */
  value?: string
  /** Sets the HTML autocomplete attribute on the input. Pass "off" to suppress browser suggestions. */
  autoComplete?: AutoCompleteValues
  /** Keyboard handler forwarded to the underlying <input>. Runs before the default Enter-to-submit. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  /** Additional aria/role attributes forwarded directly to the underlying <input> element. */
  additionalInputProps?: Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "role"
    | "aria-expanded"
    | "aria-autocomplete"
    | "aria-controls"
    | "aria-activedescendant"
    | "aria-haspopup"
  >
}

const SearchForm = ({
  aggregations,
  searchResultsCount,
}: {
  aggregations?: Aggregation[]
  searchResultsCount?: number
}) => {
  const router = useRouter()
  const isLoading = useLoading()
  const { setPersistentFocus } = useFocusContext()
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
    await router.push(`${PATHS.SEARCH}${queryString}`, undefined, {
      scroll: false,
    })
  }

  const LISTBOX_ID = "suggest-box"
  const {
    suggestions,
    activeIndex,
    isOpen,
    isTouch,
    wrapperRef,
    closeAutocomplete,
    returnFocusToInput,
    handleKeyDown,
    handleWrapperBlur,
    statusMessage,
  } = useSearchAutocomplete({
    q: searchTerm,
    listboxId: LISTBOX_ID,
    searchScope,
  })

  const handleAutocompleteSelect = (query) => {
    router.push(`${PATHS.SEARCH}?${query}`)
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
          <Box as="span" key={searchScope} className={styles.searchTipText}>
            <span className={styles.searchTipTitle}>Search tip: </span>
            {tipText}
          </Box>
        </Text>

        {statusMessage}
        <Box position="relative" ref={wrapperRef} onBlur={handleWrapperBlur}>
          <SearchBar
            id="mainContent"
            action={PATHS.SEARCH}
            method="get"
            onSubmit={handleSubmit}
            labelText="Search Bar Label"
            isDisabled={isLoading}
            ref={(el: HTMLDivElement | null) => {
              // Prevent browser translation from mutating the submit button's
              // text node, which crashes React's reconciler on re-render
              el?.querySelectorAll("button").forEach((button) =>
                button.setAttribute("translate", "no")
              )
            }}
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
              onKeyDown: handleKeyDown,
              autoComplete: false,
            }}
          />
          {isOpen && (
            <SearchAutocomplete
              suggestions={suggestions}
              onSelect={handleAutocompleteSelect}
              listboxId={LISTBOX_ID}
              onClose={() => {
                closeAutocomplete()
                returnFocusToInput()
              }}
              activeIndex={activeIndex}
              isTouch={isTouch}
              searchScope={searchScope}
            />
          )}
        </Box>
        <Flex
          direction="column"
          justifyContent="space-between"
          mt={{ base: "0", md: "xs" }}
        >
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
