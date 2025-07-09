import React, { useState, createContext } from "react"

import { useFeedbackBox } from "@nypl/design-system-react-components"
import type { FeedbackContextType } from "../types/feedbackTypes"
import { BASE_URL } from "../config/constants"
import router from "next/router"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(value?.itemMetadata || null)
  const [requestedURL, setRequestedURL] = useState(value?.requestURL || null)
  const { FeedbackBox, isOpen, onOpen, onClose } = useFeedbackBox()
  const onContact = () => {
    const currentPath = router.asPath
    const fullURL = `${BASE_URL}${currentPath}`
    setRequestedURL(fullURL)
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
        requestedURL,
        setRequestedURL,
        onContact,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
