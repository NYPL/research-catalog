import Head from "next/head"
import { useState, useReducer, useRef } from "react"
import { useRouter } from "next/router"
import { debounce } from "underscore"
import type { SyntheticEvent } from "react"
import type {
  FullDateType,
  TextInputRefType,
} from "@nypl/design-system-react-components"
import {
  Heading,
  Notification,
  Form,
  FormField,
  FormRow,
  TextInput,
  DatePicker,
  Select,
  CheckboxGroup,
  Checkbox,
  HorizontalRule,
  ButtonGroup,
  Button,
} from "@nypl/design-system-react-components"

import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, SITE_NAME } from "../../src/config/constants"
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
import { getQueryString } from "../../src/utils/searchUtils"
import FieldsetDate from "../../src/components/SearchFilters/FieldsetDate"

/**
 * The Advanced Search page is responsible for displaying the Advanced Search form fields and
 * buttons that clear the fields and submit a search request.
 */
export default function AdvancedSearch() {
  const router = useRouter()
  const inputRef = useRef<TextInputRefType>()
  const debounceInterval = 20

  const [alert, setAlert] = useState(false)

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

  const handleDateChange = (e: FullDateType) => {
    alert && setAlert(false)
    const startDateString = e.startDate?.getFullYear()?.toString()
    const endDateString = e.endDate?.getFullYear()?.toString()

    dispatch({
      type: "filter_change",
      field: "dateAfter",
      payload: startDateString || "",
    })

    dispatch({
      type: "filter_change",
      field: "dateBefore",
      payload: endDateString || "",
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
    const queryString = getQueryString(searchFormState as SearchParams)
    if (!queryString.length) {
      setAlert(true)
    } else {
      await router.push(`/search/${queryString}`)
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    inputRef.current.value = ""
    dispatch({ type: "form_reset", payload: initialSearchFormState })
  }

  const onDateChange = (dateFormName, value: string) => {
    console.log({ dateFormName, value })
  }

  return (
    <>
      <Head>
        <title>Advanced Search | {SITE_NAME}</title>
      </Head>
      <Layout activePage="advanced">
        {alert && (
          <Notification
            notificationType="warning"
            notificationContent={
              <>Please enter at least one field to submit an advanced search.</>
            }
          />
        )}
        <Heading level="h2">Advanced Search</Heading>
        <FieldsetDate
          appliedFilters={{ dateAfter: "01/01/1992", dateBefore: "01/01/2012" }}
          onDateChange={onDateChange}
        />
        <Form
          id="advancedSearchForm"
          // We are using a post request on advanced search when JS is disabled so that we can build the query
          // string correctly on the server and redirect the user to the search results.
          method="post"
          action={`${BASE_URL}/search`}
          onSubmit={handleSubmit}
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
                aria-labelledby="languageSelect-label"
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
            <FormField id="advancedSearchRight" gap="grid.s">
              <DatePicker
                dateType="year"
                helperTextFrom="e.g. 1901"
                helperTextTo="e.g. 2000"
                id="date-range"
                invalidText="Please select a valid date range."
                isDateRange
                labelText="Dates"
                nameFrom="dateAfter"
                nameTo="dateBefore"
                initialDate={searchFormState["filters"].dateAfter}
                initialDateTo={searchFormState["filters"].dateBefore}
                onChange={debounce(
                  (e) => handleDateChange(e),
                  debounceInterval
                )}
              />
              <CheckboxGroup
                id="formats"
                name="formats"
                labelText="Formats"
                onChange={handleCheckboxChange}
                value={searchFormState["filters"].materialType}
                __css={{
                  "> div": {
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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
          <HorizontalRule __css={{ margin: 0 }} />
          <ButtonGroup
            id="advancedSearchButtons"
            buttonWidth="default"
            __css={{
              gap: "xs",
              marginLeft: "auto",
            }}
          >
            <Button id="advancedSearchSubmit" type="submit" size="large">
              Submit
            </Button>
            <Button
              type="button"
              id="advancedSearchClear"
              buttonType="secondary"
              onClick={handleClear}
              size="large"
            >
              Clear
            </Button>
          </ButtonGroup>
        </Form>
      </Layout>
    </>
  )
}
