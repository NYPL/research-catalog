import React, { type ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { FeedbackProvider } from "../context/FeedbackContext"
import { FocusProvider } from "../context/FocusContext"
import { BrowseProvider } from "../context/BrowseContext"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <FeedbackProvider value={null}>
      <FocusProvider>
        <BrowseProvider>{children}</BrowseProvider>
      </FocusProvider>
    </FeedbackProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export * from "@testing-library/react"
export { customRender as render, delay }
