import { useEffect, useRef, type SyntheticEvent, useState } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Form,
  FormField,
  Flex,
  HorizontalRule,
  Box,
  Banner,
  Icon,
} from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, PATHS, SITE_NAME } from "../../src/config/constants"
import {
  getInitialSearchFormState,
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
import Link from "../../src/components/Link/Link"
import { useDateFilter } from "../../src/hooks/useDateFilter"
import { idConstants, useFocusContext } from "../../src/context/FocusContext"
import IsolatedMultiSelect from "../../src/components/AdvancedSearch/IsolatedMultiSelect"
import DivisionSelect from "../../src/components/AdvancedSearch/DivisionSelect"
import IsolatedTextInput from "../../src/components/AdvancedSearch/IsolatedTextInput"

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
  // resetKey is incremented when "Clear fields" is clicked. It is contained in the key
  // of isolated components, so incrementation triggers a reset of those components
  const [resetKey, setResetKey] = useState(0)
  const { setPersistentFocus } = useFocusContext()

  const globalInputChangeHandler = () => {
    alert && setAlert(false)
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = ""
    }
  }

  // The isolated components operate as the local state for each input, and they are
  // responsible for updating formStateRef. formStateRef acts as the global form state.
  // It is write-only from the point of view of the isolated components, and is only
  // read from when we are submitting the final form.
  const formStateRef = useRef<SearchParams>(getInitialSearchFormState())

  const handleTextInputChange = (field: string, value: string) => {
    globalInputChangeHandler()
    formStateRef.current[field] = value
  }

  const handleFilterChange = (field: string, values: string[]) => {
    globalInputChangeHandler()
    formStateRef.current["filters"][field] = values
  }

  // DateFilter manages own state because formStateRef updates don't trigger hooks
  // correctly
  const { dateFilterProps } = useDateFilter({
    dateTo: "",
    dateFrom: "",
    changeHandler: (e: React.SyntheticEvent) => {
      globalInputChangeHandler()
      const target = e.target as HTMLInputElement
      formStateRef.current["filters"][target.name] = target.value
    },
  })
  const { dateError } = dateFilterProps

  useEffect(() => {
    if (alert && !Object.keys(dateError || {}).length) {
      setPersistentFocus(idConstants.advancedSearchError)
    }
  }, [alert, dateError, setPersistentFocus])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const submittedDates = {
      dateFrom: formStateRef.current["filters"].dateFrom,
      dateTo: formStateRef.current["filters"].dateTo,
    }

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

    const queryString = getSearchQuery(formStateRef.current)

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
    formStateRef.current = getInitialSearchFormState()
    setResetKey((k) => k + 1)

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "All fields have been cleared."
    }
  }

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
      <IsolatedMultiSelect
        key={`${field.value}-${resetKey}`}
        field={field.value}
        label={field.label}
        options={field.options}
        onSelectionChange={handleFilterChange}
      />
    ) : (
      <DivisionSelect
        key={`collection-${resetKey}`}
        collectionOptions={collectionOptions}
        onSelectionChange={handleFilterChange}
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
                  <IsolatedTextInput
                    key={`${name}-${resetKey}`}
                    name={name}
                    label={label}
                    onChange={handleTextInputChange}
                  />
                </FormField>
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
