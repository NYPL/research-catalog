export const dateErrorMessage = {
  fromInvalid: "Please enter a valid 'from' date.",
  toInvalid: "Please enter a valid 'to' date.",
  fromFuture: "'From' field cannot contain a future date.",
  toFuture: "'To' field cannot contain a future date.",
  combinedInvalid: "Please enter valid 'from' and 'to' dates.",
  combinedFuture: "'From' and 'to' fields cannot contain a future date.",
  range: "End date must be later than start date.",
}

const dateSlashPattern =
  /^(\d{4})(?:\/(0[1-9]|1[0-2])(\/(0[1-9]|[12][0-9]|3[01]))?)?$/

export const hasFormatError = (v: string) => v && !dateSlashPattern.test(v)

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
