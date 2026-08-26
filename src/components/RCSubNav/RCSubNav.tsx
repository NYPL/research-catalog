import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Box,
  Icon,
  SubNav,
  SubNavLink,
} from "@nypl/design-system-react-components"
import NextLink from "next/link"
import Link from "../Link/Link"
import { FeaturePopup } from "../Banners/FeaturePopup"

interface SubNavProps {
  activePage: RCPage
  inBrowse: boolean
  isAuthenticated?: boolean
}

/**
 * The RCSubNav component renders the primary Research Catalog menu
 * and passes the active prop to the correct link based on the route.
 */
const RCSubNav = ({ activePage, isAuthenticated, inBrowse }: SubNavProps) => {
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
            <Box as="span">
              Search{" "}
              <Box as="span" display={{ base: "none", sm: "inline" }}>
                {"the Catalog"}
              </Box>
            </Box>
          </SubNavLink>

          <SubNavLink
            href="/browse"
            as={NextLink}
            id="subnav-browse"
            isSelected={inBrowse}
            aria-current={inBrowse ? "page" : undefined}
          >
            <Box as="span">
              Browse{" "}
              <Box as="span" display={{ base: "none", sm: "inline" }}>
                {"the Catalog"}
              </Box>
            </Box>
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
          <Box position="relative">
            <Box
              position="absolute"
              display="inline-flex"
              sx={{
                bottom: "100%",
                left: { base: "0%", sm: "10%", md: "65%" },
                transform: "translateX(-50%)",
                zIndex: "100",
                textWrap: "wrap",
              }}
            >
              <FeaturePopup
                id="userGuidePopup"
                titleNew="New location!"
                titleUpdate="User guide"
                content="Read our user guide to learn more about using the Research Catalog and requesting research materials."
                pointerRight={{ base: "90px", sm: "75px", md: "150px" }}
              />
            </Box>
            <Link
              href="https://libguides.nypl.org/researchcatalog/"
              id="subnav-user-guide"
              isExternal
              borderRadius="6px"
            >
              <Icon name="actionLightbulb" size="medium" />
              <Box as="span" display={{ base: "none", sm: "inline" }}>
                User guide
              </Box>
              <Box as="span" display={{ base: "inline", sm: "none" }}>
                Guide
              </Box>
            </Link>
          </Box>
          <SubNavLink
            href="/account"
            as={NextLink}
            id="subnav-account"
            isOutlined
            isSelected={activePage === "account"}
            aria-current={activePage === "account" ? "page" : undefined}
            screenreaderOnlyText="for NYPL.org"
          >
            <Icon
              name={isAuthenticated ? "actionIdentityFilled" : "actionIdentity"}
              size="medium"
            />
            <Box as="span" display={{ base: "none", md: "inline" }}>
              {isAuthenticated ? "My account" : "Log in"}
            </Box>
          </SubNavLink>
        </>
      }
    />
  )
}

export default RCSubNav
