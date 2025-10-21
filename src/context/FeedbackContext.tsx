import React, { useState, createContext } from "react"

import { useFeedbackBox } from "@nypl/design-system-react-components"
import type { FeedbackContextType } from "../types/feedbackTypes"
import type { HTTPStatusCode } from "../types/appTypes"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(value?.itemMetadata || null)
  const [error, setError] = useState(value?.error || null)
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox()

  // When user opens feedback box from an error page "contact us" link,
  // set error on feedback box
  const openFeedbackFormWithError = (statusCode?: HTTPStatusCode) => {
    setError(statusCode)
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
        error,
        setError,
        openFeedbackFormWithError,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
