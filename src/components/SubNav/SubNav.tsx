import RCLink from "../RCLink/RCLink"
import styles from "../../../styles/components/SubNav.module.scss"
import { type RCPage } from "../../types/pageTypes"

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
          <RCLink
            href="/"
            aria-current={
              activePage === "search" || activePage === "advanced"
                ? "page"
                : undefined
            }
            active={activePage === "search" || activePage === "advanced"}
          >
            Search
          </RCLink>
        </li>
        <li>
          <RCLink
            href="/subject_headings"
            active={activePage === "shep"}
            aria-current={activePage === "shep" ? "page" : undefined}
          >
            Subject Heading Explorer
          </RCLink>
        </li>
        <li>
          <RCLink
            href="/account"
            active={activePage === "account"}
            aria-current={activePage === "account" ? "page" : undefined}
          >
            My Account
          </RCLink>
        </li>
      </ul>
    </nav>
  )
}

export default SubNav
