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
            {dueDate ? ` - In use through ${formatDueDate(dueDate)}. ` : "- "}
            {text}
          </Text>
        </Text>
      </Box>
    </>
  )
}

export default NotAvailable
