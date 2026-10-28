import { Box, Icon, Text } from "@nypl/design-system-react-components"
import type { ReactNode } from "react"
import type Item from "../../../models/Item"
import ContactALibrarian from "./ContactALibrarian"

const AvailableText = ({ text, item }: { text: ReactNode; item?: Item }) => {
  return (
    <>
      <Box as="span" display="flex" gap="xxs" alignItems="flex-start">
        <Icon
          name="errorOutline"
          color="ui.gray.semi-dark"
          iconRotation="rotate180"
          size="medium"
          mt="1px"
        />
        {item && !item.collection ? (
          <ContactALibrarian item={item} />
        ) : (
          <Text size="body2" isItalic>
            {text}
          </Text>
        )}
      </Box>
    </>
  )
}

export default AvailableText
