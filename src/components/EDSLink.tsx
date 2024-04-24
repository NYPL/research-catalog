import { Text, Link as DSLink } from "@nypl/design-system-react-components"
import React from "react"

/**
 * Renders a simple link to log out the user out from the Catalog.
 */
const EDSLink = () => {
  return (
    <Text size="body2" className="eds-link" m="0">
      <span style={{ color: "var(--nypl-colors-ui-success-primary)" }}>
        New!
      </span>{" "}
      Try our{" "}
      <DSLink
        href="https://research.ebsco.com/c/2styhb"
        target="_blank"
        hasVisitedState={false}
      >
        <strong>Article Search</strong>
      </DSLink>{" "}
      to discover online journals, books, and more from home with your library
      card.
    </Text>
  )
}

export default EDSLink
