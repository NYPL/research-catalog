import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Icon,
  SubNav,
  SubNavLink,
  Text,
} from "@nypl/design-system-react-components"

interface SubNavProps {
  activePage: RCPage
  isAuthenticated?: boolean
}

/**
 * The RCSubNav component renders the primary Research Catalog menu
 * and passes the active prop to the correct link based on the route.
 */
const RCSubNav = ({ activePage, isAuthenticated }: SubNavProps) => {
  const logoutLink = useLogoutRedirect()

  return (
    <SubNav
      className="no-print"
      actionBackgroundColor="section.research.primary-05"
      highlightColor="section.research.secondary"
      aria-label="Research Catalog main menu"
      primaryActions={
        <>
          <SubNavLink
            href="/research/research-catalog/"
            id="subnav-search"
            isSelected={activePage === "search" || activePage === "advanced"}
            aria-current={
              activePage === "search" || activePage === "advanced"
                ? "page"
                : undefined
            }
          >
            Search the Catalog
          </SubNavLink>
          <SubNavLink
            href="/research/research-catalog/subject_headings"
            id="subnav-browse"
            isSelected={activePage === "shep"}
            aria-current={activePage === "shep" ? "page" : undefined}
          >
            Subject Heading Explorer
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <div style={{ display: isAuthenticated ? "flex" : "none" }}>
            <SubNavLink
              href={logoutLink}
              id="subnav-logout"
              screenreaderOnlyText="of NYPL.org"
            >
              Log out
            </SubNavLink>
          </div>
          <SubNavLink
            href="/research/research-catalog/account"
            id="subnav-account"
            isOutlined
            isSelected={activePage === "account"}
            aria-current={activePage === "account" ? "page" : undefined}
            screenreaderOnlyText="for NYPL.org"
          >
            <Icon name="actionIdentityFilled" size="medium" />
            <Text
              __css={{
                display: "none",
                ["@media screen and (min-width: 600px)"]: {
                  display: "flex",
                },
              }}
            >
              My account
            </Text>
          </SubNavLink>
        </>
      }
    />
  )
}

export default RCSubNav
