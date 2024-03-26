import {
  endDateInvalid,
  rangeContainsInvalidYearFormat,
  useDateForm,
} from "./useDateForm"
import { renderHook, screen, render } from "../utils/testUtils"
import type { MutableRefObject } from "react"
import { useRef } from "react"
import type { TextInputRefType } from "@nypl/design-system-react-components"
import DateForm from "../components/SearchFilters/DateForm"

const setUpDateFormWithRefs = (start, end) => {
  let refs: MutableRefObject<TextInputRefType>[]
  // this component exists only to populate the ref values
  const TestComponent = () => {
    refs = [useRef<TextInputRefType>()]
    return null
  }
  render(<TestComponent />)
  const {
    rerender,
    result: {
      current: { validateDateRange, dateFormProps },
    },
  } = renderHook(() =>
    useDateForm({
      inputRefs: refs,
      dateAfter: start,
      dateBefore: end,
      changeHandler: () => true,
    })
  )
  return { validateDateRange, dateFormProps, rerender }
}

describe("useDateForm", () => {
  describe("validateDateRange", () => {
    it("validateDateRange focuses the input when end date is earlier than start date", () => {
      const { validateDateRange, dateFormProps } = setUpDateFormWithRefs(
        "2000",
        "1999"
      )
      render(<DateForm {...dateFormProps} />)
      validateDateRange()
      const input1 = screen.getByDisplayValue("2000")
      const input2 = screen.getByDisplayValue("1999")
      expect(input2).not.toHaveFocus()
      expect(input1).toHaveFocus()
    })
    it("validateDateRange returns false when end date is earlier than start date", async () => {
      const { validateDateRange, dateFormProps } = setUpDateFormWithRefs(
        "2000",
        "1999"
      )
      render(<DateForm {...dateFormProps} />)
      expect(validateDateRange()).toBe(false)
    })
    it("returns true when dates are valid", () => {
      const { validateDateRange, dateFormProps } = setUpDateFormWithRefs(
        "1999",
        "2000"
      )
      render(<DateForm {...dateFormProps} />)
      expect(validateDateRange()).toBe(true)
    })
  })
  describe("endDateInvalid", () => {
    it("returns false if either dateBefore or dateAfter are empty", () => {
      expect(endDateInvalid("", "2000")).toBe(false)
      expect(endDateInvalid("2000", "")).toBe(false)
    })
    it("returns true if the dateBefore is less than dateAfter", () => {
      expect(endDateInvalid("2000", "1900")).toBe(true)
    })
    it("returns false if dateBefore is greater than dateAfter", () => {
      expect(endDateInvalid("2000", "2001")).toBe(false)
    })
  })
  describe("rangeContainsInvalidYearFormat", () => {
    it("returns true for too short values", () => {
      expect(rangeContainsInvalidYearFormat("19", "20")).toBe(true)
    })
    it("returns true for too long values", () => {
      expect(rangeContainsInvalidYearFormat("19000000", "2000")).toBe(true)
    })
    it("it returns true for only one invalid format", () => {
      expect(rangeContainsInvalidYearFormat("", "19")).toBe(true)
    })
    it("it returns true for one valid and one invalid format", () => {
      expect(rangeContainsInvalidYearFormat("19", "2000")).toBe(true)
    })
    it("returns false for one valid input", () => {
      expect(rangeContainsInvalidYearFormat("", "2000")).toBe(false)
    })
    it("returns false for two valid inputs", () => {
      expect(rangeContainsInvalidYearFormat("1990", "2000")).toBe(false)
    })
  })
})
