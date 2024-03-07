import {
  DatePicker,
  type FullDateType,
} from "@nypl/design-system-react-components"
import { debounce } from "underscore"
const debounceInterval = 500
import type { Dispatch, SetStateAction } from "react"

export type DateFormName = "dateAfter" | "dateBefore"
interface FieldsetDateProps {
  appliedFilters?: { [key in DateFormName]?: string | null }
  onDateChange: (dateFormName: DateFormName, value: string) => void
}

/**
 * Renders a date range input for the Search Results page.
 */
const FieldsetDate = ({
  appliedFilters = {},
  onDateChange,
}: FieldsetDateProps) => {
  const { dateAfter, dateBefore } = appliedFilters

  const onChange = (fullDate: FullDateType) => {
    // `startDate` and `endDate` key names from the DS but we
    // want to use `dateAfter` and `dateBefore` for our app state.
    const dateAfterString = fullDate.startDate?.getFullYear()?.toString()
    const dateBeforeString = fullDate.endDate?.getFullYear()?.toString()

    // It's possible that the user will enter a start date but not an
    // end date, or vice versa. In that case, we want to update the
    // state with the date that the user did enter.
    if (dateAfterString) onDateChange("dateAfter", dateAfterString)
    if (dateBeforeString) onDateChange("dateBefore", dateBeforeString)
  }

  // The text could be better but this is what is currently used
  // in production. We can revisit later.
  const helperText =
    "The end year should be the same year as or later than the start year."
  const invalidText =
    "Enter a valid range in the Start Year and End Year fields or remove what " +
    "you've entered from those fields."

  return (
    <DatePicker
      dateType="year"
      helperTextFrom="e.g. 1901"
      helperTextTo="e.g. 2001"
      id="dateAfter"
      helperText={helperText}
      invalidText={invalidText}
      isDateRange
      labelText="Date"
      nameFrom="dateAfter"
      nameTo="dateBefore"
      initialDate={dateAfter}
      initialDateTo={dateBefore}
      onChange={debounce((date) => onChange(date), debounceInterval)}
    />
  )
}

export default FieldsetDate
