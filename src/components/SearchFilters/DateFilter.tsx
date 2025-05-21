import { TextInput, Flex, Button } from "@nypl/design-system-react-components"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import { useState } from "react"
import type { CollapsedMultiValueAppliedFilters } from "../../types/filterTypes"
import type {
  MutableRefObject,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
} from "react"

interface DateFormPropsType {
  inputRefs?: MutableRefObject<TextInputRefType>[]
  dateAfter: string
  dateBefore: string
  setAppliedFilters: Dispatch<SetStateAction<CollapsedMultiValueAppliedFilters>>
  applyHandler?: (e: SyntheticEvent) => void
}

const DateFilter = ({
  inputRefs,
  dateAfter,
  dateBefore,
  setAppliedFilters,
  applyHandler,
}: DateFormPropsType) => {
  const validDateInput = (input) => {
    if (input === null || input === "") {
      return true
    }
    return (
      /^\d{1,4}$/.test(input) && Number(input) >= 0 && Number(input) <= 9999
    )
  }
  const [dateStart, setDateStart] = useState(dateAfter || "")
  const [dateEnd, setDateEnd] = useState(dateBefore || "")
  const [dateRangeError, setDateRangeError] = useState("")
  const changeHandler = (e, setField) => {
    const target = e.target?.value as HTMLInputElement
    setField(target)
    setAppliedFilters((prevFilters) => {
      return {
        ...prevFilters,
        [target.name]: [target.value],
      }
    })
  }
  return (
    <>
      <Flex gap="s" alignItems="center">
        <TextInput
          id="date-from"
          labelText="Start"
          name="dateAfter"
          helperText="e.g. 1901"
          value={dateAfter}
          isInvalid={!validDateInput(dateStart)}
          onChange={(e) => changeHandler(e, setDateStart)}
          ref={inputRefs[0]}
        />
        <TextInput
          id="date-to"
          labelText="End"
          name="dateBefore"
          isInvalid={!validDateInput(dateEnd)}
          helperText="e.g. 2000"
          value={dateBefore}
          onChange={(e) => changeHandler(e, setDateEnd)}
          ref={inputRefs[1]}
        />
        {applyHandler && (
          <Button
            width="90px"
            buttonType="secondary"
            id="apply-dates"
            onClick={applyHandler}
          >
            Apply
          </Button>
        )}
      </Flex>
    </>
  )
}

export default DateFilter
