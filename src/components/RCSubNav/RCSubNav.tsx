import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Icon,
  SubNav,
  SubNavLink,
  Text,
} from "@nypl/design-system-react-components"
import NextLink from "next/link"

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
            href="/"
            id="subnav-search"
            as={NextLink}
            isSelected={
              activePage === "search" ||
              activePage === "advanced" ||
              activePage === ""
            }
            aria-current={
              activePage === "search" ||
              activePage === "advanced" ||
              activePage === ""
                ? "page"
                : undefined
            }
          >
            Search the Catalog
          </SubNavLink>
          <SubNavLink
            href="/browse"
            as={NextLink}
            id="subnav-browse"
            isSelected={activePage === "browse" || activePage === "sh-results"}
            aria-current={
              activePage === "browse" || activePage === "sh-results"
                ? "page"
                : undefined
            }
          >
            Browse the Catalog
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
            href="/account"
            as={NextLink}
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
