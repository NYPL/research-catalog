import { Text, Flex, Heading, Icon } from "@nypl/design-system-react-components"
import Link from "../../Link/Link"

const EmptyList = () => {
  return (
    <Flex
      flexDir="column"
      marginTop="xxxl"
      marginBottom="xxl"
      marginLeft="l"
      marginRight="l"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Icon size="2xlarge">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="36"
          viewBox="0 0 28 36"
          fill="none"
        >
          <path
            d="M24 0C26.2 0 28 1.8 28 4V36L14 30L0 36V4C0 1.8 1.8 0 4 0H24ZM4 4V30L14 25.6396L24 30V4H4Z"
            fill="#0069BF"
          />
        </svg>
      </Icon>
      <Heading level="h2" mt="s" mb="xs" size="heading5">
        This list is currently empty
      </Heading>
      <Text mt="0" mb="0">
        <Link href="/">Search the Research Catalog</Link> to find and save
        records to lists
      </Text>
    </Flex>
  )
}

export default EmptyList
