import React, { useState, createContext } from "react"
import { useFeedbackBox } from "@nypl/design-system-react-components"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext(null)

export const FeedbackProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(
    value && value.itemMetadata ? value.itemMetadata : null
  )
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox()
  const openFeedbackBox = () => {
    onOpen()
  }
  return (
    <FeedbackContext.Provider
      value={{
        onOpen: openFeedbackBox,
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
