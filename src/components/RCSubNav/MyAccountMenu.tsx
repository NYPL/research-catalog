import type { RCPage } from "../../types/pageTypes"
import { Menu, MenuButton, MenuList, MenuItem, Portal } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Box, Flex, Icon } from "@nypl/design-system-react-components"
import { useFocusContext } from "../../context/FocusContext"
import {
  applyFocusAfterRedirect,
  useLogoutRedirect,
} from "../../hooks/useAuthRedirect"

interface MyAccountMenuProps {
  activePage: RCPage
}

const myAccountMenuId = "my-account-menu"
// Based on Chakra menu id
export const myAccountMenuButtonId = `menu-button-${myAccountMenuId}`

/**
 * Renders a dropdown navigation menu for My Account.
 * Uses Chakra Menu with DS Menu styles, and the MenuButton is styled as a DS SubNavButton.
 */
const MyAccountMenu = ({ activePage }: MyAccountMenuProps) => {
  const router = useRouter()
  const { setPersistentFocus } = useFocusContext()

  // Focus the My Account button upon returning from the login redirect
  useEffect(() => {
    applyFocusAfterRedirect(setPersistentFocus, myAccountMenuButtonId)
  }, [setPersistentFocus])

  const updatePath = (newPath, index) => {
    const tabUrl = `/account${newPath && `/${newPath}`}`
    const searchParams = new URLSearchParams()
    searchParams.set("focus", `tabs-tabs-id--tab-${index}`)
    router.push(`${tabUrl}?${searchParams.toString()}`)
  }

  const currentAccountTab =
    activePage === "account" ? router.asPath.split("/")[2] ?? "" : undefined

  const tabsLabels = [
    { path: "", label: "Profile" },
    { path: "items", label: "Checkouts" },
    { path: "requests", label: "Requests" },
    { path: "lists", label: "Lists" },
    { path: "overdues", label: "Fees" },
  ]

  const logoutLink = useLogoutRedirect()

  // Styles from DS Menu
  const menuItemBaseStyle = {
    fontSize: "desktop.body.body2",
    fontWeight: "body.body2",
    lineHeight: "1.5",
    outline: "none !important",
    paddingX: "s",
    paddingY: "xs",
    textColor: "ui.typography.body",
    _hover: {
      bg: "ui.bg.hover",
      fontWeight: "medium",
    },
    _focus: {
      bg: "ui.bg.hover",
      fontWeight: "medium",
    },
  }

  return (
    <Menu placement="bottom-end" id={myAccountMenuId}>
      <MenuButton
        className={activePage === "account" ? "ds-subNav-selectedItem" : ""}
        aria-current={activePage === "account" ? "page" : undefined}
        sx={{
          border: "1px solid",
          borderRadius: "6px",
        }}
      >
        <Flex alignItems="center">
          <Icon name="actionIdentityFilled" size="medium" />
          <Box as="span" display={{ base: "none", md: "inline" }} ml="xxs">
            {"My account"}
          </Box>
        </Flex>
      </MenuButton>
      {/* Portal to escape SubNav component styling */}
      <Portal>
        <MenuList
          zIndex="10000" // To stack over Tabs arrow buttons (zIndex 9999)
          sx={{
            minWidth: "200px",
            outline: "0px",
            maxWidth: "300px",
            padding: "0px",
            borderRadius: "2px",
            border: "1px solid",
            borderColor: "ui.gray.light-cool",
            boxShadow: "none",
            overflowY: "auto",
            maxHeight: "320px",
          }}
        >
          {tabsLabels.map(({ path, label }, index) => {
            return (
              <MenuItem
                key={label.toLowerCase()}
                sx={{
                  ...menuItemBaseStyle,
                  ...(currentAccountTab === path && {
                    fontWeight: "medium",
                    borderLeftColor: "dark.ui.border.default",
                    borderWidth: "0px 0px 0px 2px",
                    background: "ui.bg.default",
                    textColor: "ui.typography.heading",
                  }),
                }}
                onClick={() => {
                  updatePath(path, index)
                }}
              >
                {label}
              </MenuItem>
            )
          })}
          <MenuItem
            sx={{
              ...menuItemBaseStyle,
              textColor: "ui.error.primary",
            }}
            onClick={() => router.push(logoutLink)}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default MyAccountMenu
