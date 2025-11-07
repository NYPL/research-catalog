import { useState, type MutableRefObject, type SyntheticEvent } from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import {
  parseDate,
  hasFormatError,
  isFutureDate,
  rangeInvalid,
  dateErrorMessage,
} from "../utils/dateUtils"

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
      requestAnimationFrame(() => inputRefs[0]?.current?.focus?.())
      return errors
    }
    if (errors.to) {
      requestAnimationFrame(() => inputRefs[1]?.current?.focus?.())
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

  if (fromInvalid) errors.from = dateErrorMessage.fromInvalid
  if (toInvalid) errors.to = dateErrorMessage.toInvalid

  // Future date check
  const fromFuture = fromParsed && isFutureDate(fromParsed)
  const toFuture = toParsed && isFutureDate(toParsed)

  if (fromFuture) errors.from = dateErrorMessage.fromFuture
  if (toFuture) errors.to = dateErrorMessage.toFuture

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
    errors.range = dateErrorMessage.range
  }

  // Replace with combined message if errors match
  if (errors.from && errors.to) {
    if (errors.from.includes("valid") && errors.to.includes("valid")) {
      errors.combined = dateErrorMessage.combinedInvalid
    } else if (errors.from.includes("future") && errors.to.includes("future")) {
      errors.combined = dateErrorMessage.combinedFuture
    } else {
      errors.combined = `${errors.from} ${errors.to}`
    }
  }

  return errors
}
