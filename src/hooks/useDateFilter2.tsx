import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  type SyntheticEvent,
  type MutableRefObject,
  useState,
  useEffect,
} from "react"

export interface DateFilterHookPropsType2 {
  inputRefs: MutableRefObject<TextInputRefType>[]
  dateFrom: string
  dateTo: string
  changeHandler: (e: SyntheticEvent) => void
  applyHandler?: () => void
}

export interface DateErrorState {
  from?: string
  to?: string
  range?: string
}

export const useDateFilter = (props: DateFilterHookPropsType2) => {
  const { inputRefs, dateFrom, dateTo } = props
  const [dateError, setDateError] = useState<DateErrorState>({})

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
    const errors: DateErrorState = {}

    if (formatInvalid(dateFrom)) {
      errors.from = "Please enter a valid 'from' date."
      inputRefs[0]?.current?.focus()
    }

    if (formatInvalid(dateTo)) {
      errors.to = "Please enter a valid 'to' date."
      inputRefs[1]?.current?.focus()
    }

    if (!errors.from && !errors.to && rangeInvalid(dateFrom, dateTo)) {
      errors.range = "End date must be later than start date."
    }

    setDateError(errors)
    return Object.keys(errors).length === 0
  }
  const clearInputs = () => {
    inputRefs.forEach((ref) => {
      if (ref?.current) ref.current.value = ""
    })
    setDateError({})
  }

  return {
    dateFilterProps: {
      ...props,
      dateError,
    },
    validateDates,
    clearInputs,
    formatDateInput,
  }
}

export const rangeInvalid = (dateFrom: string, dateTo: string) => {
  if (!dateFrom || !dateTo) return false

  const parseDate = (date: string) => {
    const digits = date.replace(/[^\d]/g, "")
    const year = parseInt(digits.slice(0, 4), 10)
    const month = digits.length >= 6 ? parseInt(digits.slice(4, 6), 10) - 1 : 0
    const day = digits.length === 8 ? parseInt(digits.slice(6, 8), 10) : 1
    return new Date(year, month, day)
  }
  return parseDate(dateFrom) > parseDate(dateTo)
}

export const formatInvalid = (date: string) => {
  if (!date) return false
  const pattern =
    /^(\d{4})(?:[\\/]?(0[1-9]|1[0-2]))?(?:[\\/]?(0[1-9]|[12][0-9]|3[01]))?$/
  return !pattern.test(date)
}

export const formatDateInput = (value: string) => {
  const digits = value.replace(/[^\d]/g, "")
  if (digits.length <= 4) return digits
  if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4)}`
  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6, 8)}`
}
