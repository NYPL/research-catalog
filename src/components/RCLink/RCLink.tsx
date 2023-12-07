import {
  Link as DSLink,
  type LinkTypes,
} from "@nypl/design-system-react-components"
import Link from "next/link"
import { type ReactNode } from "react"

interface RCLinkProps {
  active?: boolean
  href: string
  children: ReactNode
  className?: string
  color?: string
  type?: LinkTypes
}

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
  ...rest
}: RCLinkProps) => {
  return (
    <Link href={href} passHref>
      <DSLink className={className} fontWeight={active && "bold"} {...rest}>
        {children}
      </DSLink>
    </Link>
  )
}

export default RCLink
