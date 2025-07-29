import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Icon,
  SubNav,
  SubNavButton,
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
          <SubNavButton
            onClick={activePage === "browse"}
            id="subnav-browse"
            isSelected={activePage === "browse" || activePage === "sh-results"}
            aria-current={
              activePage === "browse" || activePage === "sh-results"
                ? "page"
                : undefined
            }
          >
            Browse the Catalog
          </SubNavButton>
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
              noSpace
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
