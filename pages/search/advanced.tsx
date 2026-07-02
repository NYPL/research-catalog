import {
  useRef,
  useEffect,
  type SyntheticEvent,
  useState,
  useCallback,
  memo,
} from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Form,
  FormField,
  Flex,
  TextInput,
  HorizontalRule,
  Box,
  Banner,
  Icon,
  MultiSelect,
} from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, PATHS, SITE_NAME } from "../../src/config/constants"
import {
  textInputFields,
  languageOptions,
  collectionOptions,
  buildingLocationOptions,
  formatOptions,
  buildGoBackHref,
} from "../../src/utils/advancedSearchUtils"
import type { SearchParams } from "../../src/types/searchTypes"
import { getSearchQuery } from "../../src/utils/searchUtils"
import initializePatronTokenAuth from "../../src/server/auth"
import CancelSubmitButtonGroup from "../../src/components/AdvancedSearch/CancelSubmitButtonGroup"
import RCHead from "../../src/components/Head/RCHead"
import DateFilter from "../../src/components/DateFilter/DateFilter"
import MultiSelectWithGroupTitles from "../../src/components/AdvancedSearch/MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import Link from "../../src/components/Link/Link"
import { useDateFilter } from "../../src/hooks/useDateFilter"
import { idConstants, useFocusContext } from "../../src/context/FocusContext"
import { flushSync } from "react-dom"

export const defaultEmptySearchErrorMessage =
  "Error: please enter at least one field to submit an advanced search."
export const dateErrorMessage =
  "Please enter a valid date format (YYYY, YYYY/MM, or YYYY/MM/DD) and try again."

/** Isolated memoized components to prevent unnecessary rerenders */

interface TextInputFieldProps {
  name: string
  label: string
  resetKey: number
  globalInputChangeHandler: () => void
}

const TextInputField = memo(
  ({
    name,
    label,
    resetKey,
    globalInputChangeHandler,
  }: TextInputFieldProps) => {
    const [value, setValue] = useState("")

    useEffect(() => {
      setValue("")
    }, [resetKey])

    return (
      <FormField>
        <TextInput
          id={name}
          labelText={label}
          name={name}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            globalInputChangeHandler()
            setValue(e.target.value)
          }}
        />
      </FormField>
    )
  }
)
TextInputField.displayName = "TextInputField"

interface MultiSelectMemoProps {
  fieldValue: string
  label: string
  options: { id: string; name: string }[]
  onSelectionChange: (field: string, values: string[]) => void
  resetKey: number
  globalInputChangeHandler: () => void
}

const MultiSelectMemo = memo(
  ({
    fieldValue,
    label,
    options,
    onSelectionChange,
    resetKey,
    globalInputChangeHandler,
  }: MultiSelectMemoProps) => {
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
      setSelected([])
    }, [resetKey])

    const handleChange = useCallback(
      (value: string | null) => {
        globalInputChangeHandler()
        setSelected((prev) => {
          const next =
            value === null
              ? []
              : prev.includes(value)
              ? prev.filter((v) => v !== value)
              : [...prev, value]
          onSelectionChange(fieldValue, next)
          return next
        })
      },
      [fieldValue, onSelectionChange, globalInputChangeHandler]
    )

    return (
      <div>
        <MultiSelect
          sx={{ "div > div > button": { height: "40px" }, mb: "25.5px" }}
          id={fieldValue}
          isSearchable
          closeOnBlur
          buttonText={label}
          selectedItems={{ [fieldValue]: { items: selected } }}
          items={options}
          onChange={(e) => handleChange(e.target.id)}
          onClear={() => handleChange(null)}
        />
      </div>
    )
  }
)
MultiSelectMemo.displayName = "MultiSelectMemo"

interface DivisionSelectMemoProps {
  onSelectionChange: (field: string, values: string[]) => void
  resetKey: number
  globalInputChangeHandler: () => void
}

const DivisionSelectMemo = memo(
  ({
    onSelectionChange,
    resetKey,
    globalInputChangeHandler,
  }: DivisionSelectMemoProps) => {
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
      setSelected([])
    }, [resetKey])

    const handleChange = useCallback(
      (value: string | null) => {
        globalInputChangeHandler()
        setSelected((prev) => {
          const next =
            value === null
              ? []
              : prev.includes(value)
              ? prev.filter((v) => v !== value)
              : [...prev, value]
          onSelectionChange("collection", next)
          return next
        })
      },
      [onSelectionChange, globalInputChangeHandler]
    )

    return (
      <MultiSelectWithGroupTitles
        field={{ value: "collection", label: "Division" }}
        groupedItems={collectionOptions}
        onChange={(e) => handleChange(e.target.id)}
        onClear={() => handleChange(null)}
        selectedItems={{ collection: { items: selected } }}
      />
    )
  }
)
DivisionSelectMemo.displayName = "DivisionSelectMemo"

/** Advanced search page */

interface AdvancedSearchPropTypes {
  isAuthenticated: boolean
  goBackHref?: null | string
}

