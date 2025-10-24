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
  DateFilterHookPropsType2,
} from "../../hooks/useDateFilter2"

interface DateFilterPropsType extends DateFilterHookPropsType2 {
  dateError: DateErrorState
}

const DateFilter = ({
  dateError,
  inputRefs,
  dateTo,
  dateFrom,
  changeHandler,
  applyHandler,
}: DateFilterPropsType) => {
  const hasError = Object.values(dateError).some(Boolean)
  return (
    <>
      <Fieldset
        legendText="Filter by start and end date"
        isLegendHidden={true}
        id="date-fieldset"
      >
        <Flex flexDir="column" gap="xs">
          <Banner
            variant="informative"
            content="Enter dates in YYYY, YYYY/MM, or YYYY/MM/DD formats only"
            sx={{
              alignItems: "center",
              paddingLeft: "s !important",
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
              name="dateAfter"
              helperText="Ex. 1900"
              value={dateFrom}
              onChange={(e) => changeHandler(e)}
              ref={inputRefs[0]}
              isInvalid={!!dateError.from}
              invalidText="Ex. 1900"
              maxLength={10}
            />
            <TextInput
              width="100%"
              id="date-to"
              labelText="To"
              name="dateBefore"
              helperText="Ex. 1950"
              value={dateTo}
              onChange={(e) => changeHandler(e)}
              ref={inputRefs[1]}
              isInvalid={!!dateError.to}
              invalidText="Ex. 1950"
              maxLength={10}
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
          <Button
            variant="secondary"
            id="apply-dates"
            onClick={applyHandler}
            width="100%"
            isDisabled={hasError}
          >
            Apply
          </Button>
        </Flex>
      </Fieldset>
    </>
  )
}

export default DateFilter
