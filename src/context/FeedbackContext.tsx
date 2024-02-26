import React, { useState, createContext } from "react"
import { useFeedbackBox } from "@nypl/design-system-react-components"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackBoxContext = createContext(null)

export const FeedbackBoxProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(
    value && value.itemMetadata ? value.itemMetadata : null
  )
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox()
  const openFeedbackBox = () => {
    onOpen()
  }
  return (
    <FeedbackBoxContext.Provider
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
    </FeedbackBoxContext.Provider>
  )
}
