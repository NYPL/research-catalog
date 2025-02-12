import { Button } from "@nypl/design-system-react-components"
import { useContext } from "react"
import { FeedbackContext } from "../../../context/FeedbackContext"
import type { ItemMetadata } from "../../../types/itemTypes"
import type Item from "../../../models/Item"

const ContactALibrarian = ({
  item,
}: {
  item: Pick<Item, "id" | "barcode" | "callNumber" | "bibId">
}) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)
  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }
  return (
    <>
      {" Please "}
      <Button
        id="contact-librarian"
        buttonType="link"
        sx={{
          display: "inline",
          fontWeight: "inherit",
          fontSize: "inherit",
          p: 0,
          height: "auto",
          textAlign: "left",
          minHeight: "auto",
        }}
        onClick={() =>
          onContact({
            id: item.id,
            barcode: item.barcode,
            callNumber: item.callNumber,
            bibId: item.bibId,
          })
        }
      >
        contact a librarian
      </Button>
      {" for assistance."}
    </>
  )
}

export default ContactALibrarian
