import { useState, useRef, useEffect, type SyntheticEvent } from "react"
import { useRouter } from "next/router"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  Heading,
  Form,
  FormField,
  Flex,
  TextInput,
  HorizontalRule,
  Box,
  Banner,
  Icon,
  MultiSelect,
} from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import { BASE_URL, PATHS, SITE_NAME } from "../../src/config/constants"
import {
  initialSearchFormState,
  textInputFields,
  languageOptions,
  buildGoBackHref,
  collectionOptions,
  buildingLocationOptions,
  formatOptions,
} from "../../src/utils/advancedSearchUtils"
import type { SearchParams } from "../../src/types/searchTypes"
import { getSearchQuery } from "../../src/utils/searchUtils"
import initializePatronTokenAuth from "../../src/server/auth"
import { appConfig } from "../../src/config/config"
import CancelSubmitButtonGroup from "../../src/components/AdvancedSearch/CancelSubmitButtonGroup"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import RCHead from "../../src/components/Head/RCHead"
import { useDateFilter } from "../../src/hooks/useDateFilter"
import DateFilter from "../../src/components/SearchFilters/DateFilter"
import GroupedMultiSelect from "../../src/components/AdvancedSearch/GroupedMultiselect/GroupedMultiselect"

export const defaultEmptySearchErrorMessage =
  "Error: please enter at least one field to submit an advanced search."

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
  const inputRef = useRef<TextInputRefType>()
  const notificationRef = useRef<HTMLDivElement>()
  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]

  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    defaultEmptySearchErrorMessage
  )
  const [searchFormState, setSearchFormState] = useState(initialSearchFormState)

  const {
    dateFilterProps,
    validateDateRange,
    clearInputs: clearDateInputs,
  } = useDateFilter({
    inputRefs: dateInputRefs,
    dateBefore: searchFormState.filters.dateBefore,
    dateAfter: searchFormState.filters.dateAfter,
    changeHandler: (e) => handleInputChange(e),
  })

  const handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    alert && setAlert(false)
    setSearchFormState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleFilterClear = (field: string) => {
    const newFilters = {
      ...searchFormState,
      filters: {
        ...searchFormState.filters,
        [field]: [],
      },
    }
    setSearchFormState(newFilters)
  }

  const handleCheckboxChange = (field: string, optionValue: string) => {
    const currentValues = searchFormState["filters"][field] || []
    const isAlreadySelected = currentValues.includes(optionValue)
    const updatedValues = isAlreadySelected
      ? currentValues.filter((val) => val !== optionValue)
      : [...currentValues, optionValue]
    const newFilters = {
      ...searchFormState,
      filters: {
        ...searchFormState.filters,
        [field]: updatedValues,
      },
    }
    setSearchFormState(newFilters)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!validateDateRange()) return
    const queryString = getSearchQuery(searchFormState as SearchParams)
    if (!queryString.length) {
      setErrorMessage(defaultEmptySearchErrorMessage)
      setAlert(true)
    } else {
      if (appConfig.features.reverseProxyEnabled[appConfig.environment]) {
        window.location.replace(
          `${BASE_URL}${PATHS.SEARCH}${queryString}&searched_from=advanced`
        )
      } else {
        await router.push(
          `${PATHS.SEARCH}${queryString}&searched_from=advanced`
        )
      }
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    alert && setAlert(false)
    clearDateInputs()
    if (inputRef.current) inputRef.current.value = ""
    setSearchFormState(initialSearchFormState)
  }

  const fields = [
    { value: "format", label: "Format", options: formatOptions },
    {
      value: "buildingLocation",
      label: "Item location",
      options: buildingLocationOptions,
    },
    { value: "language", label: "Language", options: languageOptions },
  ]
  const filters = fields.map((field) => {
    if (searchFormState["filters"][field.value]) {
      return (
        <div key={field.value}>
          <MultiSelect
            defaultItemsVisible={1}
            isSearchable
            closeOnBlur
            id={field.value}
            buttonText={field.label}
            onClear={() => {
              handleFilterClear(field.value)
            }}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxChange(field.value, e.target.id)
            }}
            selectedItems={{
              [field.value]: {
                items: searchFormState["filters"][field.value] || [],
              },
            }}
            items={field.options}
          />
        </div>
      )
    } else return null
  })

  useEffect(() => {
    if (alert && notificationRef.current) {
      notificationRef.current.focus()
    }
  }, [alert])

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="advanced">
        <Box tabIndex={-1} ref={notificationRef}>
          {alert && <Banner variant="negative" content={errorMessage} mb="s" />}
        </Box>
        <Heading level="h2" mb="s">
          Advanced search
        </Heading>
        <Form
          id="advancedSearchForm"
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
              width="50%"
            >
              {textInputFields.map(({ name, label }) => (
                <FormField key={name}>
                  <TextInput
                    id={name}
                    labelText={label}
                    name={name}
                    value={searchFormState[name]}
                    onChange={handleInputChange}
                    ref={inputRef}
                  />
                </FormField>
              ))}
              <FormField>
                <DateFilter {...dateFilterProps} />
              </FormField>
            </Flex>
            <Flex direction="column" gap="l" grow="1" mt="m" width="50%">
              {filters}
              <GroupedMultiSelect
                field={{ value: "collection", label: "Collection" }}
                groupedItems={collectionOptions}
                onChange={(e) =>
                  handleCheckboxChange("collection", e.target.id)
                }
                onClear={() => {
                  handleFilterClear("collection")
                }}
                selectedItems={{
                  collection: {
                    items: [...searchFormState.filters.collection],
                  },
                }}
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
