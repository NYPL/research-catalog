import React, { useState, createContext } from "react"

import { useFeedbackBox } from "@nypl/design-system-react-components"
import type { FeedbackContextType } from "../types/feedbackTypes"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(value?.itemMetadata || null)
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox()

  return (
    <FeedbackContext.Provider
      value={{
        onOpen,
        FeedbackBox,
        isOpen,
        onClose,
        itemMetadata,
        setItemMetadata,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
