import React from "react"
import { screen, render } from "../../../src/utils/testUtils"

import TestPickupTimes from "../../../pages/test-pickup-times/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Test Pickup Times", () => {
  describe("Displays testing form", () => {
    it("displays testing form", () => {
      render(<TestPickupTimes />)

      const forms = screen.getByTestId("testPickupTimeForm")
      expect(forms).toBeInTheDocument()
    })
  })
})
