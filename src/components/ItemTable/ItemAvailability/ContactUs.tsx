import { Link } from "@nypl/design-system-react-components"
import { useContext } from "react"
import { FeedbackContext } from "../../../context/FeedbackContext"
import type { ItemMetadata } from "../../../types/itemTypes"
import type Item from "../../../models/Item"
import type { HTTPStatusCode } from "../../../types/appTypes"

type BaseProps = {
  contactMessage?: string
}

type ContactUsWithItemProps = BaseProps & {
  item: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
  notificationText?: string
  errorStatus?: never
}

type ContactUsWithErrorProps = BaseProps & {
  item?: never
  notificationText?: never
  errorStatus: HTTPStatusCode
}

// Either the item or errorStatus prop should be provided
type ContactUsProps = ContactUsWithItemProps | ContactUsWithErrorProps

const ContactUs = ({
  item,
  notificationText,
  errorStatus,
  contactMessage = "contact us",
}: ContactUsProps) => {
  const { onOpen, setItemMetadata, openFeedbackFormWithError } =
    useContext(FeedbackContext)

  const onContactWithItem = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }
  const onContactWithErrorStatus = (errorStatus: HTTPStatusCode) => {
    openFeedbackFormWithError(errorStatus)
  }

  return (
    <Link
      id="contact-us"
      onClick={() =>
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
    >
      {contactMessage}
    </Link>
  )
}

export default ContactUs
