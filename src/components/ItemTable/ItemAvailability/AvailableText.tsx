import { Box, Icon, Text } from "@nypl/design-system-react-components"

const AvailableText = ({ text }: { text: string }) => {
  return (
    <>
      <Box as="span" display="flex" gap="xxs" alignItems="center">
        <Icon
          name="errorOutline"
          color="ui.gray.semi-dark"
          iconRotation="rotate180"
          size="medium"
        />
        <Text size="body2" isItalic>
          {" "}
          {text}
        </Text>
      </Box>
    </>
  )
}

export default AvailableText
