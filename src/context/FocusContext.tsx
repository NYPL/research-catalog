import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

interface FocusContextType {
  activeElementId: string | null
  // setActiveElementId: (id: string | null) => void
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

export const idConstants = {
  searchResultsHeading: "search-results-heading",
  searchResultsSort: "search-results-sort",
  filterResultsHeading: "filter-results-heading",
  activeFiltersHeading: "active-filters-heading",
  searchFiltersModal: "search-filters-modal",
  applyDates: "apply-dates",
}

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeElementId, setActiveElementId] = useState<string | null>(
    undefined
  )
  // Use this flag to avoid accessing document on the server
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

  setFocusById(activeElementId)

  const setPersistentFocus = useCallback(
    (id) => {
      setFocusById(id)
      setActiveElementId(id)
    },
    [setFocusById]
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <FocusContext.Provider value={{ setPersistentFocus, activeElementId }}>
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
