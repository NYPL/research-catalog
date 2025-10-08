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
import type { TextInputRefType } from "@nypl/design-system-react-components"
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
import { debounce } from "underscore"
import MultiSelectWithGroupTitles from "../../src/components/AdvancedSearch/MultiSelectWithGroupTitles/MultiSelectWithGroupTitles"

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
  const dateInputRefs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]
  const liveRegionRef = useRef<HTMLDivElement | null>(null)
  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    defaultEmptySearchErrorMessage
  )

  const [searchFormState, dispatch] = useReducer(
    searchFormReducer,
    initialSearchFormState
  )

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
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = ""
    }
    const target = e.target as HTMLInputElement
    dispatch({
      type: type,
      field: target.name,
      payload: target.value,
    })
  }

  const handleFilterChange = (field: string, value: string | null) => {
    setAlert(false)
    if (value === null) {
      dispatch({
        type: "filter_change",
        field,
        payload: [],
      })
      return
    }

    const currentValues = searchFormState["filters"][field] || []
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    dispatch({
      type: "filter_change",
      field,
      payload: updatedValues,
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

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "All fields have been cleared."
    }
  }

  useEffect(() => {
    if (alert && notificationRef.current) {
      notificationRef.current.focus()
    }
  }, [alert])

  const fields = [
    { value: "format", label: "Format", options: formatOptions },
    {
      value: "buildingLocation",
      label: "Item location",
      options: buildingLocationOptions,
    },
    { value: "language", label: "Language", options: languageOptions },
    { value: "collection", label: "Collection", options: collectionOptions },
  ]

  const multiselects = fields.map((field) => {
    return field.value !== "collection" ? (
      <div key={field.value}>
        <MultiSelect
          sx={{
            "div > div > button": {
              height: "40px",
            },
            mb: "25.5px",
          }}
          id={field.value}
          isSearchable
          closeOnBlur
          buttonText={field.label}
          selectedItems={{
            [field.value]: {
              items: searchFormState["filters"][field.value],
            },
          }}
          items={field.options}
          onChange={(e) => handleFilterChange(field.value, e.target.id)}
          onClear={() => handleFilterChange(field.value, null)}
        />
      </div>
    ) : (
      <MultiSelectWithGroupTitles
        key={field.value}
        field={{ value: field.value, label: field.label }}
        groupedItems={field.options}
        onChange={(e) => handleFilterChange(field.value, e.target.id)}
        onClear={() => handleFilterChange(field.value, null)}
        selectedItems={{
          [field.value]: {
            items: searchFormState["filters"][field.value],
          },
        }}
      />
    )
  })
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="advanced">
        {/* Always render the wrapper element that will display the
          dynamically rendered notification for focus management */}
        <Box tabIndex={-1} ref={notificationRef}>
          {alert && <Banner variant="negative" content={errorMessage} mb="s" />}
        </Box>
        <div
          ref={liveRegionRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            margin: "-1px",
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            border: 0,
          }}
        ></div>
        <Heading level="h2" mb="s">
          Advanced search
        </Heading>
        <Form
          id="advancedSearchForm"
          // We are using a post request on advanced search when JS is disabled
          // so that we can build the query string correctly on the server and
          // redirect the user to the search results.
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
                <DateFilter isAdvancedSearch {...dateFilterProps} />
              </FormField>
            </Flex>
            <Flex
              direction="column"
              gap="s"
              grow="1"
              mt="25px"
              width={{ base: "100%", md: "50%" }}
            >
              {multiselects}
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
