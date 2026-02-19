import {
  Box,
  Flex,
  Icon,
  SearchBar,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { useEffect, useState, type SyntheticEvent } from "react"
import { useFocusContext } from "../../context/FocusContext"
import useLoading from "../../hooks/useLoading"
import styles from "../../../styles/components/Search.module.scss"
import { BROWSE_FORM_OPTIONS, PATHS } from "../../config/constants"
import { idConstants } from "../../context/FocusContext"
import { collapseMultiValueQueryParams } from "../../utils/refineSearchUtils"
import { getBrowseQuery, getBrowseFormKey } from "../../utils/browseUtils"
import SearchFilterModal from "../SearchFilters/SearchFilterModal"
import type { RCPage } from "../../types/pageTypes"
import type { Aggregation } from "../../types/filterTypes"
import { useBrowseContext } from "../../context/BrowseContext"
import { BackButton } from "../BackButton/BackButton"
import { getBrowseTypeFromPath } from "../../utils/appUtils"

const BrowseForm = ({
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
  const { browseType, setBrowseType } = useBrowseContext()

  const [searchTerm, setSearchTerm] = useState((router.query.q as string) || "")
  const [selectedOption, setSelectedOption] = useState(
    getBrowseFormKey(
      getBrowseTypeFromPath(router.asPath),
      (router?.query?.search_scope as string) || "has"
    )
  )

  const [backUrl, setBackUrl] = useState<string | null>(null)
  const [, setAppliedFilters] = useState(
    collapseMultiValueQueryParams(router.query)
  )

  useEffect(() => {
    setBrowseType(getBrowseTypeFromPath(router.asPath))
    setAppliedFilters(collapseMultiValueQueryParams(router.query))

    if (typeof window !== "undefined") {
      const ref = document.referrer
      if (ref.includes("/browse?q") || ref.includes("/browse/authors?q"))
        setBackUrl(ref)
    }
  }, [router.query])

  const optionData = BROWSE_FORM_OPTIONS[selectedOption]
  const placeholder = optionData.placeholder
  const tipText = optionData.searchTip

  const formattedSelectOptions = Object.keys(BROWSE_FORM_OPTIONS).map(
    (key) => ({
      text: BROWSE_FORM_OPTIONS[key].text,
      value: key,
    })
  )

  const handleChange = (e: SyntheticEvent, setValue: (val: string) => void) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const basePath = browseType === "subjects" ? "/browse" : "/browse/authors"

    const queryString = getBrowseQuery({
      q: searchTerm,
      searchScope: optionData.scope,
    })

    setPersistentFocus(idConstants.browseResultsHeading)
    await router.push(`${basePath}${queryString}`)
  }

  const displayFilters = !!aggregations?.filter((agg) => agg.values.length)
    .length

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
            <span className={styles.searchTipTitle}>Browse tip: </span>
            {tipText}
          </Box>
        </Text>

        <SearchBar
          id="mainContent"
          action={PATHS.BROWSE}
          method="get"
          onSubmit={handleSubmit}
          labelText="Search Bar Label"
          isDisabled={isLoading}
          pb={{ base: displayFilters ? 0 : "l", md: 0 }}
          selectProps={{
            value: selectedOption,
            labelText: "Select a category",
            name: "browse_option",
            optionsData: formattedSelectOptions,
            onChange: (e) => {
              const newValue = (e.target as HTMLSelectElement).value
              const newOption = BROWSE_FORM_OPTIONS[newValue]

              setBrowseType(newOption.browseType)
              setSelectedOption(newValue)
            },
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
          {activePage === "browse-results" && backUrl && (
            <BackButton router={router} backUrl={backUrl} />
          )}
          {displayFilters && activePage === "browse-results" && (
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

export default BrowseForm
