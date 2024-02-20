import React from "react"
import { screen, render } from "@testing-library/react"

import TestPickupTimes from "../../../pages/test-pickup-times/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Test Pickup Times", () => {
  describe("Displays testing form", () => {
    it("displays testing form", () => {
      render(<TestPickupTimes />)

      const forms = screen.getAllByRole("form")
      expect(forms).toHaveLength(1)
    })
  })
})
