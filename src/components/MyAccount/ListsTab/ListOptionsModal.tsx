import { Button, Flex, Icon } from "@nypl/design-system-react-components"
import type List from "../../../models/List"

/**
 * The ListOptionsModal component renders the "Options" button and modal (with list operations)
 *  displayed for each list in the user's lists table.
 */
const ListOptionsModal = ({ list }: { list: List }) => {
  return (
    <Flex justifyContent="flex-end" width="100%">
      <Button variant="text" gap="0" padding="xs">
        <Icon name="navigationMoreVert" align="left" size="large" />
        Options
      </Button>
    </Flex>
  )
}

export default ListOptionsModal
