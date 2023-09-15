import Head from "next/head"
import { useRouter } from "next/router"
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

import { BASE_URL, SITE_NAME } from "../../src/config/constants"
import {
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
            <TextInput
              id="searchKeywords"
              labelText="Keywords"
              type="text"
              name="q"
            />
            <TextInput id="title" labelText="Title" type="text" name="title" />
            <TextInput
              id="contributor"
              labelText="Author"
              type="text"
              name="contributor"
            />
            <TextInput
              id="subject"
              labelText="Subject"
              type="text"
              name="subject"
            />
            <Select
              id="languageSelect"
              name="language"
              labelText="Language"
              aria-labelledby="languageSelect-label"
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
                  initialDate={null}
                />
              </FormField>
              <FormField className={styles.formField}>
                <DatePicker
                  id="dateBefore"
                  nameFrom="dateBefore"
                  dateType="year"
                  labelText="To"
                  helperText="e.g. 2000"
                  initialDate={null}
                />
              </FormField>
            </FormRow>
            <Label htmlFor="formats" id="formats-label">
              Format
            </Label>
            <Fieldset id="formats" className={styles.formatFields}>
              <FormRow>
                <FormField className={styles.formField}>
                  {materialTypeOptions.slice(0, 4).map((materialType) => {
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
                </FormField>
                <FormField className={styles.formField}>
                  {materialTypeOptions.slice(4).map((materialType) => {
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
            buttonType="secondary"
            className="clearButton"
            id="advancedSearchClear"
            type="button"
          >
            Clear
          </Button>
        </div>
      </Form>
    </div>
  )
}
