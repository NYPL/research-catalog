import { Tabs } from "@nypl/design-system-react-components"
import type { Patron, Checkout, Fine, Hold } from "../../types/accountTypes"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

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
  // tabsData conditionally includes fines– only when user has total fines more than $0.
  const tabsData = [
    {
      label: "Checkouts",
      content: "",
      urlPath: "checkouts",
    },
    {
      label: "Requests",
      content: "",
      urlPath: "requests",
    },
    ...(fines?.total > 0
      ? [
          {
            label: `Fees ($${fines.total.toFixed(2)})`,
            content: "",
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
