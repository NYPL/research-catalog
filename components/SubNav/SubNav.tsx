import RCLink from "../../components/RCLink/RCLink"
import styles from "../../styles/components/SubNav.module.scss"
import { type RCPage } from "../../config/types"

interface SubNavProps {
  activePage: RCPage
}

/**
 * The SubNav component renders the primary Research Catalog menu
 * and passes the active prop to the correct link based on the route.
 */
const SubNav = ({ activePage }: SubNavProps) => {
  return (
    <nav className={styles.subNav} aria-label="Research Catalog main menu">
      <ul>
        <li>
          <RCLink href="/" active={activePage === "search"}>
            Search
          </RCLink>
        </li>
        <li>
          <RCLink href="/subject_headings" active={activePage === "shep"}>
            Subject Heading Explorer
          </RCLink>
        </li>
        <li>
          <RCLink href="/account" active={activePage === "account"}>
            My Account
          </RCLink>
        </li>
      </ul>
    </nav>
  )
}

export default SubNav
