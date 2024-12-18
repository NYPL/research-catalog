import { Box } from "@nypl/design-system-react-components"
import ContactALibrarian from "./ContactALibrarian"
import type Item from "../../../models/Item"

const NotAvailable = ({ item }: { item: Item }) => {
  const itemMetadata = {
    id: item.id,
    barcode: item.barcode,
    callNumber: item.callNumber,
    bibId: item.bibId,
  }
  return (
    <>
      <Box as="span" color="ui.warning.tertiary">
        Not available
      </Box>
      {item.dueDate && ` - In use until ${item.dueDate}`}
      <ContactALibrarian item={itemMetadata} />
    </>
  )
}

export default NotAvailable
