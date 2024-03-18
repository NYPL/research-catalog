import {
  type TextInputRefType,
  Fieldset,
  TextInput,
} from "@nypl/design-system-react-components"
import type { Ref, SyntheticEvent } from "react"
import { debounce } from "underscore"

type DatePickerPropsType = {
  inputRef?: Ref<TextInputRefType>
  dateAfter: string
  dateBefore: string
  debounceInterval: number
  changeHandler: (e: SyntheticEvent) => void
}

const DateForm = ({
  inputRef,
  dateAfter,
  dateBefore,
  debounceInterval,
  changeHandler,
}: DatePickerPropsType) => {
  return (
    <Fieldset
      id="date-fieldset"
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      legendText="Date"
      display="grid"
      gap="s"
    >
      <TextInput
        id="date-from"
        labelText="From"
        type="text"
        name="dateAfter"
        helperText="e.g. 1901"
        value={dateAfter}
        onChange={debounce((e) => changeHandler(e), debounceInterval)}
        ref={inputRef}
      />
      <TextInput
        id="date-to"
        labelText="To"
        type="text"
        name="dateBefore"
        helperText="e.g. 2000"
        value={dateBefore}
        onChange={debounce((e) => changeHandler(e), debounceInterval)}
        ref={inputRef}
      />
    </Fieldset>
  )
}

export default DateForm
