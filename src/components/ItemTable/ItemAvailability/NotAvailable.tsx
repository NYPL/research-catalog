import { Box, Icon, Text } from "@nypl/design-system-react-components"
import { formatDueDate } from "../../../utils/itemUtils"

const NotAvailable = ({
  text,
  dueDate,
}: {
  text: string | JSX.Element
  dueDate?: string
}) => {
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
        <Text size="body2" fontStyle="italic">
          {dueDate ? `- In use through ${formatDueDate(dueDate)}. ` : "- "}
          {text}
        </Text>
      </Box>
    </>
  )
}

export default NotAvailable
