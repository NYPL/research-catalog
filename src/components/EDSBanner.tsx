import { Text } from "@nypl/design-system-react-components"
import ExternalLink from "./Links/ExternalLink/ExternalLink"
import React from "react"
import RCBanner from "./Layout/RCBanner"

/**
 * Renders an EDS link.
 */
const EDSBanner = () => {
  return (
    <RCBanner
      type="informative"
      content={
        <Text>
          <span style={{ color: "var(--nypl-colors-ui-success-primary)" }}>
            New!
          </span>{" "}
          Try our{" "}
          <ExternalLink href="https://discovery.ebsco.com/c/tvrejk?acr_values=guest">
            <strong>Article Search</strong>
          </ExternalLink>{" "}
          to discover online journals, books, and more from home with your
          library card.
        </Text>
      }
    />
  )
}

export default EDSBanner
