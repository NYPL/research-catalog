import SubNavLink from "@/components/SubNav/SubNavLink"
import styles from "@/styles/components/SubNav.module.scss"
import { useRouter } from "next/router"

/**
 * The SubNav component renders the primary Research Catalog menu
 * and passes the active prop to the correct link based on the route.
 */
const SubNav = () => {
  const router = useRouter()

  return (
    <nav className={styles.subNav} aria-label="Research Catalog main menu">
      <ul>
        <li>
          <SubNavLink href="/" active={router.pathname === "/"}>
            Search
          </SubNavLink>
        </li>
        <li>
          <SubNavLink
            href="/subject_headings"
            active={router.pathname.includes("/subject_headings")}
          >
            Subject Heading Explorer
          </SubNavLink>
        </li>
        <li>
          <SubNavLink
            href="/account"
            active={router.pathname.includes("/account")}
          >
            My Account
          </SubNavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SubNav
