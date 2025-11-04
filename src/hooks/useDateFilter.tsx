import {
  useState,
  useEffect,
  useRef,
  type MutableRefObject,
  type SyntheticEvent,
} from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"

export interface DateFilterHookPropsType {
  inputRefs: MutableRefObject<TextInputRefType>[]
  dateFrom: string
  dateTo: string
  changeHandler: (e: SyntheticEvent) => void
  applyHandler?: () => void
}

export interface DateErrorState {
  from?: string
  to?: string
  both?: string
}

/**
 * useDateFilter manages date range inputs.
 * Provides format and range validation for 'from' and 'to' dates.
 * Returns error state, validateDates() function (for manual validation),
 * and clearInputs() function.
 */
export const useDateFilter = (props: DateFilterHookPropsType) => {
  const { inputRefs, dateFrom, dateTo } = props
  const [dateError, setDateError] = useState<DateErrorState>({})
  const debounceRef = useRef<number | null>(null)

  // Debounced validation
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(() => {
      let errors: DateErrorState = {}

      errors = validateDates(dateFrom, dateTo)
      setDateError(errors)
      debounceRef.current = null
    }, 600)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [dateFrom, dateTo])

  // Manual validation (Apply button)
  // const validateDates = (from = dateFrom, to = dateTo) => {
  //   const errors: DateErrorState = {}
  //   errors.from = validateField(from, "from")
  //   errors.to = validateField(to, "to")

  //   if (!errors.from && !errors.to && from && to && rangeInvalid(from, to)) {
  //     errors.range = `Error: ${rangeErrorMessage}`
  //   }

  //   setDateError(errors)
  //   return Object.values(errors).every((v) => v === undefined)
  // }

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
  }
}

const slashPattern =
  /^(\d{4})(?:\/(0[1-9]|1[0-2])(\/(0[1-9]|[12][0-9]|3[01]))?)?$/
const hasFormatError = (v: string) => v && !slashPattern.test(v)

/**
 * Parses a date string in YYYY, YYYY/MM, or YYYY/MM/DD format.
 * Returns null if the date is invalid or doesn't exist (ex. 2023/02/30).
 */
export const parseDate = (value: string): Date | null => {
  if (!value) return null
  const digits = value.replace(/[^\d]/g, "")
  if (digits.length < 4) return null

  const year = parseInt(digits.slice(0, 4), 10)
  const month = digits.length >= 6 ? parseInt(digits.slice(4, 6), 10) - 1 : 0
  const day = digits.length >= 8 ? parseInt(digits.slice(6, 8), 10) : 1

  const parsed = new Date(year, month, day)
  parsed.setHours(0, 0, 0, 0)

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month ||
    parsed.getDate() !== day
  ) {
    return null
  }

  return parsed
}

/**
 * Checks if a parsed date is in the future (today allowed).
 */
export const isFutureDate = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() > today.getTime()
}

/**
 * Checks if end date comes before start date.
 */
export const rangeInvalid = (from: Date, to: Date): boolean => {
  return from.getTime() > to.getTime()
}

/**
 * Validates two date fields at once.
 * - Checks if both are formatted correctly and real dates
 * - Checks for future dates
 * - Checks that the range is valid
 */
export const validateDates = (
  dateFrom: string,
  dateTo: string
): DateErrorState => {
  const errors: DateErrorState = {}

  const fromParsed = parseDate(dateFrom)
  const toParsed = parseDate(dateTo)

  // Format and real date check
  const fromInvalid = !!dateFrom && (!fromParsed || hasFormatError(dateFrom))
  const toInvalid = !!dateTo && (!toParsed || hasFormatError(dateTo))

  if (fromInvalid && toInvalid) {
    errors.both = "Error: Please enter valid 'from' and 'to' dates."
  } else {
    if (fromInvalid) errors.from = "Error: Please enter a valid 'from' date."
    if (toInvalid) errors.to = "Error: Please enter a valid 'to' date."
  }

  // Future date check
  const fromFuture = fromParsed && isFutureDate(fromParsed)
  const toFuture = toParsed && isFutureDate(toParsed)

  if (fromFuture && toFuture) {
    errors.both = "Error: 'From' and 'To' fields cannot contain future dates."
  } else {
    if (fromFuture)
      errors.from = "Error: 'From' field cannot contain a future date."
    if (toFuture) errors.to = "Error: 'To' field cannot contain a future date."
  }

  // Range check (only if both valid and not future)
  const bothValid =
    fromParsed &&
    toParsed &&
    !fromInvalid &&
    !toInvalid &&
    !fromFuture &&
    !toFuture

  if (bothValid && rangeInvalid(fromParsed, toParsed)) {
    errors.both = "Error: End date must be later than start date."
  }

  return errors
}
