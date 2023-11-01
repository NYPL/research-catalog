import { Box, Text, Link as DSLink } from "@nypl/design-system-react-components"
import React from "react"

/**
 * Renders a simple link to log out the user out from the Catalog.
 */
const EDSLink = () => {
  return (
    <Box mt="0" mb="0">
      <Text size="body1" className="eds-link">
        <span style={{ color: "var(--nypl-colors-ui-success-primary)" }}>
          New!
        </span>{" "}
        Try our{" "}
        <DSLink href="https://research.ebsco.com/c/2styhb" target="_blank">
          <strong>Article Search</strong>
        </DSLink>{" "}
        to discover online journals, books, and more from home with your library
        card.
      </Text>
    </Box>
  )
}

export default EDSLink
