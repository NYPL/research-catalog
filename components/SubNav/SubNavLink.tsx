import { Link as DSLink } from "@nypl/design-system-react-components"
import Link from "next/link"
import type { ReactElement } from "react"

interface SubNavLinkProps {
  active?: boolean
  href: string
  children: string | ReactElement
}

const SubNavLink = ({ active = false, href, children }: SubNavLinkProps) => {
  return (
    <Link href={href} passHref>
      <DSLink fontWeight={active && 700}>{children}</DSLink>
    </Link>
  )
}

export default SubNavLink
