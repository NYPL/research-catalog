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
  ButtonGroup,
  Button,
  Box,
  Banner,
} from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, PATHS, SITE_NAME } from "../../src/config/constants"
import { searchFormReducer } from "../../src/reducers/searchFormReducer"
import {
  initialSearchFormState,
  textInputFields,
  languageOptions,
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
import AdvancedSearchCheckboxField from "../../src/components/RefineSearch/AdvancedSearchCheckboxField"

export const defaultEmptySearchErrorMessage =
  "Error: please enter at least one field to submit an advanced search."

/**
 * The Advanced Search page is responsible for displaying the Advanced Search form fields and
 * buttons that clear the fields and submit a search request.
 */
export default function AdvancedSearch({ isAuthenticated }) {
  const metadataTitle = `Advanced Search | ${SITE_NAME}`
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

  const handleCheckboxChange = (types: string[]) => {
    alert && setAlert(false)
    dispatch({
      type: "filter_change",
      field: "materialType",
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
          dynamically rendered notification */}
        <Box tabIndex={-1} ref={notificationRef}>
          {alert && <Banner type="negative" content={errorMessage} mb="s" />}
        </Box>
        <Heading level="h2">Advanced Search</Heading>
        <Form
          id="advancedSearchForm"
          // We are using a post request on advanced search when JS is disabled
          // so that we can build the query string correctly on the server and
          // redirect the user to the search results.
          method="post"
          action={`${BASE_URL}/search`}
          onSubmit={handleSubmit}
        >
          <Flex
            sx={{
              gridTemplateColumns: {
                md: "repeat(2, minmax(0, 1fr)) !important",
              },
            }}
          >
            <Box id="advancedSearchLeft" gap="grid.s">
              {textInputFields.map(({ name, label }) => {
                return (
                  <TextInput
                    id={name}
                    labelText={label}
                    name={name}
                    value={searchFormState[name]}
                    key={name}
                    onChange={debounce(
                      (e) => handleInputChange(e, "input_change"),
                      debounceInterval
                    )}
                    ref={inputRef}
                  />
                )
              })}
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
              <FormField>{<DateForm {...dateFormProps} />}</FormField>
            </Box>
            <Flex direction="column" gap="l">
              <AdvancedSearchCheckboxField
                name="location"
                label="Location"
                handleCheckboxChange={handleCheckboxChange}
                searchFormState={searchFormState["filters"].buildingLocation}
              />
              <AdvancedSearchCheckboxField
                name="format"
                label="Format"
                handleCheckboxChange={handleCheckboxChange}
                searchFormState={searchFormState["filters"].materialType}
              />
            </Flex>
          </Flex>
          <HorizontalRule __css={{ margin: 0 }} />
          <FormField>
            <ButtonGroup
              id="advancedSearchButtons"
              __css={{
                marginLeft: "auto",
              }}
            >
              <Button
                type="button"
                id="advancedSearchClear"
                buttonType="secondary"
                onClick={handleClear}
                size="large"
              >
                Clear
              </Button>
              <Button id="advancedSearchSubmit" type="submit" size="large">
                Submit
              </Button>
            </ButtonGroup>
          </FormField>
        </Form>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid
  return {
    props: { isAuthenticated },
  }
}
