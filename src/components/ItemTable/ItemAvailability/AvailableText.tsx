import { Box, Icon, Text } from "@nypl/design-system-react-components"

const AvailableText = ({ text }: { text: string }) => {
  return (
    <>
      <Box as="span" display="flex" gap="xs" alignItems="flex-start">
        <Icon
          name="errorOutline"
          color="ui.gray.semi-dark"
          iconRotation="rotate180"
          size="medium"
          mt="2px"
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
