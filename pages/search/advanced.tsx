import Head from "next/head"
import { useState, useReducer, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { debounce } from "underscore"
import type { SyntheticEvent } from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  Heading,
  Form,
  FormField,
  Flex,
  TextInput,
  Select,
  HorizontalRule,
  Box,
  Banner,
  Icon,
} from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, PATHS, SITE_NAME } from "../../src/config/constants"
import { searchFormReducer } from "../../src/reducers/searchFormReducer"
import {
  initialSearchFormState,
  textInputFields,
  languageOptions,
  buildGoBackHref,
} from "../../src/utils/advancedSearchUtils"
import type {
  SearchParams,
  SearchFormActionType,
} from "../../src/types/searchTypes"
import { getSearchQuery } from "../../src/utils/searchUtils"
import initializePatronTokenAuth from "../../src/server/auth"
import { appConfig } from "../../src/config/config"
import { useDateForm } from "../../src/hooks/useDateForm"
import DateForm from "../../src/components/SearchFilters/DateForm"
import SearchFilterCheckboxField from "../../src/components/RefineSearch/SearchFilterCheckboxField"
import CancelSubmitButtonGroup from "../../src/components/RefineSearch/CancelSubmitButtonGroup"
import { materialTypeOptions } from "../../src/utils/advancedSearchUtils"
import { searchAggregations } from "../../src/config/aggregations"
import RCLink from "../../src/components/Links/RCLink/RCLink"

export const defaultEmptySearchErrorMessage =
  "Error: please enter at least one field to submit an advanced search."
interface AdvancedSearchPropTypes {
  isAuthenticated: boolean
  goBackHref?: null | string
}
/**
 * The Advanced Search page is responsible for displaying the Advanced Search form fields and
 * buttons that clear the fields and submit a search request.
 */
export default function AdvancedSearch({
  isAuthenticated,
  goBackHref,
}: AdvancedSearchPropTypes) {
  const metadataTitle = `Advanced search | ${SITE_NAME}`
  const router = useRouter()
  const inputRef = useRef<TextInputRefType>()
  const notificationRef = useRef<HTMLDivElement>()
  const debounceInterval = 20
  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]

  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    defaultEmptySearchErrorMessage
  )
  const [searchFormState, dispatch] = useReducer(
    searchFormReducer,
    initialSearchFormState
  )
  const {
    dateFormProps,
    validateDateRange,
    clearInputs: clearDateInputs,
  } = useDateForm({
    inputRefs: dateInputRefs,
    dateBefore: searchFormState["filters"].dateBefore,
    dateAfter: searchFormState["filters"].dateAfter,
    changeHandler: (e) => handleInputChange(e, "filter_change"),
  })

  const handleInputChange = (e: SyntheticEvent, type: SearchFormActionType) => {
    e.preventDefault()
    alert && setAlert(false)
    const target = e.target as HTMLInputElement

    dispatch({
      type: type,
      field: target.name,
      payload: target.value,
    })
  }

  const handleCheckboxChange = (field: string, types: string[]) => {
    alert && setAlert(false)
    dispatch({
      type: "filter_change",
      field: field,
      payload: types,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!validateDateRange()) return
    const queryString = getSearchQuery(searchFormState as SearchParams)

    if (!queryString.length) {
      setErrorMessage(defaultEmptySearchErrorMessage)
      setAlert(true)
      // Very basic validation for the date range.
    } else {
      // If the NEXT_PUBLIC_REVERSE_PROXY_ENABLED feature flag is present, use window.location.replace
      // instead of router.push to forward search results to DFE.
      if (appConfig.features.reverseProxyEnabled[appConfig.environment]) {
        window.location.replace(`${BASE_URL}${PATHS.SEARCH}${queryString}`)
      } else {
        await router.push(`${PATHS.SEARCH}${queryString}`)
      }
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    alert && setAlert(false)
    clearDateInputs()
    inputRef.current.value = ""
    dispatch({ type: "form_reset", payload: initialSearchFormState })
  }

  useEffect(() => {
    if (alert && notificationRef.current) {
      notificationRef.current.focus()
    }
  }, [alert])
  return (
    <>
      <Head>
        <meta property="og:title" content={metadataTitle} key="og-title" />
        <meta
          property="og:site_name"
          content={metadataTitle}
          key="og-site-name"
        />
        <meta name="twitter:title" content={metadataTitle} key="tw-title" />
        <title key="main-title">{metadataTitle}</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="advanced">
        {/* Always render the wrapper element that will display the
          dynamically rendered notification for focus management */}
        <Box tabIndex={-1} ref={notificationRef}>
          {alert && <Banner type="negative" content={errorMessage} mb="s" />}
        </Box>
        <Heading level="h2">Advanced search</Heading>
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
            <Flex id="advancedSearchLeft" gap="s" direction="column">
              {textInputFields.map(({ name, label }) => {
                return (
                  <FormField key={name}>
                    <TextInput
                      id={name}
                      labelText={label}
                      name={name}
                      value={searchFormState[name]}
                      onChange={debounce(
                        (e) => handleInputChange(e, "input_change"),
                        debounceInterval
                      )}
                      ref={inputRef}
                    />
                  </FormField>
                )
              })}
              <FormField>
                <Select
                  id="languageSelect"
                  name="language"
                  labelText="Language"
                  value={searchFormState["filters"].language}
                  onChange={(e) => handleInputChange(e, "filter_change")}
                >
                  {languageOptions.map((language) => {
                    return (
                      <option value={language.value} key={language.value}>
                        {language.label}
                      </option>
                    )
                  })}
                </Select>
              </FormField>
              <FormField>{<DateForm {...dateFormProps} />}</FormField>
            </Flex>
            <Flex direction="column" gap="l">
              <SearchFilterCheckboxField
                options={searchAggregations.buildingLocation}
                name="location"
                label="Item location"
                handleCheckboxChange={(e) =>
                  handleCheckboxChange("buildingLocation", e)
                }
                searchFormState={searchFormState["filters"].buildingLocation}
                gridOptions={{ min: 1, max: 1 }}
              />
              <SearchFilterCheckboxField
                options={materialTypeOptions}
                name="format"
                label="Format"
                handleCheckboxChange={(e) =>
                  handleCheckboxChange("materialType", e)
                }
                searchFormState={searchFormState["filters"].materialType}
              />
            </Flex>
          </Flex>
          <HorizontalRule __css={{ margin: 0 }} />
          <Flex
            justifyContent={goBackHref ? "space-between" : "right"}
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            {goBackHref && (
              <RCLink
                display="flex"
                href={goBackHref}
                type="buttonSecondary"
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
              </RCLink>
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
  return {
    props: { isAuthenticated, goBackHref },
  }
}
