import React, { createContext, useContext, useState } from "react"

interface FocusContextType {
  lastFocusedId: string | null
  setLastFocusedId: (id: string | null) => void
}

/**
 * Wrapper context component that maintains state of last used search control,
 * allowing focus to go to the correct element on re-render
 */
const FocusContext = createContext<FocusContextType | undefined>(undefined)

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastFocusedId, setLastFocusedId] = useState<string | null>(null)

  return (
    <FocusContext.Provider value={{ lastFocusedId, setLastFocusedId }}>
      {children}
    </FocusContext.Provider>
  )
}

export const useFocusContext = (): FocusContextType => {
  const context = useContext(FocusContext)
  if (!context) {
    throw new Error("useFocusContext must be used within FocusProvider")
  }
  return context
}
