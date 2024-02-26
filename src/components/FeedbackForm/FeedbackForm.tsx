import React, { useContext, useState } from "react"
import axios from "axios"

import { FeedbackContext } from "../../context/FeedbackContext"
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
  const submitFeedback = async (metadataAndComment) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/feedback`, {
        fields: metadataAndComment,
      })
      if (res.data.error) {
        console.error(res.data.error)
        return
      }
      setScreen("confirmation")
    } catch (e) {
      console.error("Error posting feedback", e)
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
        itemMetadata && itemMetadata.callNumber
          ? `You are asking for help or information about ${itemMetadata.callNumber} in this record.`
          : null
      }
      view={screen}
    />
  )
}

export default FeedbackForm
