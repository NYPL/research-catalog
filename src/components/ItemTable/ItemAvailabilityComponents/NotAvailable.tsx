import { Box } from "@nypl/design-system-react-components"
import type Item from "../../../models/Item"
import ContactALibrarian from "./ContactALibrarian"

const NotAvailable = ({ item }: { item: Item }) => {
  return (
    <>
      <Box as="span" color="ui.warning.tertiary">
        Not available
      </Box>
      {item.dueDate && ` - In use until ${item.dueDate}`}
      <ContactALibrarian item={item} />
    </>
  )
}

export default NotAvailable
