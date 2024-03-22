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
 * and focuses on the first date input.
 * 2. props to pass into the DateForm component. Including original props, plus
 * methods and values used within the DateForm component to manage error state
 * and display an error message
 *
 */

export const useDateForm = (dateFormProps: DateFormHookPropsType) => {
  const [dateRangeError, setDateRangeError] = useState("")
  const [displayDateRangeError, setDisplayDateRangeError] = useState(false)

  const dateFormWithHookProps = {
    ...dateFormProps,
    setDisplayDateRangeError,
    setDateRangeError,
    displayDateRangeError,
  }

  const validateDateRange = () => {
    if (dateRangeError) {
      setDisplayDateRangeError(true)
      dateFormProps.inputRefs[0].current.focus()
      return false
    }
    setDisplayDateRangeError(false)
    return true
  }

  return {
    dateFormProps: dateFormWithHookProps,
    validateDateRange,
  }
}
