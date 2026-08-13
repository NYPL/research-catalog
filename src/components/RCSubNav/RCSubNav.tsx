import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../server/auth"
import {
  Box,
  Icon,
  SubNav,
  SubNavLink,
  Text,
  Tooltip,
  useNYPLBreakpoints,
} from "@nypl/design-system-react-components"
import NextLink from "next/link"

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
            Search{isLargerThanLargeMobile && " the Catalog"}
          </SubNavLink>

          <SubNavLink
            href="/browse"
            as={NextLink}
            id="subnav-browse"
            isSelected={inBrowse}
            aria-current={inBrowse ? "page" : undefined}
          >
            Browse{isLargerThanLargeMobile && " the Catalog"}
          </SubNavLink>
        </>
      }
      secondaryActions={
        <>
          <Tooltip
            offset={[0, 4]}
            content={
              <Box
                display="flex"
                flexDir="column"
                alignItems="flex-start"
                paddingY="6px"
                gap="8px"
              >
                <Box>
                  <Text
                    as="span"
                    marginBottom="xxs"
                    size="body2"
                    fontWeight="bold"
                    color="dark.ui.success.secondary"
                  >
                    New location!
                  </Text>{" "}
                  <Text
                    as="span"
                    marginBottom="xxs"
                    size="body2"
                    fontWeight="bold"
                    color="white"
                  >
                    User guide
                  </Text>
                </Box>
                <Text
                  // marginBottom="0"
                  as="span"
                  size="body2"
                  fontWeight="regular"
                  color="ui.typography.inverse.heading"
                >
                  Read our user guide to learn more about using the Research
                  Catalog and requesting research materials.
                </Text>
              </Box>
            }
          >
            {/* <span> needed here for tooltip ref */}
            <span>
              <SubNavLink
                href="https://libguides.nypl.org/researchcatalog/"
                id="subnav-user-guide"
              >
                <Icon name="actionLightbulb" size="medium" />
                {isLargerThanSmallMobile ? "User guide" : "Guide"}
              </SubNavLink>
            </span>
          </Tooltip>
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
            {isLargerThanLargeMobile && "My account"}
          </SubNavLink>
        </>
      }
    />
  )
}

export default RCSubNav
