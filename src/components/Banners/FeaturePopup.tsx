import { Text, Box, Flex } from "@nypl/design-system-react-components"
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

  const closeHandler = () => {
    setIsVisible(false)
    const expirationDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toUTCString()
    document.cookie = `seen${id}=true; expires=${expirationDate}; `
  }

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
          bottom: "-7px",
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
        {/* span avoids SubNav's a and button style rules which use !important.
            This is specific to the User Guide popup, and after that is removed,
            this span should be changed back to a link or button  */}
        <span
          role="button"
          tabIndex={0}
          style={{
            cursor: "pointer",
          }}
          onClick={closeHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              closeHandler()
            }
          }}
        >
          <Text
            color="ui.typography.inverse.heading"
            fontSize="14px"
            fontWeight="bold"
            textDecoration="underline solid 1px"
            textUnderlineOffset="2px"
          >
            Got it
          </Text>
        </span>
      </Flex>
    </Box>
  )
}
