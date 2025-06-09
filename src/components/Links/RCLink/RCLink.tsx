import {
  Link as DSLink,
  type LinkTypes,
} from "@nypl/design-system-react-components"
import { type ReactNode } from "react"
import { BASE_URL } from "../../../config/constants"

interface RCLinkProps {
  active?: boolean
  href?: string
  children: ReactNode
  className?: string
  type?: LinkTypes
  fontSize?: string | Record<string, string>
  isUnderlined?: boolean
  hasWhiteFocusRing?: boolean
  disabled?: boolean
  [key: string]: any
  includeBaseUrl?: boolean
}

// TODO: once 2ad is phased out, replace with DS v3 Link which can wrap a
// Next link.

/**
 * The RCLink component is a utility that wraps the DS Link component with
 * Next's Link component to allow for correct navigation in Next per the design system's
 * docs. It also includes an 'active' prop used for styling the SubNav component.
 */
const RCLink = ({
  className,
  href = "",
  children,
  active = false,
  hasWhiteFocusRing = false,
  disabled,
  includeBaseUrl = true,
  ...rest
}: RCLinkProps) => {
  const resolvedHref = `${includeBaseUrl ? BASE_URL : ""}${href}`
  return (
    <DSLink
      href={resolvedHref}
      className={className}
      fontWeight={active && "bold"}
      hasVisitedState={false}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
      __css={
        hasWhiteFocusRing && {
          _focus: {
            outlineColor: "ui.white",
          },
        }
      }
    >
      {children}
    </DSLink>
  )
}

export default RCLink
