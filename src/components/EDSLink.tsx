import { Text } from "@nypl/design-system-react-components"
import ExternalLink from "./Links/ExternalLink/ExternalLink"
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
      <ExternalLink href="https://research.ebsco.com/c/2styhb">
        <strong>Article Search</strong>
      </ExternalLink>{" "}
      to discover online journals, books, and more from home with your library
      card.
    </Text>
  )
}

export default EDSLink
