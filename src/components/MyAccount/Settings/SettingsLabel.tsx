import { Flex, Icon, Text } from "@nypl/design-system-react-components"

const SettingsLabel = ({ icon, text }) => {
  return (
    <Flex
      gap="xs"
      alignItems="flex-start"
      sx={{
        height: { base: "unset", lg: "48px" },
        minWidth: { base: "unset", lg: "242px" },
        marginRight: "xs",
        marginTop: { base: "xs", lg: "unset" },
      }}
    >
      <Icon marginTop="xxs" name={icon} size="medium" paddingTop="0" />
      <Text
        size="body1"
        sx={{
          fontWeight: "500",
          marginBottom: 0,
        }}
      >
        {text}
      </Text>
    </Flex>
  )
}

export default SettingsLabel
