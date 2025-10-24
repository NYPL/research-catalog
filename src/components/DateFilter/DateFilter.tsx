import {
  Fieldset,
  TextInput,
  Flex,
  Button,
  Notification,
} from "@nypl/design-system-react-components"
import type { DateFilterHookPropsType } from "../../hooks/useDateFilter2"

interface DateFilterPropsType extends DateFilterHookPropsType {
  dateError: string
}

const DateFilter = ({
  dateError,
  inputRefs,
  dateTo,
  dateFrom,
  changeHandler,
  applyHandler,
}: DateFilterPropsType) => {
  return (
    <>
      <Fieldset
        legendText="Filter by start and end date"
        isLegendHidden={true}
        id="date-fieldset"
      >
        <Flex flexDir="column" gap="xs">
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
            />
          </Flex>
          {dateError && (
            <div aria-live="polite">
              <Notification
                data-testid="dateErrorMessage"
                padding="s"
                variant="warning"
                notificationContent={dateError}
                mb="s"
              />
            </div>
          )}
          <Button
            variant="secondary"
            id="apply-dates"
            onClick={applyHandler}
            width="100%"
            isDisabled={dateError !== ""}
          >
            Apply
          </Button>
        </Flex>
      </Fieldset>
    </>
  )
}

export default DateFilter
