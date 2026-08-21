import { Tabs, Text } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import CheckoutsTab from "./CheckoutsTab/CheckoutsTab"
import RequestsTab from "./RequestsTab/RequestsTab"
import FeesTab from "./FeesTab/FeesTab"
import { PatronDataContext } from "../../context/PatronDataContext"
import { useContext } from "react"
import ListsTab from "./ListsTab/ListsTab"
import ProfileTab from "./ProfileTab"

interface ProfileTabsPropsType {
  activePath: string
}

const ProfileTabs = ({ activePath }: ProfileTabsPropsType) => {
  const {
    updatedAccountData: { checkouts, holds, fines, lists },
  } = useContext(PatronDataContext)
  const tabsData = [
    {
      label: "Profile",
      content: (
        <>
          <ProfileTab />
        </>
      ),
    },
    {
      label: "Checkouts" + (checkouts ? ` (${checkouts.length})` : ""),
      content: checkouts ? (
        <CheckoutsTab />
      ) : (
        <Text sx={{ mt: "m" }}>
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
        <Text sx={{ mt: "m" }}>
          There was an error accessing your requests.
        </Text>
      ),
      urlPath: "requests",
    },
    {
      label: "Lists" + (lists ? ` (${lists.length})` : ""),
      content: lists ? (
        <ListsTab />
      ) : (
        <Text sx={{ mt: "m" }}>There was an error accessing your lists.</Text>
      ),
      urlPath: "lists",
    },
    {
      label: `Fees ($${fines ? fines.total.toFixed(2) : "$0.00"})`,
      content:
        fines?.total > 0 ? (
          <FeesTab fines={fines} />
        ) : (
          <Text sx={{ mt: "m" }}>You have no fees due at this time.</Text>
        ),
      urlPath: "overdues",
    },
  ]
  const tabsDict = { items: 1, requests: 2, lists: 3, overdues: 4 }

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
        updatePath(tabsData[index].urlPath ?? "")
      }}
      tabsData={tabsData}
      sx={{
        "div[role=tabpanel]": { padding: 0 },
        marginBottom: "l",
      }}
    />
  )
}

export default ProfileTabs
