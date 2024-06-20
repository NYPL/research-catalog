import { Tabs, Text } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { useState } from "react"

import AccountSettingsTab from "./Settings/AccountSettingsTab"
import CheckoutsTab from "./CheckoutsTab/CheckoutsTab"
import RequestsTab from "./RequestsTab/RequestsTab"
import FeesTab from "./FeesTab/FeesTab"
import type {
  Checkout,
  Patron,
  Hold,
  Fine,
  SierraCodeName,
} from "../../types/myAccountTypes"

interface ProfileTabsPropsType {
  patron: Patron
  checkouts: Checkout[]
  holds: Hold[]
  fines: Fine
  activePath: string
  pickupLocations: SierraCodeName[]
}

const ProfileTabs = ({
  pickupLocations,
  checkouts,
  holds,
  patron,
  fines,
  activePath,
}: ProfileTabsPropsType) => {
  // currentHolds is a copy of the holds local to this component.
  const [currentHolds, setCurrentHolds] = useState(holds)
  /* removeHold removes the passed hold from currentHolds, so page doesn't need to
   * reload for the request to disappear. */
  function removeHold(hold: Hold) {
    setCurrentHolds(currentHolds.filter((item) => item.id !== hold.id))
  }
  function updateHoldLocation(
    holdIdToUpdate: string,
    location: SierraCodeName
  ) {
    setCurrentHolds(
      currentHolds.map((hold) => {
        if (hold.id === holdIdToUpdate) {
          hold.pickupLocation = location
        }
        return hold
      })
    )
  }
  // tabsData conditionally includes fines– only when user has total fines more than $0.
  const tabsData = [
    {
      label: "Checkouts" + (checkouts ? ` (${checkouts.length})` : ""),
      content: checkouts ? (
        <CheckoutsTab checkouts={checkouts} patron={patron} />
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
        <RequestsTab
          pickupLocations={pickupLocations}
          updateHoldLocation={updateHoldLocation}
          removeHold={removeHold}
          holds={currentHolds}
          patron={patron}
        />
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
      content: (
        <AccountSettingsTab
          pickupLocations={pickupLocations}
          settingsData={patron}
        />
      ),
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
