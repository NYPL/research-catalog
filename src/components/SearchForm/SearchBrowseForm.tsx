// components/Shared/SearchBrowseForm.tsx

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
  useEffect,
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
  placeholder: string
  tipTitle: string
  tipText: string
  labelText?: string
  selectOptions: { text: string; value: string }[]
  queryParamKeys: {
    searchTerm: string
    searchScope: string
  }
  getQueryString: (params: { [key: string]: string }) => string
  onSubmitFocusId?: string | null
  children?: React.ReactNode
}

const SearchBrowseForm = ({
  initialScope,
  path,
  placeholder,
  tipTitle,
  tipText,
  labelText = "Search",
  selectOptions,
  queryParamKeys,
  getQueryString,
  onSubmitFocusId = null,
  children,
}: SearchBrowseFormProps) => {
  const router = useRouter()
  const isLoading = useLoading()
  const { setPersistentFocus } = useFocusContext()

  const [searchTerm, setSearchTerm] = useState(
    (router?.query?.[queryParamKeys.searchTerm] as string) || ""
  )
  const [searchScope, setSearchScope] = useState(
    (router?.query?.[queryParamKeys.searchScope] as string) || initialScope
  )

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
      [queryParamKeys.searchTerm]: searchTerm,
      [queryParamKeys.searchScope]: searchScope,
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
          selectProps={{
            value: searchScope,
            onChange: (e) => handleChange(e, setSearchScope),
            labelText: "Select a category",
            name: queryParamKeys.searchScope,
            optionsData: selectOptions,
          }}
          textInputProps={{
            isClearable: true,
            onChange: (e) => handleChange(e, setSearchTerm),
            isClearableCallback: () => setSearchTerm(""),
            value: searchTerm,
            name: queryParamKeys.searchTerm,
            placeholder,
            labelText: tipText,
          }}
        />
        {children && (
          <Flex direction="column" justifyContent="space-between" mt="s">
            {children}
          </Flex>
        )}
      </div>
    </div>
  )
}

export default SearchBrowseForm
