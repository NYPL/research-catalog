import { Box, Text, Link as DSLink } from "@nypl/design-system-react-components"
import React from "react"

import styles from "../../styles/components/Search.module.scss"

/**
 * Renders a simple link to log out the user out from the Catalog.
 */
const EDSLink = () => {
  return (
    <Box className={styles.edsLink} mt="0" mb="0">
      <Text size="body2" className="eds-link">
        <span style={{ color: "var(--nypl-colors-ui-success-primary)" }}>
          New!
        </span>
        {" spaghetti"}
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
