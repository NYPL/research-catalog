import { useState, type MutableRefObject, type SyntheticEvent } from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"

export interface DateFilterHookPropsType {
  inputRefs: MutableRefObject<TextInputRefType>[]
  dateFrom: string
  dateTo: string
  changeHandler?: (e: SyntheticEvent) => void
  applyHandler?: () => void
}

export interface DateErrorState {
  from?: string
  to?: string
  range?: string
  combined?: string
}

/**
 * Hook that manages validation and error states for the DateFilter.
 *
 * Validates 'from' and 'to' dates for YYYY/MM/DD format, future values, and range errors.
 * Provides helper methods (`onChange`, `onBlur`, `onApply`, `clearInputs`) that
 * update error state and focus for use in the DateFilter.
 */

export const useDateFilter = (props: DateFilterHookPropsType) => {
  const { inputRefs, dateFrom, dateTo, changeHandler, applyHandler } = props
  const [dateError, setDateError] = useState<DateErrorState>({})

  const onBlur = () => {
    const errors = validateDates(dateFrom, dateTo)
    setDateError(errors)
  }

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const { name } = target
    changeHandler?.(e)
    setDateError((prev) => {
      const newErrors = { ...prev }
      if (name === "dateFrom") {
        newErrors.from = undefined
      } else if (name === "dateTo") {
        newErrors.to = undefined
      }
      delete newErrors.combined
      delete newErrors.range
      return newErrors
    })
  }

  const onApply = () => {
    const errors = validateDates(dateFrom, dateTo)
    setDateError(errors)

    if (errors.from || errors.range) {
      inputRefs[0]?.current?.focus()
      return errors
    }
    if (errors.to) {
      inputRefs[1]?.current?.focus()
      return errors
    }

    if (Object.keys(errors).length === 0 && applyHandler) {
      applyHandler()
    }

    return errors
  }

  const clearInputs = () => {
    inputRefs.forEach((ref) => {
      if (ref?.current) ref.current.value = ""
    })
    setDateError({})
  }

  return {
    dateFilterProps: {
      dateFrom,
      dateTo,
      dateError,
      onChange,
      onBlur,
      inputRefs,
      onApply,
    },
    clearInputs,
    validateDates,
  }
}

const dateSlashPattern =
  /^(\d{4})(?:\/(0[1-9]|1[0-2])(\/(0[1-9]|[12][0-9]|3[01]))?)?$/
const hasFormatError = (v: string) => v && !dateSlashPattern.test(v)

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

export const isFutureDate = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() > today.getTime()
}

export const rangeInvalid = (from: Date, to: Date): boolean => {
  return from.getTime() > to.getTime()
}

export const validateDates = (
  dateFrom: string,
  dateTo: string
): DateErrorState => {
  const errors: DateErrorState = {}
  const fromParsed = parseDate(dateFrom)
  const toParsed = parseDate(dateTo)

  // Slash format and real date check
  const fromInvalid = !!dateFrom && (!fromParsed || hasFormatError(dateFrom))
  const toInvalid = !!dateTo && (!toParsed || hasFormatError(dateTo))

  if (fromInvalid) errors.from = "Please enter a valid 'from' date."
  if (toInvalid) errors.to = "Please enter a valid 'to' date."

  // Future date check
  const fromFuture = fromParsed && isFutureDate(fromParsed)
  const toFuture = toParsed && isFutureDate(toParsed)

  if (fromFuture) errors.from = "'From' field cannot contain a future date."
  if (toFuture) errors.to = "'To' field cannot contain a future date."

  // Range check
  if (
    fromParsed &&
    toParsed &&
    !fromInvalid &&
    !toInvalid &&
    !fromFuture &&
    !toFuture &&
    rangeInvalid(fromParsed, toParsed)
  ) {
    errors.range = "End date must be later than start date."
  }

  // Replace with combined message if errors match
  if (errors.from && errors.to) {
    if (errors.from.includes("valid") && errors.to.includes("valid")) {
      errors.combined = "Please enter valid 'from' and 'to' dates."
    } else if (errors.from.includes("future") && errors.to.includes("future")) {
      errors.combined = "'From' and 'to' fields cannot contain a future date."
    } else {
      errors.combined = `${errors.from} ${errors.to}`
    }
  }

  return errors
}
