import { render } from "@testing-library/react"
import React from "react"

import FieldsetDate from "./FieldsetDate"

describe("FieldsetDate", () => {
  const onDateChange = (filterId: string, value: string) => {
    return { filterId, value }
  }

  it("should render the form", () => {
    render(
      <FieldsetDate
        appliedFilters={{
          dateAfter: "1994",
          dateBefore: "2021",
        }}
        onDateChange={onDateChange}
      />
    )
  })
})
