import { Box, Icon, Text } from "@nypl/design-system-react-components"
import { formatDueDate } from "../../../utils/itemUtils"
import ContactALibrarian from "./ContactALibrarian"
import type Item from "../../../models/Item"

const NotAvailable = ({ item }: { item: Item }) => {
  return (
    <>
      <Box as="span" display="flex" gap="xxs" alignItems="flex-start">
        <Icon
          name="errorOutline"
          color="ui.gray.semi-dark"
          iconRotation="rotate180"
          size="medium"
          mt="2px"
        />
        <Text size="body2">
          <Text
            as="span"
            color="ui.warning.secondary"
            style={{ fontWeight: "500" }}
          >
            Not available
          </Text>
          <Text as="span" style={{ fontStyle: "italic" }}>
            {item.dueDate
              ? ` - In use through ${formatDueDate(item.dueDate)}. `
              : " - "}
            {item.collection ? (
              "Please contact the division for assistance."
            ) : (
              // Partner items or items not in a division
              <ContactALibrarian item={item} />
            )}
          </Text>
        </Text>
      </Box>
    </>
  )
}

export default NotAvailable
