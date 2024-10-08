import { Text } from "@nypl/design-system-react-components"
import ExternalLink from "./Links/ExternalLink/ExternalLink"
import React from "react"

/**
 * Renders an EDS link.
 */
const EDSLink = () => {
  return (
    <Text size="body2" className="eds-link" m="0">
      <span style={{ color: "var(--nypl-colors-ui-success-primary)" }}>
        New!
      </span>{" "}
      Try our{" "}
      <ExternalLink href="https://discovery.ebsco.com/c/tvrejk?acr_values=guest">
        <strong>Article Search</strong>
      </ExternalLink>{" "}
      to discover online journals, books, and more from home with your library
      card.
    </Text>
  )
}

export default EDSLink
