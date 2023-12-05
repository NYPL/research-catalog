import {
  SearchBar,
  SkeletonLoader,
  Box,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import {
  useState,
  type SyntheticEvent,
  type Dispatch,
  type SetStateAction,
} from "react"

import styles from "../../../styles/components/Search.module.scss"
import RCLink from "../RCLink/RCLink"
import { getQueryString } from "../../utils/searchUtils"
import { BASE_URL, PATHS } from "../../config/constants"
import EDSLink from "../EDSLink"

interface SearchFormProps {
  loading?: boolean
}

/**
 * The SearchForm component renders and controls the Search form and
 * advanced search link.
 */
const SearchForm = ({ loading }: SearchFormProps) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(
    (router?.query?.q as string) || ""
  )
  const [searchScope, setSearchScope] = useState("all")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const searchParams = {
      q: searchTerm,
      field: searchScope,
    }
    const queryString = getQueryString(searchParams)

    await router.push(`${PATHS.SEARCH}${queryString}`)
  }

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  return (
    <Box className={styles.searchContainer}>
      <Box className={styles.searchContainerInner}>
        {loading ? (
          <SkeletonLoader
            showImage={false}
            showHeading={false}
            contentSize={2}
            pb="s"
          />
        ) : (
          <>
            <Box className={styles.searchBarContainer}>
              <SearchBar
                id="mainContent"
                action={`${BASE_URL}/search`}
                method="get"
                onSubmit={handleSubmit}
                labelText="Search Bar Label"
                selectProps={{
                  value: searchScope,
                  onChange: (e) => handleChange(e, setSearchScope),
                  labelText: "Select a category",
                  name: "search_scope",
                  optionsData: [
                    { text: "All fields", value: "all" },
                    { text: "Title", value: "title" },
                    { text: "Journal Title", value: "journal_title" },
                    { text: "Author/Contributor", value: "contributor" },
                    { text: "Standard Numbers", value: "standard_number" },
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
                  placeholder:
                    "Keyword, title, journal title, or author/contributor",
                }}
                sx={{
                  ".chakra-select__icon-wrapper": {
                    "z-index": "999 !important",
                  },
                }}
              />
            </Box>
            <Box className={styles.auxSearchContainer} pb="s">
              <EDSLink />
              {/* Temporary color update. The Header overrides the new
            DS 2.X CSS color variable values. */}
              <RCLink
                className={styles.advancedSearch}
                href={"/search/advanced"}
                color="#0069BF"
              >
                Advanced Search
              </RCLink>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default SearchForm
