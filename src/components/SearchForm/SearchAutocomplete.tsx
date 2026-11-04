"use client"
import React from "react"
import { Box, Text, Button } from "@nypl/design-system-react-components"
import type { AutocompleteResult } from "../../types/searchTypes"

interface SearchAutocompleteProps {
  suggestions: AutocompleteResult[]
  onSelect: (title: string) => void
  listboxId: string
  onClose: () => void
  activeIndex: number
  isTouch?: boolean
  searchScope: string
}

const SearchAutocomplete = ({
  suggestions,
  onSelect,
  listboxId,
  onClose,
  activeIndex,
  isTouch = false,
  searchScope,
}: SearchAutocompleteProps) => {
  if (!suggestions.length) return null

  return (
    <Box
      role="listbox"
      id={listboxId}
      aria-label="Search suggestions"
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 10,
        bg: "ui.white",
        border: "1px solid",
        borderColor: "ui.border.default",
        borderRadius: "sm",
        boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
        mt: "2px",
        overflow: "hidden",
      }}
    >
      {suggestions.map((suggestion, i) => {
        const paramsQuery = Object.entries(suggestion.params)
          .map((pair) => pair.join("="))
          .join("&")

        // Only show scope tag if it differs from selected scope:
        const showScope =
          (Array.isArray(suggestion.scope) &&
            !suggestion.scope.includes(searchScope)) ||
          (!Array.isArray(suggestion.scope) && searchScope !== suggestion.scope)
        const formatScope = (s) => {
          return s.charAt(0).toUpperCase() + s.substring(1).replace("_", " ")
        }
        const scopeName =
          {
            contributor: "Author/Contributor",
          }[suggestion.scope] || formatScope(suggestion.scope)

        return (
          <Box
            key={paramsQuery}
            role="option"
            id={`${listboxId}-option-${i}`}
            tabIndex={-1}
            aria-selected={activeIndex === i}
            aria-label={suggestion.label}
            onMouseDown={(e: React.MouseEvent) => {
              // Prevent the input from losing focus before the click completes.
              e.preventDefault()
              onSelect(paramsQuery)
            }}
            sx={{
              px: "s",
              py: "xs",
              cursor: "pointer",
              bg: "ui.white",
              "&:hover": { bg: "ui.bg.hover" },
              "&[aria-selected='true']": { bg: "ui.bg.hover" },
            }}
          >
            <Text
              size="body2"
              sx={{
                mb: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {suggestion.label}
              {showScope && <em style={{ color: "#006166" }}> {scopeName}</em>}
            </Text>
          </Box>
        )
      })}
      {isTouch && (
        <Button
          id={`${listboxId}-close-btn`}
          variant="text"
          aria-label="Close list"
          onClick={onClose}
          sx={{
            display: "block",
            width: "100%",
            borderTop: "1px solid",
            borderColor: "ui.border.default",
            borderRadius: 0,
            py: "xs",
          }}
        >
          Close
        </Button>
      )}
    </Box>
  )
}

export default SearchAutocomplete
