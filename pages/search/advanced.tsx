import Head from "next/head"
import { useState, useReducer } from "react"
import { useRouter } from "next/router"
import { debounce } from "underscore"
import type { SyntheticEvent } from "react"
import type { FullDateType } from "@nypl/design-system-react-components"
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

/**
 * The Advanced Search page is responsible for displaying the Advanced Search form fields and
 * buttons that clear the fields and submit a search request.
 */
export default function AdvancedSearch() {
  const router = useRouter()
  const debounceInterval = 500

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
      await router.push(`/search/?${queryString}`)
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch({ type: "form_reset", payload: initialSearchFormState })
  }

  return (
    <>
      <Head>
        <title>Advanced Search | {SITE_NAME}</title>
      </Head>
      {alert && (
        <Notification
          notificationType="warning"
          notificationContent={
            <>Please enter at least one field to submit an advanced search.</>
          }
        />
      )}
      <Heading level="two">Advanced Search</Heading>
      <Form
        id="advancedSearchForm"
        method="get"
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
                />
              )
            })}
            <Select
              id="languageSelect"
              name="language"
              labelText="Language"
              aria-labelledby="languageSelect-label"
              value={searchFormState["selectedFilters"].language}
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
              initialDate={searchFormState["selectedFilters"].dateAfter}
              initialDateTo={searchFormState["selectedFilters"].dateBefore}
              onChange={debounce((e) => handleDateChange(e), debounceInterval)}
            />
            <CheckboxGroup
              id="formats"
              name="formats"
              labelText="Formats"
              onChange={handleCheckboxChange}
              value={searchFormState["selectedFilters"].materialType}
              sx={{
                "> div": {
                  display: "grid",
                  "grid-template-columns": "repeat(2, minmax(0, 1fr))",
                  "grid-gap": "var(--nypl-space-s)",
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
        <HorizontalRule sx={{ margin: 0 }} />
        <ButtonGroup
          id="advancedSearchButtons"
          buttonWidth="default"
          sx={{
            gap: "var(--nypl-space-xs)",
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
    </>
  )
}
