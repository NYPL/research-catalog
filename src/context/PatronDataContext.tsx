import React, { useState, createContext } from "react"
import type { PatronDataContextType } from "../types/myAccountTypes"
/**
 * Wrapper context component that controls state for the PatronData component
 */
export const PatronDataContext = createContext<PatronDataContextType | null>(
  null
)

export const PatronDataProvider = ({ children, value }) => {
  return (
    <PatronDataContext.Provider value={{}}>
      {children}
    </PatronDataContext.Provider>
  )
}
