import React, { useContext, useState } from "react"

import { FeedbackContext } from "../../context/FeedbackContext"
import type { FeedbackMetadataAndComment } from "../../types/feedbackTypes"
import { BASE_URL } from "../../config/constants"

/**
 * Component that wraps the DS Feedback box. Can be opened by clicking the button rendered
 * or by clicking on 'Contact a librarian' (located in src/app/components/Item/InformationLinks.jsx)
 */
const FeedbackForm = () => {
  const [screen, setScreen] = useState("form")
  const {
    FeedbackBox,
    isOpen,
    onClose,
    onOpen,
    itemMetadata,
    setItemMetadata,
  } = useContext(FeedbackContext)
  const closeAndResetItemMetadata = () => {
    if (itemMetadata) setItemMetadata(null)
    onClose()
    setScreen("form")
  }
  const submitFeedback = async (
    metadataAndComment: FeedbackMetadataAndComment
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/api/feedback`, {
        method: "POST",
        body: JSON.stringify(metadataAndComment),
      })
      const responseJson = await response.json()
      console.log(responseJson)
      if (responseJson?.data?.error) {
        console.error(responseJson.data.error)
        return
      }
      setScreen("confirmation")
    } catch (error) {
      console.error("Error posting feedback", error)
      setScreen("error")
    }
  }

  return (
    <FeedbackBox
      onSubmit={submitFeedback}
      isOpen={isOpen}
      onClose={closeAndResetItemMetadata}
      onOpen={onOpen}
      descriptionText="We are here to help!"
      title="Help and Feedback"
      showEmailField
      hiddenFields={itemMetadata}
      notificationText={
        itemMetadata?.callnumber
          ? `You are asking for help or information about ${itemMetadata.callnumber} in this record.`
          : null
      }
      view={screen}
    />
  )
}

export default FeedbackForm
