import {
  type TextInputRefType,
  Fieldset,
  TextInput,
  Notification,
} from "@nypl/design-system-react-components"
import type { SyntheticEvent, MutableRefObject, Dispatch } from "react"
import { debounce } from "underscore"

type DateFormPropsType = {
  inputRef?: MutableRefObject<TextInputRefType>
  dateAfter: string
  dateBefore: string
  debounceInterval: number
  setDateRangeError: Dispatch<React.SetStateAction<boolean>>
  changeHandler: (e: SyntheticEvent) => void
  displayDateRangeErrorNotification: boolean
}

const DateForm = ({
  inputRef,
  dateAfter,
  dateBefore,
  debounceInterval,
  changeHandler,
  // these two params, though they sound similar are not
  setDateRangeError,
  displayDateRangeErrorNotification,
}: DateFormPropsType) => {
  // const [validRange, setValidRange] = useState(true)
  const bothDatesPresent = !!dateBefore && !!dateAfter
  // if there is no input for date, it's valid. if there is, it must
  // be at least 4 digits.
  const dateAfterValid =
    !dateAfter || Math.floor(parseInt(dateAfter, 10) / 1000)
  const dateBeforeValid =
    !dateBefore || Math.floor(parseInt(dateBefore, 10) / 1000)
  // ^^
  const beforeLessThanAfter =
    bothDatesPresent && parseInt(dateBefore, 10) < parseInt(dateAfter, 10)
  const invalidRange = bothDatesPresent && beforeLessThanAfter
  setDateRangeError(invalidRange)
  return (
    <>
      {displayDateRangeErrorNotification && (
        <Notification
          notificationType="warning"
          notificationContent="Start date must be earlier than end date."
          noMargin
          mb="s"
        />
      )}
      <Fieldset
        id="date-fieldset"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        legendText="Date"
        display="grid"
        gap="s"
      >
        <TextInput
          invalidText="Please enter 4-digit year"
          isInvalid={!dateAfterValid}
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
          isInvalid={!dateBeforeValid}
          invalidText="Please enter 4-digit year"
          id="date-to"
          labelText="End"
          type="text"
          name="dateBefore"
          helperText="e.g. 2000"
          value={dateBefore}
          onChange={debounce((e) => changeHandler(e), debounceInterval)}
          // ref={inputRef}
        />
      </Fieldset>
    </>
  )
}

export default DateForm
