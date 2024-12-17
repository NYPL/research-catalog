import { Box } from "@nypl/design-system-react-components"
import ContactALibrarian from "./ContactALibrarian"

const NotAvailable = ({
  dueDate,
  itemMetadata,
}: {
  dueDate: string
  itemMetadata: {
    id: string
    barcode: string
    callNumber: string
    bibId: string
  }
}) => {
  return (
    <>
      <Box as="span" color="ui.warning.tertiary">
        Not available
      </Box>
      {dueDate && ` - In use until ${dueDate}`}
      <ContactALibrarian item={itemMetadata} />
    </>
  )
}

export default NotAvailable
