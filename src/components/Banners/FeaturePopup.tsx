import { Text, Box, Link, Flex } from "@nypl/design-system-react-components"
import { useState, useEffect } from "react"

export const FeaturePopup = ({
  id,
  title,
  content,
  pointerRight = "150px",
}: {
  id: string
  title: string
  content: string
  pointerRight?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!document.cookie.includes(`seen${id}=true`)) {
      setIsVisible(true)
    }
  }, [])

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
          bottom: "-8px",
          right: pointerRight,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid",
          borderTopColor: "ui.gray.xx-dark",
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
        {title}
      </Text>
      <Text
        marginBottom="0"
        size="body2"
        fontWeight="medium"
        color="ui.typography.inverse.heading"
      >
        {content}
      </Text>
      <Flex flexDir="row" justifyContent="flex-end" mt="s">
        <Link
          href="#"
          color="ui.typography.inverse.heading !important"
          isUnderlined
          fontSize="14px"
          fontWeight="bold"
          onClick={(e) => {
            e.preventDefault()
            setIsVisible(false)
            const expirationDate = new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ).toUTCString()
            document.cookie = `seen${id}=true; expires=${expirationDate}; `
          }}
          sx={{
            textDecoration: "underline solid 1px !important",
            textUnderlineOffset: "2px",
          }}
        >
          Got it
        </Link>
      </Flex>
    </Box>
  )
}
