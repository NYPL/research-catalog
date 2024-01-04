import React from "react"
import { render, screen, act } from "@testing-library/react"
import RCLink from "./RCLink"
import userEvent from "@testing-library/user-event"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

describe("RCLink", () => {
  it("can take an href", async () => {
    render(<RCLink href="/spaghetti">Spaghetti</RCLink>, {
      wrapper: MemoryRouterProvider,
    })
    const link = screen.getByRole("link")
    await act(async () => {
      await userEvent.click(link)
      expect(link).toHaveAttribute("href", "/spaghetti")
    })
  })
})
