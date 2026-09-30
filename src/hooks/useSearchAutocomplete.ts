import { useState, useEffect, useRef, useCallback } from "react"
import type { AutocompleteResult } from "../types/searchTypes"
import { BASE_URL } from "../config/constants"

const MIN_SUGGEST_CHARS = 3
const DEBOUNCE_MS = 300

interface UseSearchAutocompleteOptions {
  q: string
  listboxId: string
  searchScope: string
}

export interface UseSearchAutocompleteReturn {
  suggestions: AutocompleteResult[]
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  isOpen: boolean
  isTouch: boolean
  wrapperRef: React.RefObject<HTMLDivElement>
  closeAutocomplete: () => void
  returnFocusToInput: () => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  handleWrapperBlur: (event: React.FocusEvent<HTMLDivElement>) => void
  statusMessage: string
}

/**
 * Manages all combobox state and side effects for the search typeahead.
 */

export function useSearchAutocomplete({
  q,
  listboxId,
  searchScope,
}: UseSearchAutocompleteOptions): UseSearchAutocompleteReturn {
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const isOpen = suggestions.length > 0
  const [isTouch, setIsTouch] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Detect coarse-pointer (touch) devices on mount.
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  // Fetch suggestions with debounce whenever the keyword changes.
  useEffect(() => {
    if (q.length < MIN_SUGGEST_CHARS) {
      setSuggestions([])
      return
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/autocomplete?q=${encodeURIComponent(q)}` +
            (searchScope ? `&search_scope=${searchScope}` : "")
        )
        if (!res.ok) {
          setSuggestions([])
          return
        }
        const data = await res.json()
        const results: AutocompleteResult[] = data.entries ?? []
        setSuggestions(results)
        setActiveIndex(-1)
      } catch {
        setSuggestions([])
      }
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [q])

  const closeAutocomplete = useCallback(() => {
    setSuggestions([])
    setActiveIndex(-1)
  }, [])

  // Close suggestions when the user clicks outside the search component.
  useEffect(() => {
    if (!isOpen) return
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeAutocomplete()
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isOpen, closeAutocomplete])

  // Imperatively set combobox ARIA attributes on the actual <input> element.
  // The DS TextInput spreads additionalInputProps onto its wrapper div, not the
  // input itself, so we must use the DOM directly.
  useEffect(() => {
    const input = wrapperRef.current?.querySelector<HTMLInputElement>("input")
    if (!input) return
    input.setAttribute("role", "combobox")
    input.setAttribute("aria-haspopup", "listbox")
    input.setAttribute("aria-autocomplete", "list")
    input.setAttribute("aria-controls", listboxId)
    input.setAttribute("aria-expanded", String(isOpen))
    // With aria-activedescendant, focus stays on the input and VoiceOver reads
    // the referenced option. This avoids the combobox→listbox context switch
    // that causes VoiceOver to restart its announcement (the "stutter").
    if (activeIndex >= 0) {
      input.setAttribute(
        "aria-activedescendant",
        `${listboxId}-option-${activeIndex}`
      )
    } else {
      input.removeAttribute("aria-activedescendant")
    }
  }, [isOpen, listboxId, activeIndex])

  const returnFocusToInput = useCallback(() => {
    wrapperRef.current?.querySelector<HTMLInputElement>("input")?.focus()
  }, [])

  // Close the listbox when focus leaves the component on non-touch devices.
  // Touch devices use a Close button instead because onBlur fires too eagerly
  // when a screen reader moves focus to options, closing the list prematurely.
  const handleWrapperBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!isOpen || isTouch) return
      if (event.currentTarget.contains(event.relatedTarget as Node)) return
      closeAutocomplete()
    },
    [isOpen, isTouch, closeAutocomplete]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault()
          setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
          break
        }
        case "ArrowUp": {
          event.preventDefault()
          setActiveIndex((prev) => Math.max(prev - 1, -1))
          break
        }
        case "Escape":
          event.preventDefault()
          closeAutocomplete()
          break
      }
    },
    [isOpen, suggestions.length, closeAutocomplete]
  )

  const statusMessage = isOpen
    ? `${suggestions.length} suggestion${
        suggestions.length === 1 ? "" : "s"
      } available below.`
    : ""

  return {
    suggestions,
    activeIndex,
    setActiveIndex,
    isOpen,
    isTouch,
    wrapperRef,
    closeAutocomplete,
    returnFocusToInput,
    handleKeyDown,
    handleWrapperBlur,
    statusMessage,
  }
}
