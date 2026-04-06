import { Box, Icon, Text } from "@nypl/design-system-react-components"
import { formatDueDate } from "../../../utils/itemUtils"

const NotAvailable = ({ dueDate }: { dueDate?: string }) => {
  return (
    <>
      <Box as="span" display="inline-flex" gap="xxs" alignItems="center">
        <Icon
          name="errorOutline"
          color="ui.gray.semi-dark"
          iconRotation="rotate180"
          size="medium"
        />
        <Text as="span" color="ui.warning.secondary" fontWeight="500">
          Not available
        </Text>
        <Text as="span" size="body2" fontStyle="italic">
          {dueDate ? `- In use through ${formatDueDate(dueDate)}. ` : "- "}
          Please contact the division for assistance.
        </Text>
      </Box>
    </>
  )
}

export default NotAvailable
