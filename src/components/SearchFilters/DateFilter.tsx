import {
  Fieldset,
  TextInput,
  Notification,
  Flex,
  Button,
} from "@nypl/design-system-react-components"
import type { DateFilterHookPropsType } from "../../hooks/useDateFilter"

interface DateFilterPropsType extends DateFilterHookPropsType {
  displayDateRangeError: string
  isAdvancedSearch?: boolean
}

const DateFilter = ({
  /**
   * This prop is used to display an error notification. It is
   * an empty string by default. The validateDateRange method (returned
   * from the useDateFilter hook) should be called in the parent component's
   * onSubmit or in the applyHandler. If there is an error, this value is updated
   * to an error message.
   * */
  displayDateRangeError,
  // Used to focus on inputs in an error state and clear inputs
  inputRefs,
  dateAfter,
  dateBefore,
  changeHandler,
  /**
   * In the sidebar filters, the DateFilter has its own submit button.
   * In advanced search, the DateFilter uses the parent form's onSubmit.
   * */
  applyHandler,
  isAdvancedSearch = false,
}: DateFilterPropsType) => {
  return (
    <>
      <div aria-live="polite">
        {displayDateRangeError && (
          <Notification
            data-testid="dateRangeErrorMessage"
            padding="s"
            variant="warning"
            notificationContent={displayDateRangeError}
            mb="s"
          />
        )}
      </div>
      <Fieldset id="date-fieldset" mt={isAdvancedSearch && "-l"}>
        <Flex
          gap={isAdvancedSearch ? "m" : "s"}
          alignItems="center"
          width="100%"
        >
          <TextInput
            id="date-from"
            width="100%"
            labelText={isAdvancedSearch ? "Start date" : "Start"}
            name="dateAfter"
            helperText={isAdvancedSearch ? undefined : "ex. 1901"}
            placeholder={isAdvancedSearch ? "Example: 1901" : undefined}
            value={dateAfter}
            onChange={(e) => changeHandler(e)}
            ref={inputRefs[0]}
          />
          <TextInput
            width="100%"
            id="date-to"
            labelText={isAdvancedSearch ? "End date" : "End"}
            name="dateBefore"
            helperText={isAdvancedSearch ? undefined : "ex. 2000"}
            placeholder={isAdvancedSearch ? "Example: 2000" : undefined}
            value={dateBefore}
            onChange={(e) => changeHandler(e)}
            ref={inputRefs[1]}
          />
          {applyHandler && (
            <Button
              width="90px"
              variant="secondary"
              id="apply-dates"
              onClick={applyHandler}
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
