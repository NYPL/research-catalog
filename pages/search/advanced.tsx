import Head from "next/head"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import type { SyntheticEvent } from "react"
import {
  Form,
  FormField,
  FormRow,
  Fieldset,
  Label,
  TextInput,
  DatePicker,
  Select,
  Heading,
  SimpleGrid,
  Checkbox,
  HorizontalRule,
  Button,
} from "@nypl/design-system-react-components"

import type { TextInputRefType } from "@nypl/design-system-react-components"

import { BASE_URL, SITE_NAME } from "../../src/config/constants"
import {
  textInputFields,
  languageOptions,
  materialTypeOptions,
} from "../../src/utils/advancedSearchUtils"
import styles from "../../styles/components/AdvancedSearch.module.scss"
import type { SearchFormEvent } from "../../src/types/searchTypes"
import { getQueryString } from "../../src/utils/searchUtils"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function AdvancedSearch() {
  const router = useRouter()

  // Input refs used for clearing values
  const textInputsRef = useRef([])
  const languageRef = useRef<HTMLSelectElement>(null)
  const dateAfterRef = useRef<TextInputRefType>(null)
  const dateBeforeRef = useRef<TextInputRefType>(null)
  const [checkboxesState, setCheckboxesState] = useState(
    new Array(materialTypeOptions.length).fill(false)
  )

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & SearchFormEvent

    // Build an array of selected material types
    const selectedMaterialTypes = materialTypeOptions
      .filter((materialTypeOption) => {
        return target[materialTypeOption.value].checked
      })
      .map((selectedMaterialTypeOption) => {
        return selectedMaterialTypeOption.value
      })

    const searchParams = {
      searchKeywords: target.q.value,
      title: target.title.value,
      contributor: target.contributor.value,
      subject: target.subject.value,
      selectedFilters: {
        language: target.language.value,
        dateBefore: target.dateBefore.value,
        dateAfter: target.dateAfter.value,
        materialType: selectedMaterialTypes,
      },
    }

    const queryString = getQueryString(searchParams)
    await router.push(`/search/?${queryString}`)
  }

  const handleCheckboxClick = (value: boolean, index: number) => {
    // clone checkboxes array to update the checked fields state at index
    const updatedCheckboxes = [...checkboxesState]
    updatedCheckboxes[index] = value
    setCheckboxesState(updatedCheckboxes)
  }

  const handleClear = () => {
    // clear text input refs
    for (let i = 0; i < textInputsRef.current.length; i++) {
      textInputsRef.current[i].value = ""
    }
    languageRef.current.value = ""
    dateAfterRef.current.value = ""
    dateBeforeRef.current.value = ""

    // clear checkbox values in state
    setCheckboxesState(new Array(materialTypeOptions.length).fill(false))
  }

  return (
    <div
      className={styles.advancedSearchContainer}
      style={{ paddingBottom: "var(--nypl-space-l)" }}
    >
      <Head>
        <title>Advanced Search | {SITE_NAME}</title>
      </Head>
      <Heading level="two">Advanced Search</Heading>
      <Form
        id="advancedSearchForm"
        className={styles.advancedSearchForm}
        method="get"
        action={`${BASE_URL}/search`}
        onSubmit={handleSubmit}
      >
        <SimpleGrid columns={2} gap="grid.m">
          <Fieldset id="advancedSearchLeft">
            {textInputFields.map(({ key, label }, index) => {
              return (
                <TextInput
                  id={key}
                  labelText={label}
                  type="text"
                  name={key}
                  value=""
                  key={key}
                  ref={(element) => {
                    textInputsRef.current[index] = element
                  }}
                />
              )
            })}
            <Select
              id="languageSelect"
              name="language"
              labelText="Language"
              aria-labelledby="languageSelect-label"
              ref={languageRef}
            >
              {languageOptions.map((language) => {
                return (
                  <option value={language.value} key={language.value}>
                    {language.label}
                  </option>
                )
              })}
            </Select>
          </Fieldset>
          <Fieldset id="advancedSearchRight">
            <Label htmlFor="dates" id="dates-label">
              Date
            </Label>
            <FormRow id="dates" className={styles.dateFields}>
              <FormField className={styles.formField}>
                <DatePicker
                  id="dateAfter"
                  nameFrom="dateAfter"
                  dateType="year"
                  labelText="From"
                  helperText="e.g. 1901"
                  initialDate=""
                  ref={dateAfterRef}
                />
              </FormField>
              <FormField className={styles.formField}>
                <DatePicker
                  id="dateBefore"
                  nameFrom="dateBefore"
                  dateType="year"
                  labelText="To"
                  helperText="e.g. 2000"
                  initialDate=""
                  ref={dateBeforeRef}
                />
              </FormField>
            </FormRow>
            <Label htmlFor="formats" id="formats-label">
              Format
            </Label>
            <Fieldset id="formats" className={styles.formatFields}>
              <FormRow>
                <FormField className={styles.formField}>
                  {materialTypeOptions
                    .slice(0, 4)
                    .map((materialType, index) => {
                      return (
                        <Checkbox
                          className={styles.checkbox}
                          id={materialType.value}
                          key={materialType.value}
                          labelText={materialType.label}
                          name={materialType.value}
                          value={materialType.value}
                          onChange={(e) => {
                            handleCheckboxClick(e.target.checked, index)
                          }}
                          isChecked={checkboxesState[index]}
                        />
                      )
                    })}
                </FormField>
                <FormField className={styles.formField}>
                  {materialTypeOptions.slice(4).map((materialType, index) => {
                    return (
                      <Checkbox
                        className={styles.checkbox}
                        id={materialType.value}
                        key={materialType.value}
                        labelText={materialType.label}
                        name={materialType.value}
                        value={materialType.value}
                        onChange={(e) => {
                          handleCheckboxClick(e.target.checked, index + 4)
                        }}
                        isChecked={checkboxesState[index + 4]}
                      />
                    )
                  })}
                </FormField>
              </FormRow>
            </Fieldset>
          </Fieldset>
        </SimpleGrid>
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
            className="clearButton"
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
