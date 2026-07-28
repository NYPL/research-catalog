import { Box, Icon, Text } from "@nypl/design-system-react-components"
import ContactALibrarian from "./ContactALibrarian"
import type Item from "../../../models/Item"

const NotAvailablePartner = ({ item }: { item: Item }) => {
  return (
    <>
      <Box as="span" display="inline-flex" gap="xxs" alignItems="center">
        <Icon
          name="errorOutline"
          color="ui.gray.semi-dark"
          iconRotation="rotate180"
          size="medium"
        />
        <Text size="body2" color="ui.warning.secondary" fontWeight="500">
          Not available
        </Text>
        <Text size="body2"> - </Text>
        <ContactALibrarian item={item} />
      </Box>
    </>
  )
}

export default NotAvailablePartner
