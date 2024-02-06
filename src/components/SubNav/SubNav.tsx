import RCLink from "../RCLink/RCLink"
import styles from "../../../styles/components/SubNav.module.scss"
import { type RCPage } from "../../types/pageTypes"
import { BASE_URL } from "../../config/constants"

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
            href={BASE_URL}
            aria-current={
              activePage === "search" || activePage === "advanced"
                ? "page"
                : undefined
            }
            active={activePage === "search" || activePage === "advanced"}
            hasWhiteFocusRing
          >
            Search
          </RCLink>
        </li>
        <li>
          <RCLink
            href="/subject_headings"
            active={activePage === "shep"}
            aria-current={activePage === "shep" ? "page" : undefined}
            hasWhiteFocusRing
          >
            Subject Heading Explorer
          </RCLink>
        </li>
        <li>
          <RCLink
            href={BASE_URL + "/account"}
            active={activePage === "account"}
            aria-current={activePage === "account" ? "page" : undefined}
            hasWhiteFocusRing
          >
            My Account
          </RCLink>
        </li>
      </ul>
    </nav>
  )
}

export default SubNav
