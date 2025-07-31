import React, { useState, createContext } from "react"

import { useFeedbackBox } from "@nypl/design-system-react-components"
import type { FeedbackContextType } from "../types/feedbackTypes"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(value?.itemMetadata || null)
  const [isError, setError] = useState(value?.error || false)
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox()

  // When user opens feedback box from an error page "contact us" link,
  // set error flag on feedback box
  const openFeedbackFormWithError = () => {
    setError(true)
    onOpen()
  }

  return (
    <FeedbackContext.Provider
      value={{
        onOpen,
        FeedbackBox,
        isOpen,
        onClose,
        itemMetadata,
        setItemMetadata,
        isError,
        setError,
        openFeedbackFormWithError,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
