import { Link } from "@nypl/design-system-react-components"
import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"
import type Item from "../../models/Item"
import type { HTTPStatusCode } from "../../types/appTypes"

type ContactUsProps = {
  contactMessage?: string
  item?: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
  notificationText?: string
  errorStatus?: HTTPStatusCode
}

const ContactUs = ({
  contactMessage = "contact us",
  item,
  notificationText,
  errorStatus,
}: ContactUsProps) => {
  const { onOpen, setItemMetadata, setErrorStatus } =
    useContext(FeedbackContext)

  const onOpenForm = () => {
    if (item)
      setItemMetadata({
        id: item.id,
        barcode: item.barcode,
        callNumber: item.callNumber,
        volume: item.volume,
        bibId: item.bibId,
        ...(notificationText && { notificationText }),
      })
    if (errorStatus) setErrorStatus(errorStatus)
    onOpen()
  }

  return (
    <Link
      id="contact-us"
      onClick={onOpenForm}
      onKeyDown={(e) => {
        e.preventDefault()
        if (e.key === "Enter" || e.key === " ") onOpenForm()
      }}
      tabIndex={0}
    >
      {contactMessage}
    </Link>
  )
}

export default ContactUs
