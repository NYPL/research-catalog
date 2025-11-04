import React, { useRef, useState } from "react"
import { render, act, screen } from "@testing-library/react"
import { useDateFilter, rangeInvalid } from "./useDateFilter"
import type { TextInputRefType } from "@nypl/design-system-react-components"

jest.useFakeTimers()

const TestComponent = ({
  initialFrom = "",
  initialTo = "",
  changeHandler = jest.fn(),
}: {
  initialFrom?: string
  initialTo?: string
  changeHandler?: (e: React.SyntheticEvent) => void
}) => {
  const ref1 = useRef<TextInputRefType>({ value: "" } as TextInputRefType)
  const ref2 = useRef<TextInputRefType>({ value: "" } as TextInputRefType)
  const [dateFrom, setDateFrom] = useState(initialFrom)
  const [dateTo, setDateTo] = useState(initialTo)

  const { dateFilterProps, validateDates, clearInputs } = useDateFilter({
    inputRefs: [ref1, ref2],
    dateFrom,
    dateTo,
    changeHandler,
  })

  return (
    <div>
      <div data-testid="error-from">{dateFilterProps.dateError.from}</div>
      <div data-testid="error-to">{dateFilterProps.dateError.to}</div>

      <button
      // onClick={() => {
      //   validateDates()
      // }}
      >
        validate
      </button>

      <button
        onClick={() => {
          clearInputs()
        }}
      >
        clear
      </button>

      <button onClick={() => setDateFrom("2025/10/01")}>setFromValid</button>
      <button onClick={() => setDateTo("2025/09/01")}>setToEarlier</button>
      <button onClick={() => setDateTo("2025/11/01")}>setToLater</button>
      <button onClick={() => setDateFrom("2025/AA")}>setFromInvalid</button>
    </div>
  )
}

describe("useDateFilter hook", () => {
  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  //   it("should validate invalid formats", () => {
  //     render(<TestComponent initialFrom="2025/13" initialTo="2025/11/01" />)
  //     // advance debounce time
  //     act(() => {
  //       jest.runAllTimers()
  //     })
  //     expect(screen.getByTestId("error-from").textContent).toContain(
  //       "Please enter a valid 'from' date."
  //     )
  //     expect(screen.getByTestId("error-to").textContent).toBe("")
  //   })

  //   it("should detect invalid range (end before start)", () => {
  //     render(<TestComponent initialFrom="2025/10/10" initialTo="2025/09/09" />)
  //     act(() => {
  //       jest.runAllTimers()
  //     })
  //     expect(screen.getByTestId("error-range").textContent).toContain(
  //       "End date must be later than start date."
  //     )
  //   })

  //   it("should clear errors and input values on clearInputs()", () => {
  //     render(<TestComponent initialFrom="2025/10/10" initialTo="2025/09/09" />)

  //     act(() => {
  //       jest.runAllTimers()
  //     })

  //     const clearBtn = screen.getByText("clear")
  //     act(() => {
  //       clearBtn.click()
  //     })

  //     expect(screen.getByTestId("error-from").textContent).toBe("")
  //     expect(screen.getByTestId("error-to").textContent).toBe("")
  //     expect(screen.getByTestId("error-range").textContent).toBe("")
  //   })

  //   it("should validate manually using validateDates()", () => {
  //     render(<TestComponent initialFrom="2025/AA" initialTo="2025/09/01" />)

  //     const validateBtn = screen.getByText("validate")
  //     act(() => {
  //       validateBtn.click()
  //     })

  //     expect(screen.getByTestId("error-from").textContent).toContain(
  //       "Please enter a valid 'from' date."
  //     )
  //   })
  // })

  // describe("helpers", () => {
  //   it("rangeInvalid returns true when from > to", () => {
  //     expect(rangeInvalid("2025/10/10", "2025/09/09")).toBe(true)
  //   })

  //   it("rangeInvalid returns false when from <= to", () => {
  //     expect(rangeInvalid("2025/09/09", "2025/10/10")).toBe(false)
  //   })

  //   it("formatInvalid detects incorrect format", () => {
  //     expect(formatInvalid("2025/13")).toBe(true)
  //     expect(formatInvalid("2025/12/32")).toBe(true)
  //     expect(formatInvalid("2025/12/01")).toBe(false)
  //     expect(formatInvalid("2025/12/")).toBe(true)
  //     expect(formatInvalid("202512")).toBe(true)
  //     expect(formatInvalid("")).toBe(false)
  //   })
})
