import { Box } from "@nypl/design-system-react-components"
import ContactALibrarian from "./ContactALibrarian"
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
      <ContactALibrarian item={itemMetadata} />
    </>
  )
}

export default NotAvailable
