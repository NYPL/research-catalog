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
}: DateFilterPropsType) => {
  return (
    <>
      <div aria-live="polite">
        {displayDateRangeError && (
          <Notification
            data-testid="dateRangeErrorMessage"
            padding="s"
            notificationType="warning"
            notificationContent={displayDateRangeError}
            noMargin
            mb="s"
          />
        )}
      </div>
      <Fieldset
        id="date-fieldset"
        {...(!applyHandler && { legendText: "Date" })}
      >
        <Flex gap="s" alignItems={"center"}>
          <TextInput
            id="date-from"
            labelText="Start"
            name="dateAfter"
            helperText="e.g. 1901"
            value={dateAfter}
            onChange={(e) => changeHandler(e)}
            ref={inputRefs[0]}
          />
          <TextInput
            id="date-to"
            labelText="End"
            name="dateBefore"
            helperText="e.g. 2000"
            value={dateBefore}
            onChange={(e) => changeHandler(e)}
            ref={inputRefs[1]}
          />
          {applyHandler && (
            <Button
              width="90px"
              buttonType="secondary"
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
