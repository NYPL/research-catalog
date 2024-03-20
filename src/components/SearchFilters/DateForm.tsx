import {
  type TextInputRefType,
  Fieldset,
  TextInput,
  Notification,
} from "@nypl/design-system-react-components"
import {
  type SyntheticEvent,
  type MutableRefObject,
  type Dispatch,
  useState,
} from "react"
import { debounce } from "underscore"

interface DateFormHookPropsType {
  inputRef?: MutableRefObject<TextInputRefType> // to focus on error
  dateAfter: string
  dateBefore: string
  debounceInterval: number
  changeHandler: (e: SyntheticEvent) => void
}

export const useDateForm = (dateFormProps: DateFormHookPropsType) => {
  const [dateRangeError, setDateRangeError] = useState("")
  const [displayDateRangeError, setDisplayDateRangeError] = useState(false)
  const DateFormWithProps = (
    <DateForm
      {...dateFormProps}
      setDisplayDateRangeError={setDisplayDateRangeError}
      setDateRangeError={setDateRangeError}
      displayDateRangeError={displayDateRangeError}
    />
  )

  const validateDateRange = () => {
    if (dateRangeError) {
      setDisplayDateRangeError(true)
      dateFormProps.inputRef.current.focus()
      return false
    }
    setDisplayDateRangeError(false)
    return true
  }

  return {
    DateFormWithProps,
    validateDateRange,
  }
}

interface DateFormPropsType extends DateFormHookPropsType {
  setDateRangeError: Dispatch<React.SetStateAction<string>>
  setDisplayDateRangeError: Dispatch<React.SetStateAction<boolean>>
  displayDateRangeError: boolean
}

const DateForm = ({
  setDateRangeError,
  displayDateRangeError,
  inputRef,
  dateAfter,
  dateBefore,
  debounceInterval,
  changeHandler,
}: DateFormPropsType) => {
  const bothDatesPresent = !!dateBefore && !!dateAfter
  // if there is no input for date, it's valid. if there is, it must
  // be at least 4 digits.
  const dateAfterValid =
    !dateAfter || Math.floor(parseInt(dateAfter, 10) / 1000)
  const dateBeforeValid =
    !dateBefore || Math.floor(parseInt(dateBefore, 10) / 1000)
  // ^^
  const invalidYearFormat = !dateAfterValid || !dateBeforeValid
  const beforeLessThanAfter =
    bothDatesPresent && parseInt(dateBefore, 10) < parseInt(dateAfter, 10)
  const invalidRange = bothDatesPresent && beforeLessThanAfter
  const invalid = invalidRange || invalidYearFormat
  const invalidReason = invalidRange
    ? "Error: Start date must be earlier than end date."
    : "Error: Years must be 4 digits"

  setDateRangeError(invalid ? invalidReason : "")
  return (
    <>
      <div aria-live="polite">
        {displayDateRangeError && (
          <Notification
            notificationType="warning"
            notificationContent={invalidReason}
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
          onChange={debounce((e) => changeHandler(e), debounceInterval)}
          ref={inputRef}
        />
        <TextInput
          id="date-to"
          labelText="End"
          type="text"
          name="dateBefore"
          helperText="e.g. 2000"
          value={dateBefore}
          onChange={debounce((e) => changeHandler(e), debounceInterval)}
          ref={inputRef}
        />
      </Fieldset>
    </>
  )
}

export default DateForm
