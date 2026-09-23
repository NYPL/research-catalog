import { Link } from "@nypl/design-system-react-components"
import type { MouseEvent } from "react"
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

  const onOpenForm = (e: MouseEvent) => {
    e.preventDefault()
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
    <Link id="contact-us" href="" onClick={onOpenForm}>
      {contactMessage}
    </Link>
  )
}

export default ContactUs
