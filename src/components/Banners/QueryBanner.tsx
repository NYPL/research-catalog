import { Text, Box, Link, Flex } from "@nypl/design-system-react-components"
import { useState } from "react"

export const QueryBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Box
      sx={{
        background: "ui.gray.xx-dark",
        borderRadius: "md",
        zIndex: "100",
        padding: "s",
        marginTop: "xs",
        marginBottom: "xs",
        width: "300px",
        boxShadow: "2px 4px 4px 0px rgba(0, 0, 0, 0.2)",
        position: "relative",
        _before: {
          content: '""',
          position: "absolute",
          top: "-8px",
          left: "140px",
          marginTop: "2px",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid",
          borderBottomColor: "ui.gray.xx-dark",
        },
      }}
    >
      <Text
        marginBottom="xxs"
        size="body2"
        fontWeight="bold"
        color="ui.typography.inverse.heading"
      >
        <Text
          as="span"
          marginBottom="xxs"
          size="body2"
          fontWeight="bold"
          color="dark.ui.success.secondary"
        >
          New!
        </Text>{" "}
        Search using queries
      </Text>
      <Text
        marginBottom="0"
        size="body2"
        fontWeight="medium"
        color="ui.typography.inverse.heading"
      >
        You can now search with more precision and control using boolean
        operators against a wide set of fields- check it out in the menu.
      </Text>
      <Flex flexDir="row" justifyContent="flex-end">
        <Link
          href="#"
          color="ui.typography.inverse.heading"
          fontSize="14px"
          fontWeight="bold"
          onClick={(e) => {
            e.preventDefault()
            setIsVisible(false)
          }}
          sx={{
            textDecoration: "underline solid 1px",
            textUnderlineOffset: "2px",
          }}
        >
          Got it
        </Link>
      </Flex>
    </Box>
  )
}
