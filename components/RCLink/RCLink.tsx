import { Link as DSLink } from "@nypl/design-system-react-components"
import Link from "next/link"
import { type ReactNode } from "react"

interface RCLinkProps {
  active?: boolean
  href: string
  children: ReactNode
}

/**
 * The RCLink component is a utility that wraps the design system Link component with
 * Next's Link component to allow for correct navigation in Next per the design system's
 * docs. It also includes an 'active' prop used for styling the SubNav component.
 */
const RCLink = ({ href, children, active = false, ...rest }: RCLinkProps) => {
  return (
    <Link href={href} passHref {...rest}>

      <DSLink fontWeight={active && "bold"}>{children}</DSLink>
    </Link>
  )
}

export default RCLink
