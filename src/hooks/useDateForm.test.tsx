import {
  endDateInvalid,
  rangeContainsInvalidYearFormat,
  useDateForm,
} from "./useDateForm"
import { screen, render, renderHook } from "../utils/testUtils"
import { type MutableRefObject, useRef } from "react"
import {
  Button,
  type TextInputRefType,
} from "@nypl/design-system-react-components"
import DateForm from "../components/SearchFilters/DateForm"
import userEvent from "@testing-library/user-event"

// A hook which renders a date form and exposes the validate date range
// method for testing
const setUpDateFormHook = (start: string, end: string) => {
  let refs: MutableRefObject<TextInputRefType>[]
  // this component exists only to populate the ref values
  const TestComponent = () => {
    refs = [useRef<TextInputRefType>()]
    return null
  }
  render(<TestComponent />)
  const {
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
  render(<DateForm {...dateFormProps} />)
  return validateDateRange
}
const useTestDateFormHookComponent = (start: string, end: string) => {
  let refs: MutableRefObject<TextInputRefType>[]
  const TestComponent = () => {
    refs = [useRef<TextInputRefType>(), useRef<TextInputRefType>()]
    const { validateDateRange, dateFormProps, clearInputs } = useDateForm({
      inputRefs: refs,
      dateAfter: start,
      dateBefore: end,
      changeHandler: () => true,
    })

    return (
      <>
        <Button id="test-clear" onClick={clearInputs}>
          Clear
        </Button>
        <Button id="test-submit" onClick={validateDateRange}>
          Submit
        </Button>
        <DateForm {...dateFormProps} />
      </>
    )
  }
  render(<TestComponent />)
}

const clickSubmitButton = async () => {
  const button = screen.getByText("Submit")
  await userEvent.click(button)
}

const clearInputs = async () => {
  const button = screen.getByText("Clear")
  await userEvent.click(button)
}

describe("useDateForm", () => {
  describe("validateDateRange", () => {
    it("validateDateRange focuses the input when end date is earlier than start date", () => {
      const validateDateRange = setUpDateFormHook("2000", "1999")
      validateDateRange()
      const input1 = screen.getByDisplayValue("2000")
      const input2 = screen.getByDisplayValue("1999")
      expect(input2).not.toHaveFocus()
      expect(input1).toHaveFocus()
    })
    it("validateDateRange returns false when end date is earlier than start date", async () => {
      const validateDateRange = setUpDateFormHook("2000", "1999")
      expect(validateDateRange()).toBe(false)
    })
    it("returns true when dates are valid", () => {
      const validateDateRange = setUpDateFormHook("1999", "2000")
      expect(validateDateRange()).toBe(true)
    })
  })
  describe("hook with DateForm component", () => {
    it("should not display an error when there is only one valid date", async () => {
      useTestDateFormHookComponent("", "2000")
      await clickSubmitButton()
      const errorMessage = screen.queryByText("Error: ", { exact: false })
      expect(errorMessage).not.toBeInTheDocument()
    })
    it("should not display an error when the dates are valid", async () => {
      useTestDateFormHookComponent("1999", "2000")
      await clickSubmitButton()
      const errorMessage = screen.queryByText("Error: ", { exact: false })
      expect(errorMessage).not.toBeInTheDocument()
    })
    it("should display an error when the before date is bigger than the after date and validation fails", async () => {
      useTestDateFormHookComponent("1999", "1998")
      await clickSubmitButton()
      const errorMessage = screen.getByText(
        "Error: Start date must be earlier than end date.",
        { exact: false }
      )
      expect(errorMessage).toBeInTheDocument()
    })
    it("should display an error when dates are clearly wrong to and validation fails", async () => {
      useTestDateFormHookComponent("1900000", "200000000")
      await clickSubmitButton()
      const errorMessage = screen.getByText("Error: Years must be 4 digits", {
        exact: false,
      })
      expect(errorMessage).toBeInTheDocument()
    })
    it("should be able to clear inputs", async () => {
      useTestDateFormHookComponent("1900", "2000")
      await clearInputs()
      const inputs = screen.getAllByRole("textbox")
      inputs.forEach((input: TextInputRefType) => expect(input.value).toBe(""))
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
