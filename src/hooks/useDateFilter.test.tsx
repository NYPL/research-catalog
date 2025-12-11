import React, { useState } from "react"
import { useDateFilter } from "./useDateFilter"
import { dateErrorMessage } from "../utils/dateUtils"
import { render, screen, fireEvent, act } from "../utils/testUtils"

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
  const [dateFrom, setDateFrom] = useState(initialFrom)
  const [dateTo, setDateTo] = useState(initialTo)

  const { dateFilterProps, clearInputs } = useDateFilter({
    dateFrom,
    dateTo,
    changeHandler,
    applyHandler,
    clearHandler: () => {
      setDateFrom("")
      setDateTo("")
    },
  })
  return (
    <div>
      <div data-testid="error-from">{dateFilterProps.dateError.from}</div>
      <div data-testid="error-to">{dateFilterProps.dateError.to}</div>
      <div data-testid="error-combined">
        {dateFilterProps.dateError.combined}
      </div>
      <div data-testid="error-range">{dateFilterProps.dateError.range}</div>
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
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should start with no errors", () => {
    render(<TestComponent />)
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-to")).toBeEmptyDOMElement()
  })

  it("should show individual field error when changing that field", () => {
    render(<TestComponent initialFrom="2025/13/01" initialTo="2025/10/01" />)
    fireEvent.click(screen.getByText("blur"))
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      dateErrorMessage.fromInvalid
    )
    fireEvent.click(screen.getByText("changeFrom"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
  })

  it("should show combined error for invalid dates on blur", () => {
    render(<TestComponent initialFrom="2025/13/01" initialTo="abcd" />)
    const blurButton = screen.getByText("blur")
    fireEvent.click(blurButton)
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      dateErrorMessage.fromInvalid
    )
    expect(screen.getByTestId("error-to")).toHaveTextContent(
      dateErrorMessage.toInvalid
    )
    expect(screen.getByTestId("error-combined")).toHaveTextContent(
      dateErrorMessage.combinedInvalid
    )
  })

  it("should set future date error correctly", () => {
    const futureYear = new Date().getFullYear() + 1
    render(<TestComponent initialFrom={`${futureYear}/01/01`} />)
    fireEvent.click(screen.getByText("blur"))
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      dateErrorMessage.fromFuture
    )
  })

  it("should clear only specific field error when changing that field", () => {
    render(<TestComponent initialFrom="2025/13/01" initialTo="2025/10/32" />)
    fireEvent.click(screen.getByText("blur"))
    expect(screen.getByTestId("error-from")).toHaveTextContent(
      dateErrorMessage.fromInvalid
    )
    expect(screen.getByTestId("error-to")).toHaveTextContent(
      dateErrorMessage.toInvalid
    )
    expect(screen.getByTestId("error-combined")).toHaveTextContent(
      dateErrorMessage.combinedInvalid
    )
    fireEvent.click(screen.getByText("changeFrom"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-combined")).toBeEmptyDOMElement()
  })

  it("should show range error when 'to' < 'from'", () => {
    render(<TestComponent initialFrom="2025/10/01" initialTo="2025/09/01" />)
    fireEvent.click(screen.getByText("apply"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-to")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-range")).toHaveTextContent(
      dateErrorMessage.range
    )
  })

  it("should clear all inputs and errors on clear", () => {
    render(<TestComponent initialFrom="2025/10/01" initialTo="2025/11/01" />)
    fireEvent.click(screen.getByText("blur"))
    fireEvent.click(screen.getByText("clear"))
    expect(screen.getByTestId("error-from")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-to")).toBeEmptyDOMElement()
    expect(screen.getByTestId("error-range")).toBeEmptyDOMElement()
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
    expect(applyHandler).toHaveBeenCalled()
  })
})
