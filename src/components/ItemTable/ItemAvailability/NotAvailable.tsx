import { Box } from "@nypl/design-system-react-components"
import ContactUs from "./ContactUs"
import type Item from "../../../models/Item"

const NotAvailable = ({
  item,
  dueDate,
}: {
  dueDate: string
  item: Pick<Item, "id" | "barcode" | "callNumber" | "bibId" | "volume">
}) => {
  const itemMetadata = {
    id: item.id,
    barcode: item.barcode,
    callNumber: item.callNumber,
    bibId: item.bibId,
    volume: item.volume,
  }
  return (
    <>
      <Box as="span" color="ui.warning.tertiary">
        Not available
      </Box>
      {" -"}
      {dueDate && ` - In use until ${dueDate} -`}
      {" please "}
      <ContactUs item={itemMetadata} contactMessage="contact a librarian" />
      {" for assistance."}
    </>
  )
}

export default NotAvailable
