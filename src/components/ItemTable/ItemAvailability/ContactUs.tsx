import { Link } from "@nypl/design-system-react-components"
import { useContext } from "react"
import { FeedbackContext } from "../../../context/FeedbackContext"
import type { ItemMetadata } from "../../../types/itemTypes"
import type Item from "../../../models/Item"
import type { HTTPStatusCode } from "../../../types/appTypes"

const ContactUs = ({
  item,
  notificationText,
  errorStatus,
  contactMessage = "contact us",
}: {
  item?: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
  notificationText?: string
  errorStatus?: HTTPStatusCode
  contactMessage?: string
}) => {
  const { onOpen, setItemMetadata, openFeedbackFormWithError } =
    useContext(FeedbackContext)

  const onContactWithItem = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }
  const onContactWithErrorStatus = (errorStatus: HTTPStatusCode) => {
    openFeedbackFormWithError(errorStatus)
  }

  const linkProps = {
    id: "contact-us",
  }
  if (item || errorStatus)
    linkProps["onClick"] = () => {
      item
        ? onContactWithItem({
            id: item.id,
            barcode: item.barcode,
            callNumber: item.callNumber,
            volume: item.volume,
            bibId: item.bibId,
            ...(notificationText && { notificationText }),
          })
        : onContactWithErrorStatus(errorStatus)
    }
  else {
    linkProps["href"] = "https://www.nypl.org/get-help/contact-us"
    linkProps["isExternal"] = true
  }
  return (
    <>
      <Link {...linkProps}>{contactMessage}</Link>
    </>
  )
}

export default ContactUs
