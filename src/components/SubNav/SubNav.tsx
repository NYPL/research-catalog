import RCLink from "../Links/RCLink/RCLink"
import styles from "../../../styles/components/SubNav.module.scss"
import { type RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
interface SubNavProps {
  activePage: RCPage
  isAuthenticated?: boolean
}

/**
 * The SubNav component renders the primary Research Catalog menu
 * and passes the active prop to the correct link based on the route.
 */
const SubNav = ({ activePage, isAuthenticated }: SubNavProps) => {
  const logoutLink = useLogoutRedirect()
  return (
    <nav className={styles.subNav} aria-label="Research Catalog main menu">
      <ul>
        <li>
          <RCLink
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
        {/*<li>*/}
        {/*  <RCLink*/}
        {/*    href="/account"*/}
        {/*    active={activePage === "account"}*/}
        {/*    aria-current={activePage === "account" ? "page" : undefined}*/}
        {/*    hasWhiteFocusRing*/}
        {/*  >*/}
        {/*    My Account*/}
        {/*  </RCLink>*/}
        {/*</li>*/}
        {/*{isAuthenticated && (*/}
        {/*  <li>*/}
        {/*    <RCLink href={logoutLink} includeBaseUrl={false}>*/}
        {/*      Log Out*/}
        {/*    </RCLink>*/}
        {/*  </li>*/}
        {/*)}*/}
      </ul>
    </nav>
  )
}

export default SubNav
