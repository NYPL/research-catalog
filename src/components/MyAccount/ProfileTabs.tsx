import { Tabs, Text } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import CheckoutsTab from "./CheckoutsTab/CheckoutsTab"
import RequestsTab from "./RequestsTab/RequestsTab"
import FeesTab from "./FeesTab/FeesTab"
import { PatronDataContext } from "../../context/PatronDataContext"
import { useContext } from "react"
import AccountSettingsTab from "./Settings/AccountSettingsTab"

interface ProfileTabsPropsType {
  activePath: string
}

const ProfileTabs = ({ activePath }: ProfileTabsPropsType) => {
  const {
    updatedAccountData: { checkouts, holds, fines },
  } = useContext(PatronDataContext)
  // tabsData conditionally includes fines– only when user has total fines more than $0.
  const tabsData = [
    {
      label: "Checkouts" + (checkouts ? ` (${checkouts.length})` : ""),
      content: checkouts ? (
        <CheckoutsTab />
      ) : (
        <Text sx={{ mt: "s" }}>
          There was an error accessing your checkouts.
        </Text>
      ),
      urlPath: "items",
    },
    {
      label: "Requests" + (holds ? ` (${holds.length})` : ""),
      content: holds ? (
        <RequestsTab />
      ) : (
        <Text sx={{ mt: "s" }}>There was an error accessing your requests</Text>
      ),
      urlPath: "requests",
    },
    ...(fines?.total > 0
      ? [
          {
            label: `Fees ($${fines.total.toFixed(2)})`,
            content: <FeesTab fines={fines} />,
            urlPath: "overdues",
          },
        ]
      : []),
    {
      label: "Account settings",
      content: <AccountSettingsTab />,
      urlPath: "settings",
    },
  ]
  const tabsDict =
    fines?.total > 0
      ? { items: 0, requests: 1, overdues: 2, settings: 3 }
      : { items: 0, requests: 1, settings: 2 }

  const router = useRouter()

  const updatePath = (newPath) => {
    router.push(`/account/${newPath}`, undefined, {
      shallow: true,
    })
  }

  return (
    <Tabs
      defaultIndex={tabsDict[activePath] || 0}
      id="tabs-id"
      onChange={(index) => {
        // Update path when tab changes.
        updatePath(tabsData[index].urlPath)
      }}
      tabsData={tabsData}
      sx={{
        "div[role=tabpanel]": { padding: 0 },
        marginBottom: "xxl",
      }}
    />
  )
}

export default ProfileTabs
