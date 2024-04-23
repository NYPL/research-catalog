import {
  Link as DSLink,
  type LinkTypes,
} from "@nypl/design-system-react-components"
// import Link from "next/link"
import { type ReactNode } from "react"

interface RCLinkProps {
  active?: boolean
  href: string
  children: ReactNode
  className?: string
  color?: string
  type?: LinkTypes
  fontSize?: string | Record<string, string>
  fontWeight?: string
  isUnderlined?: boolean
  hasWhiteFocusRing?: boolean
  disabled?: boolean
  [key: string]: any
}

// TODO: once 2ad is phased out, replace with DS v3 Link which can wrap a
// next link.

/**
 * The RCLink component is a utility that wraps the design system Link component with
 * Next's Link component to allow for correct navigation in Next per the design system's
 * docs. It also includes an 'active' prop used for styling the SubNav component.
 */
const RCLink = ({
  className,
  href,
  children,
  active = false,
  hasWhiteFocusRing = false,
  disabled,
  ...rest
}: RCLinkProps) => {
  return (
    // <Link href={href} passHref>
    <DSLink
      href={href}
      className={className}
      fontWeight={active && "bold"}
      hasVisitedState={false}
      {...rest}
      __css={
        hasWhiteFocusRing && {
          _focus: {
            outlineColor: "ui.white",
          },
        }
      }
      // TODO: These were added in accessibility QA. Investigate adding these to the DS Link component.
      role="link"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </DSLink>
    // </Link>
  )
}

export default RCLink
