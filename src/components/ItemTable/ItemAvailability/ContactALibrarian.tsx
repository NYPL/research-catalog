import { useContext } from "react"
import { FeedbackContext } from "../../../context/FeedbackContext"
import type { ItemMetadata } from "../../../types/itemTypes"
import type Item from "../../../models/Item"
import { Text, Link } from "@nypl/design-system-react-components"
import type Bib from "../../../models/Bib"

const ContactALibrarian = ({
  item,
  bib,
}: {
  item?: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
  bib?: Pick<Bib, "title" | "id">
}) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)
  const onContact = (metadata?: ItemMetadata) => {
    metadata && setItemMetadata(metadata)
    onOpen()
  }
  return (
    <Text size="body2" fontStyle="italic">
      {"Please "}
      <Link
        id="contact-librarian"
        onClick={() =>
          onContact({
            id: item?.id,
            barcode: item?.barcode,
            callNumber: item?.callNumber,
            volume: item?.volume,
            bibId: item?.bibId,
          })
        }
      >
        contact a librarian
      </Link>
      {" for assistance."}
    </Text>
  )
}

export default ContactALibrarian
