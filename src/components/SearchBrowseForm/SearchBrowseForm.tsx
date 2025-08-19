import {
  Box,
  Flex,
  Icon,
  SearchBar,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import {
  useState,
  type SyntheticEvent,
  type Dispatch,
  type SetStateAction,
} from "react"
import { useFocusContext } from "../../context/FocusContext"
import useLoading from "../../hooks/useLoading"
import styles from "../../../styles/components/Search.module.scss"

type SearchBrowseFormProps = {
  initialScope: string
  path: string
  tipTitle: string
  labelText?: string
  selectOptions: {
    [key: string]: {
      text: string
      searchTip?: string
      placeholder: string
    }
  }
  scopeParamKey: string
  getQueryString: (params: { [key: string]: string }) => string
  onSubmitFocusId?: string | null
  children?: React.ReactNode
}

const SearchBrowseForm = ({
  initialScope,
  path,
  tipTitle,
  labelText = "Search Bar Label",
  selectOptions,
  scopeParamKey,
  getQueryString,
  onSubmitFocusId = null,
  children,
}: SearchBrowseFormProps) => {
  const router = useRouter()
  const isLoading = useLoading()
  const { setPersistentFocus } = useFocusContext()
  const slug = Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug

  const [searchTerm, setSearchTerm] = useState(
    (router?.query?.q as string) || slug || ""
  )
  const [searchScope, setSearchScope] = useState(
    (router?.query?.search_scope as string) || initialScope
  )

  const placeholder = selectOptions[searchScope].placeholder
  const tipText = selectOptions[searchScope].searchTip

  const formattedSelectOptions = Object.keys(selectOptions).map((key) => ({
    text: selectOptions[key].text,
    value: key,
  }))

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
      [scopeParamKey]: searchScope,
    }

    const queryString = getQueryString(params)

    setPersistentFocus(onSubmitFocusId)
    await router.push(`${path}${queryString}`)
  }

  return (
    <div className={`${styles.searchContainer} no-print`}>
      <div className={styles.searchContainerInner}>
        <Text size="body2" className={styles.searchTip}>
          <Icon size="medium" name="errorOutline" iconRotation="rotate180" />
          <Box as="span" className={styles.searchTipText}>
            <span className={styles.searchTipTitle}>{tipTitle}</span>
            {tipText}
          </Box>
        </Text>
        <SearchBar
          id="mainContent"
          action={path}
          method="get"
          onSubmit={handleSubmit}
          labelText={labelText}
          isDisabled={isLoading}
          pb={{ base: children ? 0 : "l", md: 0 }}
          selectProps={{
            value: searchScope,
            onChange: (e) => handleChange(e, setSearchScope),
            labelText: "Select a category",
            name: scopeParamKey,
            optionsData: formattedSelectOptions,
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
        {children && (
          <Flex
            direction="column"
            justifyContent="space-between"
            mt={{ base: 0, md: "s" }}
          >
            {children}
          </Flex>
        )}
      </div>
    </div>
  )
}

export default SearchBrowseForm
