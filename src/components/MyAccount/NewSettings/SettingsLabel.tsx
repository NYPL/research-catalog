import { Flex, Icon, Text } from "@nypl/design-system-react-components"

const SettingsLabel = ({ icon, text }) => {
  return (
    <Flex gap="xs" alignItems="center" paddingLeft="xs" paddingTop="xs">
      <Icon name={icon} size="medium" />
      <Text
        size="body1"
        sx={{
          fontWeight: "500",
          marginBottom: 0,
          marginRight: { base: "l", lg: "200px" },
        }}
      >
        {text}
      </Text>
    </Flex>
  )
}

export default SettingsLabel
