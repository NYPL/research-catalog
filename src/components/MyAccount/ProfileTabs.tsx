import { Tabs } from "@nypl/design-system-react-components"
import type { Patron, Checkout, Fine, Hold } from "../../types/accountTypes"
import { useRouter } from "next/router"
import CheckoutsTab from "./CheckoutsTab/CheckoutsTab"
import RequestsTab from "./RequestsTab/RequestsTab"
import { useState } from "react"
import FeesTab from "./FeesTab/FeesTab"

const ProfileTabs = ({
  checkouts,
  holds,
  patron,
  fines,
  activePath,
}: {
  patron: Patron
  checkouts: Checkout[]
  holds: Hold[]
  fines: Fine
  activePath: string
}) => {
  // currentHolds is a copy of the holds local to this component.
  const [currentHolds, setCurrentHolds] = useState(holds)
  /* handleState removes the passed hold from currentHolds, so page doesn't need to
   * reload for the request to disappear. */
  function handleHoldsState(hold) {
    setCurrentHolds(
      currentHolds.reduce((acc, item) => {
        if (item.id !== hold.id) {
          acc.push(item)
        }
        return acc
      }, [])
    )
  }

  // tabsData conditionally includes fines– only when user has total fines more than $0.
  const tabsData = [
    {
      label: `Checkouts (${checkouts.length})`,
      content: <CheckoutsTab checkouts={checkouts} patron={patron} />,
      urlPath: "checkouts",
    },
    {
      label: `Requests (${currentHolds.length})`,
      content: (
        <RequestsTab
          handleHoldsState={handleHoldsState}
          holds={currentHolds}
          patron={patron}
        />
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
      content: "",
      urlPath: "settings",
    },
  ]
  const tabsDict =
    fines?.total > 0
      ? { checkouts: 0, requests: 1, fines: 2, settings: 3 }
      : { checkouts: 0, requests: 1, settings: 2 }
  const router = useRouter()

  const updatePath = (newPath) => {
    router.push(`/account/${newPath}`, undefined, {
      shallow: true,
    })
  }

  return (
    <Tabs
      sx={{ "div[role=tabpanel]": { padding: "0px" } }}
      defaultIndex={tabsDict[activePath] || 0}
      id="tabs-id"
      onChange={(index) => {
        // Update path when tab changes.
        updatePath(tabsData[index].urlPath)
      }}
      tabsData={tabsData}
    />
  )
}

export default ProfileTabs
