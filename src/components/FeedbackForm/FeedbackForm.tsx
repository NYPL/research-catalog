import React, { useContext, useState } from "react"

import { FeedbackContext } from "../../context/FeedbackContext"
import type { FeedbackMetadataAndComment } from "../../types/feedbackTypes"
import { BASE_URL } from "../../config/constants"

/**
 * Component that wraps the DS Feedback box. Can be opened by clicking the button rendered
 * or by clicking on 'Contact a librarian' (located in src/app/components/Item/InformationLinks.jsx)
 */
const FeedbackForm = () => {
  const [feedbackFormScreen, setFeedbackFormScreen] = useState("form")
  const {
    FeedbackBox,
    isOpen,
    onClose,
    onOpen,
    itemMetadata,
    setItemMetadata,
    isError,
    setError,
    openFeedbackFormWithError,
  } = useContext(FeedbackContext)

  const closeAndResetFeedbackData = () => {
    setItemMetadata(null)

    setError(false)
    onClose()
    setFeedbackFormScreen("form")

    // Focus on the feedback button when the form is closed
    // TODO: Figure out why this default DS behavior isn't working out of the box
    setTimeout(() => {
      const openButton = document.querySelector("#open")
      if (openButton instanceof HTMLElement) {
        openButton.focus()
      }
    }, 250)
  }

  const submitFeedback = async (
    metadataAndComment: FeedbackMetadataAndComment
  ) => {
    try {
      // Changed this route to /feedback-rc to avoid conflicts with DFE with 2AD reverse proxy config
      // TODO: Change this route name back to /feedback when all routes point to research catalog
      const response = await fetch(`${BASE_URL}/api/feedback-rc`, {
        method: "POST",
        body: JSON.stringify(metadataAndComment),
      })
      const responseJson = await response.json()
      if (responseJson.error) {
        console.error("Error in feedback api response", responseJson.error)
        setFeedbackFormScreen("error")
      } else {
        setFeedbackFormScreen("confirmation")
      }
    } catch (error) {
      console.error("Error posting feedback", error)
      setFeedbackFormScreen("error")
    }
  }

  const notificationText = isError
    ? "You are asking for help or information about a page error"
    : itemMetadata?.notificationText
    ? itemMetadata.notificationText
    : itemMetadata?.callNumber
    ? `You are asking for help or information about ${itemMetadata.callNumber} in this record.`
    : null

  return (
    <FeedbackBox
      onSubmit={submitFeedback}
      isOpen={isOpen}
      onClose={closeAndResetFeedbackData}
      onOpen={onOpen}
      descriptionText="We are here to help!"
      title="Help and Feedback"
      showEmailField
      hiddenFields={itemMetadata}
      notificationText={notificationText}
      view={feedbackFormScreen}
      className="no-print"
    />
  )
}

export default FeedbackForm
