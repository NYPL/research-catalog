import { Link as DSLink } from "@nypl/design-system-react-components"
import Link from "next/link"
import type { ReactElement } from "react"
import styles from "@/styles/components/SubNavLink.module.scss"

interface SubNavLinkProps {
  active?: boolean
  href: string
  children: string | ReactElement
}

const SubNavLink = ({ active, href, children }: SubNavLinkProps) => {
  return (
    <Link href={href} passHref>
      <DSLink className={active && styles.active}>{children}</DSLink>
    </Link>
  )
}

export default SubNavLink
