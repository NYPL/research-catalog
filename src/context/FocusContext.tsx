import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

interface FocusContextType {
  // lastFocusedId: string | null
  // setLastFocusedId: (id: string | null) => void
  setPersistentFocus: (id: string | null) => void
}

/**
 * Wrapper context component that maintains state of last used search control,
 * allowing focus to go to the correct element on re-render. Exposes
 * method setPersistentFocus, which focuses on the id provided, and then
 * maintains that focus in state so the hook can refocus on the correct
 * component on the next render
 */
const FocusContext = createContext<FocusContextType | undefined>(undefined)

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastFocusedId, setLastFocusedId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  const setFocusById = useCallback(
    (id: string) => {
      if (isClient) {
        const el = document.getElementById(id)
        if (el) {
          el.focus()
        }
      }
    },
    [isClient]
  )

  setFocusById(lastFocusedId)

  const setPersistentFocus = useCallback(
    (id) => {
      setFocusById(id)
      setLastFocusedId(id)
    },
    [setFocusById]
  )

  useEffect(() => {
    // This code only runs on the client side
    setIsClient(true)
  }, [])

  return (
    <FocusContext.Provider value={{ setPersistentFocus }}>
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
