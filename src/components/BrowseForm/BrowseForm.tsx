import {
  Box,
  Icon,
  SearchBar,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import type { SyntheticEvent, Dispatch, SetStateAction } from "react"
import { useState } from "react"
import { BASE_URL, PATHS } from "../../config/constants"
import useLoading from "../../hooks/useLoading"
import styles from "../../../styles/components/Search.module.scss"
import { useFocusContext, idConstants } from "../../context/FocusContext"
import {
  browseFormSelectOptions,
  getBrowseQuery,
} from "../../utils/browseUtils"

/**
 * The BrowseForm component renders and controls the Browse form.
 */
const BrowseForm = () => {
  const router = useRouter()
  const [browseTerm, setBrowseTerm] = useState(
    (router?.query?.q as string) || ""
  )
  const [searchScope, setSearchScope] = useState(
    (router?.query?.search_scope as string) || "has"
  )

  const isLoading = useLoading()

  const { setPersistentFocus } = useFocusContext()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const browseParams = {
      q: browseTerm,
      searchScope,
    }
    const queryString = getBrowseQuery(browseParams)

    if (router.asPath.includes("/browse?"))
      setPersistentFocus(idConstants.browseResultsHeading)
    // if we are doing a search from the home page, there should be no focused element when results are delivered
    else setPersistentFocus(null)
    await router.push(`${PATHS.BROWSE}${queryString}`)
  }

  const handleChange = (
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement
    setValue(target.value)
  }

  return (
    <Box className="no-print" backgroundColor="ui.bg.default" pt="l" pb="l">
      <Box mb="0" mr="auto" ml="auto" mt="0" maxWidth="1280px" pr="s" pl="s">
        <Text size="body2" className={styles.searchTip}>
          <Icon size="medium" name="errorOutline" iconRotation="rotate180" />
          <Box as="span" className={styles.searchTipText}>
            <span className={styles.searchTipTitle}>{"Browse tip: "}</span>
            Enter one or more keywords in any order to browse the Subject
            Headings index.
          </Box>
        </Text>
        <SearchBar
          id="mainContent"
          action={`${BASE_URL}/browse`}
          method="get"
          onSubmit={handleSubmit}
          labelText="Browse bar"
          isDisabled={isLoading}
          selectProps={{
            value: searchScope,
            onChange: (e) => handleChange(e, setSearchScope),
            labelText: "Select a category",
            name: "search_scope",
            optionsData: browseFormSelectOptions,
          }}
          textInputProps={{
            isClearable: true,
            onChange: (e) => handleChange(e, setBrowseTerm),
            isClearableCallback: () => setBrowseTerm(""),
            value: browseTerm,
            name: "q",
            placeholder: "Example: Ornithology or Vietnam War",
            labelText: "Enter one or more keywords.",
          }}
        />
      </Box>
    </Box>
  )
}

export default BrowseForm
