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
  both?: string
}

export const useDateFilter = (props: DateFilterHookPropsType) => {
  const { inputRefs, dateFrom, dateTo, changeHandler, applyHandler } = props
  const [dateError, setDateError] = useState<DateErrorState>({})

  const onBlur = () => {
    const errors = validateDates(dateFrom, dateTo)
    setDateError(errors)
  }

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const { name, value } = target

    changeHandler?.(e)

    const errors = validateDates(
      name === "dateFrom" ? value : dateFrom,
      name === "dateTo" ? value : dateTo
    )

    setDateError((prev) => {
      const newErrors: DateErrorState = { ...prev }

      if (name === "dateFrom") newErrors.from = undefined
      if (name === "dateTo") newErrors.to = undefined

      if (name === "dateFrom" && errors.to) newErrors.to = errors.to
      if (name === "dateTo" && errors.from) newErrors.from = errors.from

      if (
        errors.from &&
        errors.to &&
        !rangeInvalid(parseDate(dateFrom), parseDate(dateTo))
      ) {
        newErrors.both = errors.both
      } else {
        delete newErrors.both
      }

      return newErrors
    })
  }

  const onApply = () => {
    const errors = validateDates(dateFrom, dateTo)
    setDateError(errors)

    // Focus first invalid field
    if (errors.from || errors.both) {
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

const slashPattern =
  /^(\d{4})(?:\/(0[1-9]|1[0-2])(\/(0[1-9]|[12][0-9]|3[01]))?)?$/
const hasFormatError = (v: string) => v && !slashPattern.test(v)

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

export const rangeInvalid = (from: Date | null, to: Date | null): boolean => {
  if (!from || !to) return false
  return from.getTime() > to.getTime()
}

export const validateDates = (
  dateFrom: string,
  dateTo: string
): DateErrorState => {
  const errors: DateErrorState = {}
  const fromParsed = parseDate(dateFrom)
  const toParsed = parseDate(dateTo)

  const fromInvalid = !!dateFrom && (!fromParsed || hasFormatError(dateFrom))
  const toInvalid = !!dateTo && (!toParsed || hasFormatError(dateTo))

  // Both format/invalid
  if (fromInvalid && toInvalid)
    errors.both = "Error: Please enter valid 'from' and 'to' dates."
  else {
    if (fromInvalid) errors.from = "Error: Please enter a valid 'from' date."
    if (toInvalid) errors.to = "Error: Please enter a valid 'to' date."
  }

  // Future dates
  const fromFuture = fromParsed && isFutureDate(fromParsed)
  const toFuture = toParsed && isFutureDate(toParsed)

  if (fromFuture && toFuture)
    errors.both = "Error: 'From' and 'To' fields cannot contain future dates."
  else {
    if (fromFuture)
      errors.from = "Error: 'From' field cannot contain a future date."
    if (toFuture) errors.to = "Error: 'To' field cannot contain a future date."
  }

  // Range check
  const bothValid =
    fromParsed &&
    toParsed &&
    !fromInvalid &&
    !toInvalid &&
    !fromFuture &&
    !toFuture
  if (bothValid && rangeInvalid(fromParsed, toParsed))
    errors.both = "Error: End date must be later than start date."

  return errors
}
