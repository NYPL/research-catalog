import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Icon,
  SubNav,
  SubNavButton,
  SubNavLink,
  Text,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { useMode } from "../../context/ModeContext"

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
  const router = useRouter()
  const { mode, setMode } = useMode()

  const searchSelected =
    mode === "search" &&
    (activePage === "" || activePage === "search" || activePage === "advanced")

  const browseSelected =
    mode === "browse" &&
    (activePage === "" ||
      activePage === "browse" ||
      activePage === "sh-results")

  return (
    <SubNav
      className="no-print"
      actionBackgroundColor="section.research.primary-05"
      highlightColor="section.research.secondary"
      aria-label="Research Catalog main menu"
      primaryActions={
        <>
          <SubNavButton
            onClick={() => {
              setMode("search")
              if (router.pathname !== "/") {
                router.push("/")
              }
            }}
            id="subnav-search"
            isSelected={searchSelected}
            aria-current={searchSelected ? "page" : undefined}
          >
            Search the Catalog
          </SubNavButton>
          <SubNavButton
            onClick={() => {
              setMode("browse")
              if (router.pathname !== "/") {
                router.push("/")
              }
            }}
            id="subnav-browse"
            isSelected={browseSelected}
            aria-current={browseSelected ? "page" : undefined}
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
          <SubNavButton
            onClick={() => {
              setMode("")
              router.push("/account")
            }}
            isOutlined
            id="subnav-account"
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
          </SubNavButton>
        </>
      }
    />
  )
}

export default RCSubNav
