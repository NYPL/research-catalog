import {
  useState,
  useEffect,
  useRef,
  type MutableRefObject,
  type SyntheticEvent,
} from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"

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
  const debounceRef = useRef<number | null>(null)

  const validateField = (
    value: string,
    fieldName: "from" | "to"
  ): string | undefined => {
    if (!value) return undefined
    const digits = value.replace(/[^\d]/g, "")
    if (digits.length < 4 || formatInvalid(value))
      return `Please enter a valid '${fieldName}' date.`
    return undefined
  }

  // Debounced validation
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(() => {
      const errors: DateErrorState = {}
      errors.from = validateField(dateFrom, "from")
      errors.to = validateField(dateTo, "to")

      if (
        !errors.from &&
        !errors.to &&
        dateFrom &&
        dateTo &&
        rangeInvalid(dateFrom, dateTo)
      ) {
        errors.range = "End date must be later than start date."
      }

      setDateError(errors)
      debounceRef.current = null
    }, 600)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [dateFrom, dateTo])

  // Manual validation (Apply button)
  const validateDates = (from = dateFrom, to = dateTo) => {
    const errors: DateErrorState = {}
    errors.from = validateField(from, "from")
    errors.to = validateField(to, "to")

    if (!errors.from && !errors.to && from && to && rangeInvalid(from, to)) {
      errors.range = "End date must be later than start date."
    }

    setDateError(errors)
    return Object.values(errors).every((v) => v === undefined)
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
  const digits = date.replace(/[^\d]/g, "")
  if (digits.length < 4) return false
  const pattern = /^(\d{4})(?:\/(0[1-9]|1[0-2])(\/(0[1-9]|[12][0-9]|3[01]))?)?$/
  return !pattern.test(date)
}
