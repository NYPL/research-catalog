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
            label: `Fines ($${fines.total.toFixed(2)})`,
            content: "",
            urlPath: "fines",
          },
        ]
      : []),
    {
      label: "Account settings",
      content: "",
      urlPath: "settings",
    },
  ]
  // If page passes a path, set that tab. Otherwise, set to checkouts tab.
  const [activeTab, setActiveTab] = useState(
    activePath ? tabsData.findIndex((tab) => tab.urlPath === activePath) : 0
  )

  const router = useRouter()

  const updatePath = (newPath) => {
    router.push(`/account/${newPath}`, undefined, {
      shallow: true,
    })
  }
  const updateTabs = (newPath) => {
    setActiveTab(tabsData.findIndex((tab) => tab.urlPath === newPath))
  }

  // On path change, update tabs.
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
        // Update path when tab changes.
        updatePath(tabsData[index].urlPath)
      }}
      tabsData={tabsData}
    />
  )
}

export default ProfileTabs
