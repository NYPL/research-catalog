import React from "react"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import mockRouter from "next-router-mock"
// this import, as well as its use on line 15 is to avoid the following error:
// TypeError: Cannot use 'in' operator to search for 'beforePopState' in null
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

import SubNav from "./SubNav"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SubNav", () => {
  it("sends you to Subject Heading Explorer", async () => {
    render(<SubNav activePage="search" />, {
      wrapper: MemoryRouterProvider,
    })
    const subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks).toHaveLength(3)
  })
})
