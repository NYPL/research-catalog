import {
  Link as DSLink,
  type LinkVariants,
} from "@nypl/design-system-react-components"
import NextLink from "next/link"
import { type ReactNode } from "react"

interface LinkProps {
  isExternal?: boolean
  active?: boolean
  href?: string
  children: ReactNode
  className?: string
  variant?: LinkVariants
  fontSize?: string | Record<string, string>
  isUnderlined?: boolean
  hasWhiteFocusRing?: boolean
  disabled?: boolean
  target?: "_blank" | "_parent" | "_self" | "_top"
  [key: string]: any
}

/**
 * Our Link wraps the DS Link and its accompanying styles:
 * - Internal links use Next.js routing (`as={NextLink}`) so basePath works
 * - External links render a normal anchor
 */
const Link = ({
  isExternal = false,
  className,
  href = "",
  children,
  active = false,
  hasWhiteFocusRing = false,
  disabled,
  target,
  ...rest
}: LinkProps) => {
  const commonProps = {
    className,
    href,
    fontWeight: active ? "bold" : undefined,
    hasVisitedState: false,
    tabIndex: disabled ? -1 : undefined,
    "aria-disabled": disabled || undefined,
    __css: hasWhiteFocusRing && {
      _focus: { outlineColor: "ui.white" },
    },
    ...rest,
  }

  return isExternal ? (
    <DSLink
      target={target || "_blank"}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      whiteSpace="unset"
      {...commonProps}
    >
      {children}
    </DSLink>
  ) : (
    <DSLink as={NextLink} {...commonProps}>
      {children}
    </DSLink>
  )
}

export default Link
