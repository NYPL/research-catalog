import Head from "next/head"
import {
  Form,
  FormField,
  FormRow,
  Fieldset,
  Label,
  TextInput,
  Select,
  Heading,
  SimpleGrid,
} from "@nypl/design-system-react-components"

import { BASE_URL, SITE_NAME } from "../../src/config/constants"
import { languageOptions } from "../../src/utils/advancedSearchUtils"
import styles from "../../styles/components/AdvancedSearch.module.scss"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function AdvancedSearch() {
  return (
    <div
      className={styles.advancedSearchContainer}
      style={{ paddingBottom: "var(--nypl-space-l)" }}
    >
      <Head>
        <title>Advanced Search | {SITE_NAME}</title>
      </Head>
      <Heading level="two">Advanced Search</Heading>
      <Form id="advancedSearchForm" method="post" action={`${BASE_URL}/search`}>
        <SimpleGrid columns={2} gap="grid.m">
          <Fieldset id="advancedSearchLeft">
            <TextInput
              id="searchKeywords"
              labelText="Keyword"
              type="text"
              name="searchKeywords"
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
              <FormField className={styles.dateField}>
                <TextInput
                  id="dateAfter"
                  labelText="From"
                  type="text"
                  name="dateAfter"
                />
                <p>E.g. 1901</p>
              </FormField>
              <FormField className={styles.dateField}>
                <TextInput
                  id="dateBefore"
                  labelText="To"
                  type="text"
                  name="dateBefore"
                />
                <p>E.g. 2000</p>
              </FormField>
            </FormRow>
          </Fieldset>
        </SimpleGrid>
      </Form>
    </div>
  )
}
