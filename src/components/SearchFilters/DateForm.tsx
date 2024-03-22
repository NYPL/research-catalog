import {
  Fieldset,
  TextInput,
  Notification,
} from "@nypl/design-system-react-components"
import { type Dispatch } from "react"
import { debounce } from "underscore"
import type { DateFormHookPropsType } from "../../hooks/useDateForm"

interface DateFormPropsType extends DateFormHookPropsType {
  setDateRangeError: Dispatch<React.SetStateAction<string>>
  setDisplayDateRangeError: Dispatch<React.SetStateAction<boolean>>
  displayDateRangeError: boolean
}

const DateForm = ({
  setDateRangeError,
  displayDateRangeError,
  inputRefs,
  dateAfter,
  dateBefore,
  debounceInterval,
  changeHandler,
}: DateFormPropsType) => {
  console.log("render")
  const bothDatesPresent = !!dateBefore && !!dateAfter
  // if there is no input for date, it's valid. if there is, it must
  // be at least 4 digits.
  const isDateFourDigits = (date: string) => {
    const dividedBy1000 = Math.floor(parseInt(date, 10) / 1000)
    return dividedBy1000 > 0 && dividedBy1000 < 1
  }
  const dateAfterValid = !dateAfter || isDateFourDigits(dateAfter)
  const dateBeforeValid = !dateBefore || isDateFourDigits
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
          ref={inputRefs[0]}
        />
        <TextInput
          id="date-to"
          labelText="End"
          type="text"
          name="dateBefore"
          helperText="e.g. 2000"
          value={dateBefore}
          onChange={debounce((e) => changeHandler(e), debounceInterval)}
          ref={inputRefs[1]}
        />
      </Fieldset>
    </>
  )
}

export default DateForm
