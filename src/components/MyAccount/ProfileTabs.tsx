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
  // tabsData and tabsDict conditionally include fines– only when user has a total more than $0.
  const tabsData = [
    {
      label: "Checkouts",
      content: "",
    },
    {
      label: "Requests",
      content: "",
    },
    ...(fines.total > 0
      ? [
          {
            label: `Fines ($${fines.total.toFixed(2)})`,
            content: "",
          },
        ]
      : []),
    {
      label: "Account settings",
      content: "",
    },
  ]
  const tabsDict =
    fines.total > 0
      ? { checkouts: 0, requests: 1, fines: 2, settings: 3 }
      : { checkouts: 0, requests: 1, settings: 2 }

  // If page passes a path, set that tab. Otherwise, set to checkouts tab.
  const [activeTab, setActiveTab] = useState(
    activePath ? tabsDict[activePath] : 0
  )

  const router = useRouter()

  const updatePath = (newPath) => {
    router.push(`/account/${newPath.toLowerCase()}`, undefined, {
      shallow: true,
    })
  }
  const updateTabs = (newPath) => {
    setActiveTab(tabsDict[newPath])
  }

  // On url change, update tabs.
  useEffect(() => {
    const handleRouteChange = (url) => {
      const path = url.split("/")[4]
      updateTabs(path)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return (
    <Tabs
      defaultIndex={activeTab}
      id="tabs-id"
      onChange={(index) => {
        let label = tabsData[index].label.toLowerCase()
        // Parse label into url path.
        if (label.startsWith("account")) {
          label = "settings"
        }
        if (label.startsWith("fines") && !(fines.total > 0)) {
          label = "checkouts"
        } else if (label.startsWith("fines")) {
          label = "fines"
        }
        //Update path when tab changes.
        updatePath(label)
      }}
      tabsData={tabsData}
    />
  )
}

export default ProfileTabs
