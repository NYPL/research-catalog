import {
  TextInput,
  //Notification,
  Flex,
  Button,
} from "@nypl/design-system-react-components"
//import type { DateFormHookPropsType } from "../../hooks/useDateForm"

// interface DateFormPropsType extends DateFormHookPropsType {
//   displayDateRangeError: string
// }

const DatePrototype = ({
  inputRefs,
  dateAfter,
  dateBefore,
  changeHandler,
  applyHandler,
}) => {
  return (
    <>
      {/* <div aria-live="polite">
        {displayDateRangeError && (
          <Notification
            data-testid="dateRangeErrorMessage"
            notificationType="warning"
            notificationContent={displayDateRangeError}
            noMargin
            mb="s"
          />
        )}
      </div> */}
      <Flex gap="s" alignItems="center">
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
        <Button
          width="90px"
          buttonType="secondary"
          id="apply-dates"
          onClick={applyHandler}
        >
          Apply
        </Button>
      </Flex>
    </>
  )
}

export default DatePrototype
