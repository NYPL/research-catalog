import type { TextInputRefType } from "@nypl/design-system-react-components"
import { type SyntheticEvent, type MutableRefObject, useState } from "react"

export interface DateFormHookPropsType {
  inputRefs?: MutableRefObject<TextInputRefType>[] // to focus on error and clear
  dateAfter: string
  dateBefore: string
  changeHandler: (e: SyntheticEvent) => void
}

/**
 *
 * This hook encapsulates logic behind error states in the DateForm
 * Given DateForm props, the useDateForm hook returns:
 * 1. a validation method for the parent component to run on submit. The
 * validation method checks for an error state, displays the error notification,
 * and focuses on the first date input. It returns a boolean
 * indicating whether the validation passed. If false, the onSubmit should return
 * immediately.
 * 2. props to pass into the DateForm component. Including original props, plus
 * methods and values used within the DateForm component to manage error state
 * and display an error message
 *
 */

export const useDateForm = (dateFormProps: DateFormHookPropsType) => {
  if (dateFormProps.inputRefs.length !== 2) {
    console.warn(
      "useDateForm hook requires inputRefs to contain two refs. Unexpected behavior may ensue."
    )
  }
  const { dateBefore, dateAfter } = dateFormProps
  const [displayDateRangeError, setDisplayDateRangeError] = useState("")

  const invalidYearFormat = rangeContainsInvalidYearFormat(
    dateAfter,
    dateBefore
  )
  const invalidRange = endDateInvalid(dateAfter, dateBefore)

  const invalid = invalidRange || invalidYearFormat
  const invalidReason = invalidRange
    ? "Error: Start date must be earlier than end date."
    : "Error: Years must be 4 digits"
  const dateRangeError = invalid ? invalidReason : ""

  const dateFormWithHookProps = {
    ...dateFormProps,
    displayDateRangeError,
  }

  const validateDateRange = () => {
    // dateRangeError is either an empty string or an error message. If error message is present, we want to
    // focus on the first dateForm input...
    if (dateRangeError) {
      dateFormProps.inputRefs[0].current.focus()
    }
    // ...update the display value to include updated date ranger error
    setDisplayDateRangeError(dateRangeError)
    // boolean indicating whether dateRange passed validation, for use in parent onSubmit.
    return !dateRangeError
  }

  const clearInputs = () => {
    dateFormProps.inputRefs.forEach((ref) => (ref.current.value = ""))
  }

  return {
    dateFormProps: dateFormWithHookProps,
    validateDateRange,
    clearInputs,
  }
}

export const endDateInvalid = (dateAfter: string, dateBefore: string) => {
  const bothDatesPresent = !!dateBefore && !!dateAfter
  const beforeLessThanAfter =
    bothDatesPresent && parseInt(dateBefore, 10) < parseInt(dateAfter, 10)
  return bothDatesPresent && beforeLessThanAfter
}

export const rangeContainsInvalidYearFormat = (
  dateAfter: string,
  dateBefore: string
) => {
  // if there is no input for date, it's valid. if there is, it must
  // be at least 4 digits.
  const isDateFourDigits = (date: string) => {
    const dividedBy1000 = Math.floor(parseInt(date, 10) / 1000)
    return dividedBy1000 > 0 && dividedBy1000 <= 2
  }
  const dateAfterValid = !dateAfter || isDateFourDigits(dateAfter)
  const dateBeforeValid = !dateBefore || isDateFourDigits(dateBefore)
  return !dateAfterValid || !dateBeforeValid
}
