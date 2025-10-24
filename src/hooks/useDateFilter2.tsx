import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  type SyntheticEvent,
  type MutableRefObject,
  useState,
  useEffect,
} from "react"

export interface DateFilterHookPropsType {
  inputRefs: MutableRefObject<TextInputRefType>[]
  dateFrom: string
  dateTo: string
  changeHandler: (e: SyntheticEvent) => void
  applyHandler?: () => void
}

export const useDateFilter = (props: DateFilterHookPropsType) => {
  const { inputRefs, dateFrom, dateTo } = props
  const [dateError, setDateError] = useState("")

  if (inputRefs.length !== 2) {
    console.warn(
      "useDateFilter hook requires inputRefs to contain two refs. Unexpected behavior may ensue."
    )
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      validateDates()
    }, 300)
    return () => clearTimeout(timeout)
  }, [dateFrom, dateTo])

  const validateDates = () => {
    let errorMessage = ""

    const formatErrorFrom = formatInvalid(dateFrom)
    const formatErrorTo = formatInvalid(dateTo)
    const rangeError = rangeInvalid(dateFrom, dateTo)

    if (formatErrorFrom) {
      errorMessage = "Please enter a valid 'from' date."
      inputRefs[0]?.current?.focus()
    } else if (formatErrorTo) {
      errorMessage = "Please enter a valid 'to' date."
      inputRefs[1]?.current?.focus()
    } else if (rangeError) {
      errorMessage = "End date must be later than start date."
      inputRefs[1]?.current?.focus()
    }
    setDateError(errorMessage)
    return !errorMessage
  }

  const clearInputs = () => {
    inputRefs.forEach((ref) => {
      if (ref?.current) ref.current.value = ""
    })
    setDateError("")
  }

  return {
    dateFilterProps: {
      ...props,
      dateError,
    },
    validateDates,
    clearInputs,
  }
}

export const rangeInvalid = (dateFrom: string, dateTo: string) => {
  if (!dateFrom || !dateTo) return false
  return parseInt(dateFrom, 10) > parseInt(dateTo, 10)
}

export const formatInvalid = (date: string) => {
  if (!date) return false
  const pattern = /^\d{4}(?:\/(0[1-9]|1[0-2])(?:\/(0[1-9]|[12][0-9]|3[01]))?)?$/
  return !pattern.test(date)
}
