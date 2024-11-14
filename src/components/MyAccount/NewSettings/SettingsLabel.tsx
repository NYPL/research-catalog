import { Flex, Icon, Text } from "@nypl/design-system-react-components"

const SettingsLabel = ({ icon, text }) => {
  return (
    <Flex
      gap="xs"
      minHeight="48px"
      alignItems="flex-start"
      sx={{
        minWidth: { base: "unset", lg: "256px" },
        marginRight: "xs",
        paddingTop: "xs",
      }}
    >
      <Icon marginTop="xxs" name={icon} size="medium" />
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
