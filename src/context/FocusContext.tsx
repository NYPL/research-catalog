import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"

interface FocusContextType {
  activeElementId: string | null
  // setActiveElementId: (id: string | null) => void
  setPersistentFocus: (id: string | null) => void
  // Id found in the "focus" url param. Read on mount and after every
  // client-side route change
  redirectFocusTarget: string | null
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
  browseResultsHeading: "browse-results-heading",
  searchResultsSort: "search-results-sort",
  browseResultsSort: "browse-results-sort",
  listsSort: "lists-sort",
  filterResultsHeading: "filter-results-heading",
  activeFiltersHeading: "active-filters-heading",
  searchFiltersModal: "search-filters-modal",
  applyDates: "apply-dates",
  holdErrorBanner: "hold-error",
  holdCompletedBanner: "hold-completed",
  dateFrom: "date-from",
  dateTo: "date-to",
  advancedSearchError: "advanced-search-error",
  listRecordsHeading: "list-records-heading",
  listStatusBanner: "list-status-banner",
  accountStatusBanner: "account-status-banner",
  listMenuStatusBanner: "list-menu-status-banner",
  usernameStatusBanner: "username-status-banner",
  createListNameInput: "list-name-input",
  createListButton: "create-list",
}

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [activeElementId, setActiveElementId] = useState<string | null>(
    undefined
  )
  const [prevActiveElementId, setPrevActiveElementId] =
    useState(activeElementId)
  const [redirectFocusTarget, setRedirectFocusTarget] = useState<string | null>(
    null
  )
  // Use this flag to avoid accessing document on the server
  const [isClient, setIsClient] = useState(false)

  const setFocusById = useCallback(
    (id: string) => {
      if (isClient) {
        // Focus happens after React flushes DOM updates
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) {
            el.focus()
          }
        }, 100)
      }
    },
    [isClient]
  )
  if (activeElementId !== prevActiveElementId) {
    setPrevActiveElementId(activeElementId)
    setFocusById(activeElementId)
  }

  const setPersistentFocus = useCallback(
    (id) => {
      setActiveElementId(id)
      setFocusById(id)
    },
    [setFocusById]
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Reads focus param from url, sets focus on it, cleans up url.
  // Re-runs on every route change (e.g. tab switches from MyAccountMenu)
  // because FocusProvider persists across client-side navigation.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const focusTarget = params.get("focus")
    if (!focusTarget) return

    setRedirectFocusTarget(focusTarget)
    setPersistentFocus(focusTarget)

    // Clean up the url
    params.delete("focus")
    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash
    window.history.replaceState({}, "", newUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.asPath])

  return (
    <FocusContext.Provider
      value={{ setPersistentFocus, activeElementId, redirectFocusTarget }}
    >
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
