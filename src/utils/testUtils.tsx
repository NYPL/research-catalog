import React, { type ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { FeedbackProvider } from "../context/FeedbackContext"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <FeedbackProvider value={null}>{children}</FeedbackProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
