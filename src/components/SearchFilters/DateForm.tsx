import {
  Fieldset,
  TextInput,
  Notification,
} from "@nypl/design-system-react-components"
import type { DateFormHookPropsType } from "../../hooks/useDateForm"

interface DateFormPropsType extends DateFormHookPropsType {
  displayDateRangeError: string
}

const DateForm = ({
  // This prop is used to display an error notification. This is NOT the companion
  // to setDateRangeError. dateRangeError is used in hook validation to
  // determine what value is passed into setDisplayDateRangeError, because we
  // don't want to display the error until the user has attempted to submit
  // an invalid range.
  displayDateRangeError,
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
      <Fieldset
        id="date-fieldset"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        legendText="Date"
        display="grid"
        gap="s"
      >
        <TextInput
          id="date-from"
          labelText="Start"
          type="text"
          name="dateAfter"
          helperText="e.g. 1901"
          value={dateAfter}
          onChange={(e) => changeHandler(e)}
          ref={inputRefs[0]}
        />
        <TextInput
          id="date-to"
          labelText="End"
          type="text"
          name="dateBefore"
          helperText="e.g. 2000"
          value={dateBefore}
          onChange={(e) => changeHandler(e)}
          ref={inputRefs[1]}
        />
      </Fieldset>
    </>
  )
}

export default DateForm
