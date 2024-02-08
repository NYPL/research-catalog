import RCLink from "../RCLink/RCLink"
import styles from "../../../styles/components/SubNav.module.scss"
import { type RCPage } from "../../types/pageTypes"
import { BASE_URL } from "../../config/constants"
import { appConfig } from "../../config/config"
import { useRouter } from "next/router"
import { Link } from "@nypl/design-system-react-components"
interface SubNavProps {
  activePage: RCPage
  isAuthenticated?: boolean
}

/**
 * The SubNav component renders the primary Research Catalog menu
 * and passes the active prop to the correct link based on the route.
 */
const SubNav = ({ activePage, isAuthenticated }: SubNavProps) => {
  const router = useRouter()
  const baseUrl = "/research/research-catalog"
  const logoutLink = `${appConfig.externalUrls.logout}`
  const currentUrl = router.asPath
  console.log("current url", currentUrl)
  let backLink = currentUrl
  // If the patron is on any hold or account page, then
  // redirect them to the home page after logging out.
  if (currentUrl.includes("hold") || currentUrl.includes("account")) {
    backLink = "http://local.nypl.org:8080/research/research-catalog"
  }
  const redirect = `${logoutLink}?redirect_uri=${backLink}`
  console.log("redirect link", redirect)
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
            href="/account"
            active={activePage === "account"}
            aria-current={activePage === "account" ? "page" : undefined}
            hasWhiteFocusRing
          >
            My Account
          </RCLink>
        </li>
        {isAuthenticated && (
          <li>
            <Link href={redirect}>Log out</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default SubNav
