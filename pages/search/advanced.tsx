import Head from "next/head"
import { useState, useReducer, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { debounce } from "underscore"
import type { SyntheticEvent } from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  Heading,
  Notification,
  Form,
  FormField,
  FormRow,
  TextInput,
  Select,
  CheckboxGroup,
  Checkbox,
  HorizontalRule,
  ButtonGroup,
  Button,
  Box,
  Fieldset,
} from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, PATHS, SITE_NAME } from "../../src/config/constants"
import { searchFormReducer } from "../../src/reducers/searchFormReducer"
import {
  initialSearchFormState,
  textInputFields,
  languageOptions,
  materialTypeOptions,
} from "../../src/utils/advancedSearchUtils"
import type {
  SearchParams,
  SearchFormActionType,
} from "../../src/types/searchTypes"
import { getSearchQuery } from "../../src/utils/searchUtils"
// import FieldsetDate from "../../src/components/SearchFilters/FieldsetDate"

export const defaultEmptySearchErrorMessage =
  "Error: please enter at least one field to submit an advanced search."
export const badDateErrorMessage =
  "Error: the date range is invalid. Please try again."

/**
 * The Advanced Search page is responsible for displaying the Advanced Search form fields and
 * buttons that clear the fields and submit a search request.
 */
export default function AdvancedSearch() {
  const router = useRouter()
  const inputRef = useRef<TextInputRefType>()
  const notificationRef = useRef<HTMLDivElement>()
  const debounceInterval = 20

  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    defaultEmptySearchErrorMessage
  )
  const [searchFormState, dispatch] = useReducer(
    searchFormReducer,
    initialSearchFormState
  )

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
    const queryString = getSearchQuery(searchFormState as SearchParams)

    if (!queryString.length) {
      setErrorMessage(defaultEmptySearchErrorMessage)
      setAlert(true)
      // Very basic validation for the date range.
    } else if (
      searchFormState["filters"].dateAfter >
      searchFormState["filters"].dateBefore
    ) {
      // The error message can be better, but this is a start.
      setErrorMessage(badDateErrorMessage)
      setAlert(true)
    } else {
      // If the NEXT_PUBLIC_REVERSE_PROXY_ENABLED feature flag is present, use window.location.replace
      // instead of router.push to forward search results to DFE.
      if (process.env.NEXT_PUBLIC_REVERSE_PROXY_ENABLED) {
        window.location.replace(`${BASE_URL}${PATHS.SEARCH}${queryString}`)
      } else {
        await router.push(`${PATHS.SEARCH}${queryString}`)
      }
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    alert && setAlert(false)
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
        <title>Advanced Search | {SITE_NAME}</title>
      </Head>
      <Layout activePage="advanced">
        {/* Always render the wrapper element that will display the
          dynamically rendered notification */}
        <Box tabIndex={-1} ref={notificationRef}>
          {alert && (
            <Notification
              notificationType="warning"
              notificationContent={errorMessage}
              noMargin
              mb="s"
            />
          )}
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
          <FormField
            sx={{
              gridTemplateColumns: {
                md: "repeat(2, minmax(0, 1fr)) !important",
              },
            }}
          >
            <FormRow gap="grid.m">
              <FormField id="advancedSearchLeft" gap="grid.s">
                {textInputFields.map(({ name, label }) => {
                  return (
                    <TextInput
                      id={name}
                      labelText={label}
                      type="text"
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
                <FormRow>
                  <FormField>
                    <Fieldset
                      id="date-fieldset"
                      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                      legendText="Date"
                      display="grid"
                      gap="s"
                    >
                      <TextInput
                        id="date-from"
                        labelText="From"
                        type="text"
                        name="dateAfter"
                        helperText="e.g. 1901"
                        value={searchFormState["filters"].dateAfter}
                        onChange={debounce(
                          (e) => handleInputChange(e, "filter_change"),
                          debounceInterval
                        )}
                        ref={inputRef}
                      />
                      <TextInput
                        id="date-to"
                        labelText="To"
                        type="text"
                        name="dateBefore"
                        helperText="e.g. 2000"
                        value={searchFormState["filters"].dateBefore}
                        onChange={debounce(
                          (e) => handleInputChange(e, "filter_change"),
                          debounceInterval
                        )}
                        ref={inputRef}
                      />
                    </Fieldset>
                  </FormField>
                </FormRow>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField id="advancedSearchRight" gap="grid.s">
                <CheckboxGroup
                  id="formats"
                  name="formats"
                  labelText="Format"
                  onChange={handleCheckboxChange}
                  value={searchFormState["filters"].materialType}
                  __css={{
                    "> div": {
                      display: "grid",
                      gridTemplateColumns: { md: "repeat(2, minmax(0, 1fr))" },
                      gridGap: "var(--nypl-space-s)",
                      div: {
                        marginTop: "0 !important",
                      },
                    },
                  }}
                >
                  {materialTypeOptions.map((materialType) => {
                    return (
                      <Checkbox
                        id={materialType.value}
                        key={materialType.value}
                        labelText={materialType.label}
                        value={materialType.value}
                      />
                    )
                  })}
                </CheckboxGroup>
              </FormField>
            </FormRow>
          </FormField>
          <HorizontalRule __css={{ margin: 0 }} />
          <FormRow>
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
          </FormRow>
        </Form>
      </Layout>
    </>
  )
}
