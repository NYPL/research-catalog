import {
  Fieldset,
  TextInput,
  Flex,
  Button,
  Banner,
  HelperErrorText,
} from "@nypl/design-system-react-components"
import type {
  DateErrorState,
  DateFilterHookPropsType,
} from "../../hooks/useDateFilter"

interface DateFilterPropsType extends DateFilterHookPropsType {
  dateError: DateErrorState
  isAdvancedSearch?: boolean
}

const DateFilter = ({
  dateError,
  inputRefs,
  dateTo,
  dateFrom,
  changeHandler,
  applyHandler,
  isAdvancedSearch = false,
}: DateFilterPropsType) => {
  const hasError = Object.values(dateError).some(Boolean)
  return (
    <>
      <Fieldset
        legendText={isAdvancedSearch ? "Date" : "Filter by start and end date"}
        isLegendHidden={!isAdvancedSearch}
        id="date-fieldset"
      >
        <Flex flexDir="column" gap="xs">
          <Banner
            variant="informative"
            as="div"
            content="Enter dates in YYYY, YYYY/MM, or YYYY/MM/DD formats only"
            sx={{
              alignItems: "center",
              paddingLeft: "12px !important",
              paddingRight: "0",
              paddingTop: "xs",
              paddingBottom: "xs",
              fontSize: "desktop.caption",
              fontWeight: "medium",
            }}
          />

          <Flex alignItems="center" width="100%" gap="xs">
            <TextInput
              id="date-from"
              width="100%"
              labelText="From"
              name="dateFrom"
              helperText="Ex. 1900"
              value={dateFrom}
              onChange={(e) => changeHandler(e)}
              ref={inputRefs[0]}
              isInvalid={!!(dateError.from || dateError.range)}
              invalidText="Ex. 1900"
              maxLength={10}
              sx={{
                label: { fontSize: isAdvancedSearch ? "12px" : undefined },
              }}
            />
            <TextInput
              width="100%"
              id="date-to"
              labelText="To"
              name="dateTo"
              helperText="Ex. 1950"
              value={dateTo}
              onChange={(e) => changeHandler(e)}
              ref={inputRefs[1]}
              isInvalid={!!(dateError.to || dateError.range)}
              invalidText="Ex. 1950"
              maxLength={10}
              sx={{
                label: { fontSize: isAdvancedSearch ? "12px" : undefined },
              }}
            />
          </Flex>
          {hasError && (
            <div aria-live="polite">
              <HelperErrorText
                color="ui.error.primary"
                data-testid="dateErrorMessage"
                text={dateError.from || dateError.to || dateError.range}
              />
            </div>
          )}
          {!isAdvancedSearch && (
            <Button
              variant="secondary"
              id="apply-dates"
              onClick={applyHandler}
              width="100%"
              isDisabled={hasError}
            >
              Apply
            </Button>
          )}
        </Flex>
      </Fieldset>
    </>
  )
}

export default DateFilter
