import { Tabs, Text } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import CheckoutsTab from "./CheckoutsTab/CheckoutsTab"
import RequestsTab from "./RequestsTab/RequestsTab"
import FeesTab from "./FeesTab/FeesTab"
import { PatronDataContext } from "../../context/PatronDataContext"
import { useContext, useEffect } from "react"
import ListsTab from "./ListsTab/ListsTab"
import ProfileTab from "./ProfileTab"
import { MyAccountTabsErrorBanner } from "./MyAccountTabsErrorBanner"
import { useFocusContext } from "../../context/FocusContext"
import { applyFocusAfterRedirect } from "../../hooks/useAuthRedirect"
import { myAccountTabsData } from "../../utils/myAccountUtils"

interface MyAccountTabsPropsType {
  activePath: string
}

const MyAccountTabs = ({ activePath }: MyAccountTabsPropsType) => {
  const {
    updatedAccountData: { checkouts, holds, fines, lists },
  } = useContext(PatronDataContext)
  const tabsData = myAccountTabsData.map(({ key, label, urlPath }) => {
    switch (key) {
      case "profile":
        return { label, content: <ProfileTab />, urlPath }
      case "items":
        return {
          label: label + (checkouts ? ` (${checkouts.length})` : ""),
          content: checkouts ? (
            <CheckoutsTab />
          ) : (
            <MyAccountTabsErrorBanner tabLabel="checkouts" />
          ),
          urlPath,
        }
      case "requests":
        return {
          label: label + (holds ? ` (${holds.length})` : ""),
          content: holds ? (
            <RequestsTab />
          ) : (
            <MyAccountTabsErrorBanner tabLabel="requests" />
          ),
          urlPath,
        }
      case "lists":
        return {
          label: label + (lists ? ` (${lists.length})` : ""),
          content: lists ? (
            <ListsTab />
          ) : (
            <MyAccountTabsErrorBanner tabLabel="lists" />
          ),
          urlPath,
        }
      case "overdues":
        return {
          label: `${label} ($${fines ? fines.total.toFixed(2) : "$0.00"})`,
          content:
            fines?.total > 0 ? (
              <FeesTab fines={fines} />
            ) : (
              <Text sx={{ mt: "m" }}>You have no fees due at this time.</Text>
            ),
          urlPath,
        }
    }
  })
  const router = useRouter()
  // Get tabs path from url without search params (e.g. focus)
  const currentPath =
    router.asPath.split("/")[2]?.split(/[?#]/)[0] ?? activePath ?? "profile"
  const defaultIndex = myAccountTabsData.findIndex(
    ({ key }) => key === currentPath
  )

  const { setPersistentFocus } = useFocusContext()

  useEffect(() => {
    applyFocusAfterRedirect(setPersistentFocus)
  }, [setPersistentFocus, router.asPath])

  const updatePath = (newPath) => {
    router.push(`/account/${newPath}`, undefined, {
      shallow: true,
    })
  }

  return (
    <Tabs
      defaultIndex={defaultIndex}
      id="tabs-id"
      onChange={(index) => {
        // Update path when tab changes.
        updatePath(tabsData[index].urlPath)
      }}
      tabsData={tabsData}
      sx={{
        "div[role=tabpanel]": { padding: 0 },
        marginBottom: "l",
      }}
    />
  )
}

export default MyAccountTabs
