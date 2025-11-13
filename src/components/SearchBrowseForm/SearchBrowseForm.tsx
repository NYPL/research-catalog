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
  useEffect,
  useState,
  type SyntheticEvent,
  type Dispatch,
  type SetStateAction,
} from "react"
import { useFocusContext } from "../../context/FocusContext"
import useLoading from "../../hooks/useLoading"
import styles from "../../../styles/components/Search.module.scss"
import type { RCPage } from "../../types/pageTypes"

type SearchBrowseFormProps = {
  initialScope: string
  path: string
  tipTitle: string
  labelText?: string
  selectOptions: {
    [key: string]: {
      text: string
      searchTip?: string | JSX.Element
      placeholder: string
    }
  }
  scopeParamKey: string
  getQueryString: (params: { [key: string]: string }) => string
  onSubmitFocusId?: string | null
  children?: React.ReactNode
  activePage: RCPage
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
  activePage,
}: SearchBrowseFormProps) => {
  const router = useRouter()
  const isLoading = useLoading()

  const [backUrl, setBackUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ref = document.referrer
      if (ref.includes("/browse?q")) {
        setBackUrl(ref)
      }
    }
  }, [])
  const { setPersistentFocus } = useFocusContext()
  const [searchTerm, setSearchTerm] = useState(
    (router?.query?.q as string) || ""
  )
  const [searchScope, setSearchScope] = useState(
    (router?.query?.search_scope as string) || initialScope
  )

  useEffect(() => {
    setSearchTerm((router.query.q as string) || "")
    setSearchScope((router.query.search_scope as string) || initialScope)
  }, [router.query.q, router.query.search_scope, initialScope])

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
        {(children || activePage === "sh-results") && (
          <Flex
            direction="column"
            justifyContent="space-between"
            mt={{ base: "0", md: "xs" }}
          >
            {activePage === "sh-results" && backUrl && (
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
            {children}
          </Flex>
        )}
      </Box>
    </div>
  )
}

export default SearchBrowseForm
