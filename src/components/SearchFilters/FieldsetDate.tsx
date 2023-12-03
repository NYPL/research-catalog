import { DatePicker } from "@nypl/design-system-react-components"
import type { FullDateType } from "@nypl/design-system-react-components"

interface FieldsetDateProps {
  appliedFilters: {
    dateAfter?: string
    dateBefore?: string
  }
  onDateChange: (filterID: string, value: string) => void
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

  const helperText =
    "The end year should be the same year as or later than the start year."
  const errorMessage =
    "Enter a valid range in the Start Year and End Year fields or remove what " +
    "you've entered from those fields."

  return (
    <DatePicker
      dateType="year"
      helperTextFrom="e.g. 1901"
      helperTextTo="e.g. 2001"
      id="dateAfter"
      helperText={helperText}
      invalidText={errorMessage}
      isDateRange
      labelText="Date"
      nameFrom="dateAfter"
      nameTo="dateBefore"
      initialDate={dateAfter}
      initialDateTo={dateBefore}
      onChange={onChange}
    />
  )
}

export default FieldsetDate
