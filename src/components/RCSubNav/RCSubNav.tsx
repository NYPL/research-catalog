import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Box,
  Icon,
  SubNav,
  SubNavLink,
  useNYPLBreakpoints,
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
  const { isLargerThanSmallMobile, isLargerThanLargeMobile } =
    useNYPLBreakpoints()

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
            Search{isLargerThanSmallMobile && " the Catalog"}
          </SubNavLink>

          <SubNavLink
            href="/browse"
            as={NextLink}
            id="subnav-browse"
            isSelected={inBrowse}
            aria-current={inBrowse ? "page" : undefined}
          >
            Browse{isLargerThanSmallMobile && " the Catalog"}
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <Box position="relative">
            <Box
              position="absolute"
              display="inline-flex"
              sx={{
                bottom: "100%",
                left: "65%",
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
              />
            </Box>
            <Link
              href="https://libguides.nypl.org/researchcatalog/"
              id="subnav-user-guide"
              isExternal
              borderRadius="6px"
            >
              <Icon name="actionLightbulb" size="medium" />
              {isLargerThanSmallMobile ? "User guide" : "Guide"}
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
            {isLargerThanLargeMobile &&
              (isAuthenticated ? "My account" : "Log in")}
          </SubNavLink>
        </>
      }
    />
  )
}

export default RCSubNav
