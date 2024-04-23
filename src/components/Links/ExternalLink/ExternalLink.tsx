import {
  Link as DSLink,
  type LinkTypes,
} from "@nypl/design-system-react-components"
import { type ReactNode } from "react"

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
  target?: "_blank" | "_parent" | "_self" | "_top"
  type?: LinkTypes
  fontSize?: string | Record<string, string>
  fontWeight?: string
  display?: string
  rel?: string
  mb?: string
  mt?: string
  lang?: string
  isUnderlined?: boolean
}

// TODO: once 2ad is phased out, replace with DS v3 Link which can wrap a
// next link.

/**
 * The ExternalLink component is a utility that renders a Design System link with some defaults
 * set for the Research Catalog to avoid duplication.
 */
const ExternalLink = ({
  className,
  href,
  children,
  target = "_blank",
  ...rest
}: ExternalLinkProps) => {
  return (
    <DSLink
      href={href}
      className={className}
      hasVisitedState={false}
      target={target}
      {...rest}
    >
      {children}
    </DSLink>
  )
}

export default ExternalLink
