import Head from "next/head"
import { useState, useReducer } from "react"
import { useRouter } from "next/router"
import type { SyntheticEvent } from "react"
import type { FullDateType } from "@nypl/design-system-react-components"
import {
  Heading,
  SimpleGrid,
  Notification,
  Form,
  FormField,
  FormRow,
  Fieldset,
  Label,
  TextInput,
  DatePicker,
  Select,
  CheckboxGroup,
  Checkbox,
  HorizontalRule,
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
import styles from "../../styles/components/AdvancedSearch.module.scss"
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

  const handleDateChange = (field: string, e: FullDateType) => {
    alert && setAlert(false)
    const yearString = e.startDate?.getFullYear()?.toString()

    dispatch({
      type: "filter_change",
      field: field,
      payload: yearString || "",
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
    <div
      className={styles.advancedSearchContainer}
      style={{ paddingBottom: "var(--nypl-space-l)" }}
    >
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
        method="post"
        action={`${BASE_URL}/search`}
        onSubmit={handleSubmit}
      >
        <FormRow gap="grid.m">
          <FormField id="advancedSearchLeft">
            {textInputFields.map(({ name, label }) => {
              return (
                <TextInput
                  id={name}
                  labelText={label}
                  type="text"
                  name={name}
                  value={searchFormState[name]}
                  key={name}
                  onChange={(e) => handleInputChange(e, "input_change")}
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
          <FormField id="advancedSearchRight">
            <Label htmlFor="dates" id="dates-label">
              Date
            </Label>
            <FormRow id="dates">
              <FormField>
                <DatePicker
                  id="dateAfter"
                  nameFrom="dateAfter"
                  dateType="year"
                  labelText="From"
                  helperText="e.g. 1901"
                  initialDate={searchFormState["selectedFilters"].dateAfter}
                  onChange={(e) => handleDateChange("dateAfter", e)}
                />
              </FormField>
              <FormField>
                <DatePicker
                  id="dateBefore"
                  nameFrom="dateBefore"
                  dateType="year"
                  labelText="To"
                  helperText="e.g. 2000"
                  initialDate={searchFormState["selectedFilters"].dateBefore}
                  onChange={(e) => handleDateChange("dateBefore", e)}
                />
              </FormField>
            </FormRow>
            <CheckboxGroup
              id="formats"
              name="formats"
              labelText="Formats"
              onChange={handleCheckboxChange}
              value={searchFormState["selectedFilters"].materialType}
            >
              {materialTypeOptions.map((materialType) => {
                return (
                  <Checkbox
                    className={styles.checkbox}
                    id={materialType.value}
                    key={materialType.value}
                    labelText={materialType.label}
                    name={materialType.value}
                    value={materialType.value}
                  />
                )
              })}
            </CheckboxGroup>
          </FormField>
        </FormRow>
        <HorizontalRule />
        <div
          id="advancedSearchButtons"
          className={styles.advancedSearchButtons}
        >
          <Button id="advancedSearchSubmit" type="submit">
            Submit
          </Button>
          <Button
            type="button"
            buttonType="secondary"
            id="advancedSearchClear"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </Form>
    </div>
  )
}
