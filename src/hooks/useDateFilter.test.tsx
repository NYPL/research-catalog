import React, { useRef, useState } from "react"
import { render, act, screen, fireEvent } from "@testing-library/react"
import { useDateFilter } from "./useDateFilter"
import type { TextInputRefType } from "@nypl/design-system-react-components"

jest.useFakeTimers()

const TestComponent = ({
  initialFrom = "",
  initialTo = "",
  changeHandler = jest.fn(),
  applyHandler = jest.fn(),
}: {
  initialFrom?: string
  initialTo?: string
  changeHandler?: (e: React.SyntheticEvent) => void
  applyHandler?: () => void
}) => {
  const ref1 = useRef<TextInputRefType>({ value: "" } as TextInputRefType)
  const ref2 = useRef<TextInputRefType>({ value: "" } as TextInputRefType)
  const [dateFrom, setDateFrom] = useState(initialFrom)
  const [dateTo, setDateTo] = useState(initialTo)

  const { dateFilterProps, clearInputs } = useDateFilter({
    inputRefs: [ref1, ref2],
    dateFrom,
    dateTo,
    changeHandler,
    applyHandler,
  })

  return (
    <div>
      <div data-testid="error-from">{dateFilterProps.dateError.from}</div>
      <div data-testid="error-to">{dateFilterProps.dateError.to}</div>
      <div data-testid="error-combined">
        {dateFilterProps.dateError.combined}
      </div>
      <button onClick={() => clearInputs()}>clear</button>
      <button onClick={() => setDateFrom("2025/10/01")}>setFromValid</button>
      <button onClick={() => setDateTo("2025/09/01")}>setToEarlier</button>
      <button onClick={() => setDateTo("2025/11/01")}>setToLater</button>
      <button onClick={() => setDateFrom("2025/AA")}>setFromInvalid</button>
      <button
        onClick={() => {
          act(() => {
            dateFilterProps.onApply()
          })
        }}
      >
        apply
      </button>
      <button
        onClick={() => {
          act(() => {
            dateFilterProps.onBlur()
          })
        }}
      >
        blur
      </button>
      <button
        onClick={() => {
          const event = {
            target: { name: "dateFrom" },
          } as unknown as React.SyntheticEvent
          act(() => {
            dateFilterProps.onChange(event)
          })
        }}
      >
        changeFrom
      </button>
      <button
        onClick={() => {
          const event = {
            target: { name: "dateTo" },
          } as unknown as React.SyntheticEvent
          act(() => {
            dateFilterProps.onChange(event)
          })
        }}
      >
        changeTo
      </button>
    </div>
  )
}

describe("useDateFilter hook", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should start with no errors", () => {
    render(<TestComponent />)
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-to")).toBeEmptyDOMElement()
  })

  it("should show error for invalid date on blur", () => {
    render(<TestComponent initialFrom="2025/13/01" initialTo="abcd" />)
    const blurButton = screen.getByText("blur")
    fireEvent.click(blurButton)
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      "Please enter a valid 'from' date."
    )
    expect(screen.getByTestId("error-to")).toHaveTextContent(
      "Please enter a valid 'to' date."
    )
    expect(screen.getByTestId("error-combined")).toHaveTextContent(
      "Please enter valid 'from' and 'to' dates."
    )
  })

  it("should clear specific field error when changing that field", () => {
    render(<TestComponent initialFrom="2025/13/01" initialTo="2025/10/01" />)
    fireEvent.click(screen.getByText("blur"))
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      "Please enter a valid 'from' date."
    )
    fireEvent.click(screen.getByText("changeFrom"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
  })

  it("should show range error when 'to' < 'from'", () => {
    render(<TestComponent initialFrom="2025/10/01" initialTo="2025/09/01" />)
    fireEvent.click(screen.getByText("apply"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-to")).toBeEmptyDOMElement()
  })

  it("should clear all inputs and errors on clear", () => {
    render(<TestComponent initialFrom="2025/10/01" initialTo="2025/11/01" />)
    fireEvent.click(screen.getByText("blur"))
    fireEvent.click(screen.getByText("clear"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-to")).toBeEmptyDOMElement()
  })

  it("should call applyHandler when dates are valid", () => {
    const applyHandler = jest.fn()
    render(
      <TestComponent
        initialFrom="2024/10/01"
        initialTo="2024/11/01"
        applyHandler={applyHandler}
      />
    )
    fireEvent.click(screen.getByText("apply"))
    act(() => jest.runAllTimers())
    expect(applyHandler).toHaveBeenCalled()
  })

  it("should set future date error correctly", () => {
    const futureYear = new Date().getFullYear() + 1
    render(<TestComponent initialFrom={`${futureYear}/01/01`} />)
    fireEvent.click(screen.getByText("blur"))
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      "'From' field cannot contain a future date."
    )
  })
})
