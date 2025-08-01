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
  isUnderlined?: boolean
  disabled?: boolean
  [key: string]: any
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
  disabled = false,
  ...rest
}: ExternalLinkProps) => {
  return (
    <DSLink
      href={href}
      className={className}
      hasVisitedState={false}
      target={target}
      {...rest}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled || undefined}
      // TODO: Temporary fix for a DS issue where link text spills outside the parent container
      whiteSpace="unset"
    >
      {children}
    </DSLink>
  )
}

export default ExternalLink
