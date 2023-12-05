import { render, screen } from "@testing-library/react"
import React from "react"

import FieldsetDate from "./FieldsetDate"
import userEvent from "@testing-library/user-event"

describe("FieldsetDate", () => {
  const onDateChange = jest.fn()

  it("should render the basic form", () => {
    render(<FieldsetDate onDateChange={onDateChange} />)

    // The fieldset
    expect(screen.getByRole("group")).toHaveTextContent("Date")
    // The inputs
    expect(screen.getByLabelText("From")).toBeInTheDocument()
    expect(screen.getByText("e.g. 1901")).toBeInTheDocument()
    expect(screen.getByLabelText("To")).toBeInTheDocument()
    expect(screen.getByText("e.g. 2001")).toBeInTheDocument()
    // The helper text
    expect(
      screen.getByText(
        "The end year should be the same year as or later than the start year."
      )
    ).toBeInTheDocument()
  })

  it("should render default dates", async () => {
    render(<FieldsetDate onDateChange={onDateChange} />)

    const defaultDates = screen.getAllByDisplayValue("2023")
    expect(defaultDates).toHaveLength(2)
  })

  it("should render applied dates", () => {
    // Now we will apply some filters and make sure that the
    // applied filters are displayed.
    render(
      <FieldsetDate
        appliedFilters={{ dateAfter: "01/01/1992", dateBefore: "01/01/2012" }}
        onDateChange={onDateChange}
      />
    )

    const dateBefore = screen.getByDisplayValue("1992")
    const dateAfter = screen.getByDisplayValue("2012")
    expect(dateBefore).toBeInTheDocument()
    expect(dateAfter).toBeInTheDocument()
  })

  it("should call onDateChange when the date changes", async () => {
    render(<FieldsetDate onDateChange={onDateChange} />)

    const [dateAfter, dateBefore] = screen.getAllByDisplayValue("2023")

    // Change the "from" date
    await userEvent.click(dateAfter)
    await userEvent.click(screen.getByText("2021"))

    // The date should be updated
    expect(onDateChange).toHaveBeenCalledWith("dateAfter", "2021")

    // Change the "to" date
    await userEvent.click(dateBefore)
    await userEvent.click(screen.getByText("2026"))

    // The date should be updated
    expect(onDateChange).toHaveBeenCalledWith("dateBefore", "2026")
  })
})
