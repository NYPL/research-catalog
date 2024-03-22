import type { TextInputRefType } from "@nypl/design-system-react-components"
import { type SyntheticEvent, type MutableRefObject, useState } from "react"

export interface DateFormHookPropsType {
  inputRefs?: MutableRefObject<TextInputRefType>[] // to focus on error and clear
  dateAfter: string
  dateBefore: string
  changeHandler: (e: SyntheticEvent) => void
}

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
