import {
  useReducer,
  useRef,
  useEffect,
  type SyntheticEvent,
  useState,
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
import {
  BASE_URL,
  DEBOUNCE_INTERVAL,
  PATHS,
  SITE_NAME,
} from "../../src/config/constants"
import { searchFormReducer } from "../../src/reducers/searchFormReducer"
import {
  initialSearchFormState,
  textInputFields,
  languageOptions,
  collectionOptions,
  buildingLocationOptions,
  formatOptions,
  buildGoBackHref,
} from "../../src/utils/advancedSearchUtils"
import type {
  SearchParams,
  SearchFormActionType,
} from "../../src/types/searchTypes"
import { getSearchQuery } from "../../src/utils/searchUtils"
import initializePatronTokenAuth from "../../src/server/auth"
import CancelSubmitButtonGroup from "../../src/components/AdvancedSearch/CancelSubmitButtonGroup"
import RCHead from "../../src/components/Head/RCHead"
import DateFilter from "../../src/components/DateFilter/DateFilter"
import { debounce } from "underscore"
import MultiSelectWithGroupTitles from "../../src/components/AdvancedSearch/MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"
import Link from "../../src/components/Link/Link"
import { useDateFilter } from "../../src/hooks/useDateFilter"
import { idConstants, useFocusContext } from "../../src/context/FocusContext"
import { flushSync } from "react-dom"

export const defaultEmptySearchErrorMessage =
  "Error: please enter at least one field to submit an advanced search."
export const dateErrorMessage =
  "Please enter a valid date format (YYYY, YYYY/MM, or YYYY/MM/DD) and try again."

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
  const { setPersistentFocus } = useFocusContext()

  const [searchFormState, dispatch] = useReducer(
    searchFormReducer,
    initialSearchFormState
  )

  const { dateFilterProps, clearInputs: clearDateInputs } = useDateFilter({
    dateTo: searchFormState["filters"].dateTo,
    dateFrom: searchFormState["filters"].dateFrom,
    changeHandler: (e) => handleInputChange(e, "filter_change"),
    clearHandler: () => {
      dispatch({
        type: "filter_change",
        field: "dateFrom",
        payload: "",
      })
      dispatch({
        type: "filter_change",
        field: "dateTo",
        payload: "",
      })
    },
  })
  const { dateError } = dateFilterProps

  const handleInputChange = (e: SyntheticEvent, type: SearchFormActionType) => {
    e.preventDefault()
    alert && setAlert(false)
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = ""
    }
    const target = e.target as HTMLInputElement
    dispatch({
      type: type,
      field: target.name,
      payload: target.value,
    })
  }

  const handleFilterChange = (field: string, value: string | null) => {
    setAlert(false)
    if (value === null) {
      dispatch({
        type: "filter_change",
        field,
        payload: [],
      })
      return
    }

    const currentValues = searchFormState["filters"][field] || []
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    dispatch({
      type: "filter_change",
      field,
      payload: updatedValues,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    flushSync(() => dateFilterProps.onBlur())
    const errors = dateFilterProps.onApply()
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

    const queryString = getSearchQuery(searchFormState as SearchParams)
    if (!queryString.length) {
      setErrorMessage(defaultEmptySearchErrorMessage)
      setAlert(true)
    } else {
      await router.push(`${PATHS.SEARCH}${queryString}&searched_from=advanced`)
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    setAlert(false)
    clearDateInputs()
    dispatch({ type: "form_reset", payload: initialSearchFormState })

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "All fields have been cleared."
    }
  }

  useEffect(() => {
    if (alert && !Object.keys(dateError || {}).length) {
      setPersistentFocus(idConstants.advancedSearchError)
    }
  }, [alert, dateError])

  const fields = [
    { value: "format", label: "Format", options: formatOptions },
    {
      value: "buildingLocation",
      label: "Item location",
      options: buildingLocationOptions,
    },
    { value: "language", label: "Language", options: languageOptions },
    { value: "collection", label: "Collection", options: collectionOptions },
  ]

  const multiselects = fields.map((field) => {
    return field.value !== "collection" ? (
      <div key={field.value}>
        <MultiSelect
          sx={{
            "div > div > button": {
              height: "40px",
            },
            mb: "25.5px",
          }}
          id={field.value}
          isSearchable
          closeOnBlur
          buttonText={field.label}
          selectedItems={{
            [field.value]: {
              items: searchFormState["filters"][field.value],
            },
          }}
          items={field.options}
          onChange={(e) => handleFilterChange(field.value, e.target.id)}
          onClear={() => handleFilterChange(field.value, null)}
        />
      </div>
    ) : (
      <MultiSelectWithGroupTitles
        key={field.value}
        field={{ value: field.value, label: "Division" }}
        groupedItems={field.options}
        onChange={(e) => {
          handleFilterChange(field.value, e.target.id)
        }}
        onClear={() => handleFilterChange(field.value, null)}
        selectedItems={{
          [field.value]: {
            items: searchFormState["filters"][field.value],
          },
        }}
      />
    )
  })
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
                <FormField key={name}>
                  <TextInput
                    id={name}
                    labelText={label}
                    name={name}
                    value={searchFormState[name]}
                    onChange={debounce(
                      (e) => handleInputChange(e, "input_change"),
                      DEBOUNCE_INTERVAL
                    )}
                  />
                </FormField>
              ))}
              <FormField gridGap="xs">
                <DateFilter isAdvancedSearch {...dateFilterProps} />
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
