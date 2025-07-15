import React, { useState, createContext } from "react"

import { useFeedbackBox } from "@nypl/design-system-react-components"
import type { FeedbackContextType } from "../types/feedbackTypes"
import { BASE_URL } from "../config/constants"
import { useRouter } from "next/router"

/**
 * Wrapper context component that controls state for the Feedback component
 */
export const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children, value }) => {
  const [itemMetadata, setItemMetadata] = useState(value?.itemMetadata || null)
  const [requestedURL, setRequestedURL] = useState(value?.requestURL || null)
  const [isError, setError] = useState(value?.error || false)
  const { FeedbackBox, isOpen, onOpen: boxOpen, onClose } = useFeedbackBox()

  // When user opens feedback box, get their URL and add to email data
  const router = useRouter()
  const onOpen = () => {
    if (router && router.asPath) {
      const fullURL = `${BASE_URL}${router.asPath}`
      setRequestedURL(fullURL)
    }
    boxOpen()
  }

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
        requestedURL,
        setRequestedURL,
        isError,
        setError,
        openFeedbackFormWithError,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
