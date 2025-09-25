import {
  useReducer,
  useRef,
  useEffect,
  type SyntheticEvent,
  useState,
} from "react"
import { useRouter } from "next/router"
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
import {
  BASE_URL,
  DEBOUNCE_INTERVAL,
  PATHS,
  SITE_NAME,
} from "../../src/config/constants"
import { searchFormReducer } from "../../src/reducers/searchFormReducer"
import {
  initialSearchFormState,
  textInputFields,
  languageOptions,
  collectionOptions,
  buildingLocationOptions,
  formatOptions,
  buildGoBackHref,
} from "../../src/utils/advancedSearchUtils"
import type {
  SearchParams,
  SearchFormActionType,
} from "../../src/types/searchTypes"
import { getSearchQuery } from "../../src/utils/searchUtils"
import initializePatronTokenAuth from "../../src/server/auth"
import { appConfig } from "../../src/config/config"
import CancelSubmitButtonGroup from "../../src/components/AdvancedSearch/CancelSubmitButtonGroup"
import RCLink from "../../src/components/Links/RCLink/RCLink"
import RCHead from "../../src/components/Head/RCHead"
import DateFilter from "../../src/components/SearchFilters/DateFilter"
import { useDateFilter } from "../../src/hooks/useDateFilter"
import GroupedMultiSelect from "../../src/components/AdvancedSearch/GroupedMultiselect/GroupedMultiselect"
import { debounce } from "underscore"

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
  const notificationRef = useRef<HTMLDivElement>(null)

  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    defaultEmptySearchErrorMessage
  )

  const [searchFormState, dispatch] = useReducer(
    searchFormReducer,
    initialSearchFormState
  )

  const dateInputRefs = [useRef<any>(), useRef<any>()]

  const {
    dateFilterProps,
    validateDateRange,
    clearInputs: clearDateInputs,
  } = useDateFilter({
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

  const handleFilterChange = (field: string, value: string[]) => {
    setAlert(false)
    dispatch({
      type: "filter_change",
      field,
      payload: value,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!validateDateRange()) return

    const queryString = getSearchQuery(searchFormState as SearchParams)
    if (!queryString.length) {
      setErrorMessage(defaultEmptySearchErrorMessage)
      setAlert(true)
    } else {
      const url = `${PATHS.SEARCH}${queryString}&searched_from=advanced`
      if (appConfig.features.reverseProxyEnabled[appConfig.environment]) {
        window.location.replace(`${BASE_URL}${url}`)
      } else {
        await router.push(url)
      }
    }
  }

  const handleClear = (e: SyntheticEvent) => {
    e.preventDefault()
    setAlert(false)
    clearDateInputs()
    dispatch({ type: "form_reset", payload: initialSearchFormState })
  }

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
              width={{ base: "100%", md: "50%" }}
            >
              {textInputFields.map(({ name, label }) => (
                <FormField key={name}>
                  <TextInput
                    id={name}
                    labelText={label}
                    name={name}
                    value={searchFormState[name]}
                    onChange={debounce(
                      (e) => handleInputChange(e, "input_change"),
                      DEBOUNCE_INTERVAL
                    )}
                  />
                </FormField>
              ))}

              <FormField>
                <DateFilter {...dateFilterProps} />
              </FormField>
            </Flex>

            <Flex
              direction="column"
              gap={{ base: "m", md: "43px" }}
              grow="1"
              mt="m"
              width={{ base: "100%", md: "50%" }}
            >
              <MultiSelect
                id="buildingLocation"
                buttonText="Item location"
                isSearchable
                closeOnBlur
                selectedItems={{
                  buildingLocation: {
                    items: searchFormState["filters"].buildingLocation,
                  },
                }}
                items={buildingLocationOptions}
                onChange={(e) =>
                  handleFilterChange("buildingLocation", [
                    ...searchFormState["filters"].buildingLocation,
                    e.target.id,
                  ])
                }
                onClear={() => handleFilterChange("buildingLocation", [])}
              />
              <MultiSelect
                id="language"
                buttonText="Language"
                isSearchable
                closeOnBlur
                selectedItems={{
                  language: {
                    items: searchFormState["filters"].language,
                  },
                }}
                items={languageOptions}
                onChange={(e) =>
                  handleFilterChange("language", [
                    ...searchFormState["filters"].language,
                    e.target.id,
                  ])
                }
                onClear={() => handleFilterChange("language", [])}
              />
              <MultiSelect
                id="format"
                buttonText="Format"
                isSearchable
                closeOnBlur
                selectedItems={{
                  format: {
                    items: searchFormState["filters"].format,
                  },
                }}
                items={formatOptions}
                onChange={(e) =>
                  handleFilterChange("format", [
                    ...searchFormState["filters"].format,
                    e.target.id,
                  ])
                }
                onClear={() => handleFilterChange("format", [])}
              />

              <GroupedMultiSelect
                field={{ value: "collection", label: "Collection" }}
                groupedItems={collectionOptions}
                onChange={(e) =>
                  handleFilterChange("collection", [
                    ...searchFormState["filters"].collection,
                    e.target.id,
                  ])
                }
                onClear={() => handleFilterChange("collection", [])}
                selectedItems={{
                  collection: {
                    items: searchFormState["filters"].collection,
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
  return { props: { isAuthenticated, goBackHref } }
}
