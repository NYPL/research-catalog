import {
  Box,
  Fieldset,
  TextInput,
  Notification,
  Flex,
} from "@nypl/design-system-react-components"
import type { DateFormHookPropsType } from "../../hooks/useDateForm"

interface DateFormPropsType extends DateFormHookPropsType {
  displayDateRangeError: string
}

const DateForm = ({
  // This prop is used to display an error notification. It is
  // an empty string by default. The validateDateRange method (returned
  // from the useDateForm hook) is called in a parent component's
  // onSubmit. If there is an error, this value is updated to an error
  // message.
  displayDateRangeError,
  // Used to focus on inputs in an error state and clear inputs
  inputRefs,
  dateAfter,
  dateBefore,
  changeHandler,
}: DateFormPropsType) => {
  return (
    <>
      <div aria-live="polite">
        {displayDateRangeError && (
          <Notification
            data-testid="dateRangeErrorMessage"
            notificationType="warning"
            notificationContent={displayDateRangeError}
            noMargin
            mb="s"
          />
        )}
      </div>
      <Fieldset id="date-fieldset" legendText="Date">
        <Flex gap="s">
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
        </Flex>
      </Fieldset>
    </>
  )
}

export default DateForm
