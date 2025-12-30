import { Link } from "@nypl/design-system-react-components"
import { useContext } from "react"
import { FeedbackContext } from "../../../context/FeedbackContext"
import type { ItemMetadata } from "../../../types/itemTypes"
import type Item from "../../../models/Item"

const ContactALibrarian = ({
  item,
}: {
  item: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
}) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)
  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }
  return (
    <>
      {" Please "}
      <Link
        id="contact-librarian"
        onClick={() =>
          onContact({
            id: item.id,
            barcode: item.barcode,
            callNumber: item.callNumber,
            volume: item.volume,
            bibId: item.bibId,
          })
        }
      >
        contact a librarian
      </Link>

      {" for assistance."}
    </>
  )
}

export default ContactALibrarian
