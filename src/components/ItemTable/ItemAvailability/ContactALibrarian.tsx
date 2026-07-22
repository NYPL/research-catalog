import { useContext } from "react"
import { FeedbackContext } from "../../../context/FeedbackContext"
import type { ItemMetadata } from "../../../types/itemTypes"
import type Item from "../../../models/Item"
import { Text, Link } from "@nypl/design-system-react-components"
import type SearchResultsBib from "../../../models/SearchResultsBib"
import type { BibMetadata } from "../../../types/bibTypes"

const ContactALibrarian = ({
  item,
  bib,
}: {
  item?: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
  bib?: Pick<SearchResultsBib, "title" | "id" | "callNumber">
}) => {
  const { onOpen, setFeedbackMetadata } = useContext(FeedbackContext)
  const onContact = (metadata?: ItemMetadata | BibMetadata) => {
    metadata && setFeedbackMetadata(metadata)
    onOpen()
  }
  return (
    <Text size="body2" fontStyle="italic">
      {"Please "}
      <Link
        id="contact-librarian"
        onClick={() =>
          // If item's available, pass that metadata
          onContact(
            item
              ? {
                  id: item.id,
                  barcode: item.barcode,
                  callNumber: item.callNumber,
                  volume: item.volume,
                  bibId: item.bibId,
                }
              : bib
              ? { id: bib.id, title: bib.title, callNumber: bib.callNumber }
              : null
          )
        }
      >
        contact a librarian
      </Link>
      {" for assistance."}
    </Text>
  )
}

export default ContactALibrarian