export default function AdvancedSearch({
  isAuthenticated,
  goBackHref,
}: AdvancedSearchPropTypes) {
  const metadataTitle = `Advanced search | ${SITE_NAME}`
  const router = useRouter()
  const liveRegionRef = useRef<HTMLDivElement | null>(null)
  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    defaultEmptySearchErrorMessage
  )
  // resetKey is incremented when "Clear fields" is clicked
  // It is passed to memoized components, which have corresponding useEffect to trigger clear
  const [resetKey, setResetKey] = useState(0)
  const { setPersistentFocus } = useFocusContext()

  const globalInputChangeHandler = useCallback(() => {
    setAlert(false)
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = ""
    }
  }, [])

  const filterValuesRef = useRef<Record<string, string[]>>({
    language: [],
    format: [],
    buildingLocation: [],
    collection: [],
  })

  const handleFilterSelectionChange = useCallback(
    (field: string, values: string[]) => {
      filterValuesRef.current[field] = values
    },
    []
  )

  const { dateFilterProps, clearInputs: clearDateInputs } = useDateFilter({
    dateTo: "",
    dateFrom: "",
    changeHandler: globalInputChangeHandler,
    clearHandler: () => {
      dateFilterProps.dateTo = ""
      dateFilterProps.dateFrom = ""
    },
  })
  const { dateError } = dateFilterProps

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const submittedDates = {
      dateFrom: (formData.get("dateFrom") as string) ?? "",
      dateTo: (formData.get("dateTo") as string) ?? "",
    }

    flushSync(() => dateFilterProps.onBlur(submittedDates))
    const errors = dateFilterProps.onApply(submittedDates)
    if (Object.keys(errors).length > 0) {
      let dateFieldError = ""
      if (errors.combined || errors.range || (errors.from && errors.to))
        dateFieldError = "The 'from' and 'to' fields contain errors."
      else if (errors.from)
        dateFieldError = "The 'from' date field contains an error."
      else if (errors.to)
        dateFieldError = "The 'to' date field contains an error."
      setErrorMessage(`${dateFieldError} ${dateErrorMessage}`)
      setAlert(true)
      return
    }

    const searchParams = {}
    textInputFields.forEach((field) => {
      searchParams[field.name] = formData.get(field.name) ?? ""
    })
    searchParams["filters"] = {
      ...filterValuesRef.current,
      dateTo: submittedDates.dateTo,
      dateFrom: submittedDates.dateFrom,
    }

    const queryString = getSearchQuery(searchParams)

    // If empty search (even with default sort) set error
    if (!queryString.length || queryString === "?q=&sort=relevance") {
      setErrorMessage(defaultEmptySearchErrorMessage)
      setAlert(true)
    } else {
      setPersistentFocus(idConstants.searchResultsHeading)
      await router.push(`${PATHS.SEARCH}${queryString}&searched_from=advanced`)
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    setAlert(false)
    clearDateInputs()
    filterValuesRef.current = {
      language: [],
      format: [],
      buildingLocation: [],
      collection: [],
    }
    setResetKey((k) => k + 1)

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "All fields have been cleared."
    }
  }

  useEffect(() => {
    if (alert && !Object.keys(dateError || {}).length) {
      setPersistentFocus(idConstants.advancedSearchError)
    }
  }, [alert, dateError])

  const nonDivisionMultiSelectFields = [
    { value: "format", label: "Format", options: formatOptions },
    {
      value: "buildingLocation",
      label: "Item location",
      options: buildingLocationOptions,
    },
    { value: "language", label: "Language", options: languageOptions },
  ]

  const multiselects = nonDivisionMultiSelectFields.map((field) => (
    <div key={field.value}>
      <MultiSelectMemo
        fieldValue={field.value}
        label={field.label}
        options={field.options}
        onSelectionChange={handleFilterSelectionChange}
        resetKey={resetKey}
        globalInputChangeHandler={globalInputChangeHandler}
      />
    </div>
  ))

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="advanced">
        <Heading level="h2" mb="s">
          Advanced search
        </Heading>
        {/* Always render the wrapper element that will display the
          dynamically rendered notification for focus management */}
        <Box tabIndex={-1} id="advanced-search-error">
          {alert && <Banner variant="negative" content={errorMessage} mb="s" />}
        </Box>
        <div
          ref={liveRegionRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            margin: "-1px",
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            border: 0,
          }}
        ></div>
        <Form
          id="advancedSearchForm"
          // We are using a post request on advanced search when JS is disabled
          // so that we can build the query string correctly on the server and
          // redirect the user to the search results.
          method="post"
          action={`${BASE_URL}/search`}
          onSubmit={handleSubmit}
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Flex
              id="advancedSearchLeft"
              gap="s"
              direction="column"
              grow="1"
              width={{ base: "100%", md: "50%" }}
            >
              {textInputFields.map(({ name, label }) => (
                <TextInputField
                  key={name}
                  name={name}
                  label={label}
                  resetKey={resetKey}
                  globalInputChangeHandler={globalInputChangeHandler}
                />
              ))}
              <FormField gridGap="xs">
                <DateFilter
                  key={resetKey}
                  isAdvancedSearch
                  {...dateFilterProps}
                />
              </FormField>
            </Flex>
            <Flex
              direction="column"
              gap="s"
              grow="1"
              mt="25px"
              width={{ base: "100%", md: "50%" }}
            >
              {multiselects}
              <DivisionSelectMemo
                key="collection"
                onSelectionChange={handleFilterSelectionChange}
                resetKey={resetKey}
                globalInputChangeHandler={globalInputChangeHandler}
              />
            </Flex>
          </Flex>

          <HorizontalRule __css={{ margin: 0 }} />
          <Flex
            justifyContent={goBackHref ? "space-between" : "right"}
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            {goBackHref && (
              <Link
                display="flex"
                href={goBackHref}
                variant="buttonSecondary"
                id="back-to-search"
              >
                <Icon
                  name="arrow"
                  iconRotation="rotate90"
                  align="left"
                  size="small"
                  mr="xs"
                />
                Go back
              </Link>
            )}
            <CancelSubmitButtonGroup
              formName="advanced-search"
              cancelHandler={handleClear}
              cancelLabel="Clear fields"
              submitLabel="Search"
            />
          </Flex>
        </Form>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const goBackHref = buildGoBackHref(req.headers.referer)
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid
  return { props: { isAuthenticated, goBackHref } }
}
