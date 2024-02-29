import { Tabs } from "@nypl/design-system-react-components"
import type { Patron, Checkout, Fine, Hold } from "../../types/accountTypes"
import { BASE_URL } from "../../config/constants"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const ProfileTabs = ({
  checkouts,
  holds,
  patron,
  fines,
  active,
}: {
  patron: Patron
  checkouts: Checkout[]
  holds: Hold[]
  fines: Fine
  active: string
}) => {
  const router = useRouter()
  const tabsFineDict = { settings: 3, requests: 1, checkouts: 0, fines: 2 }
  const tabsDict = { settings: 2, requests: 1, checkouts: 0 }
  const [activeTab, setActiveTab] = useState(active ? tabsDict[active] : 0)

  const tabsData = [
    {
      label: "Checkouts",
      content: "",
    },
    {
      label: "Requests",
      content: "",
    },
    {
      label: `Fines ($${fines?.total.toFixed(2)})`,
      content: "",
    },
    {
      label: "Account settings",
      content: "",
    },
  ]

  const updateRoute = (index) => {
    const tabData = tabsData[index]
    const label = tabData.label.toLowerCase()
    let newPath = `/account/${label}`

    if (label.startsWith("account")) {
      newPath = "/account/settings"
    } else if (label.startsWith("fines")) {
      // If no fines, force redirect to /checkouts.
      if (fines.total === 0) {
        newPath = "/account/checkouts"
      } else {
        newPath = "/account/fines"
      }
      router.push(newPath, undefined, { shallow: true })
      return index
    }
  }

  useEffect(() => {
    setActiveTab(updateRoute(activeTab))
  }, [])

  return (
    /* TO-DO: Check that mobile view tab updates from 
    https://github.com/NYPL/nypl-design-system/pull/1539 are as expected. */
    <Tabs
      defaultIndex={activeTab}
      id="tabs-id"
      onChange={(index) => {
        setActiveTab(updateRoute(index))
      }}
      // If no fines, don't display the fines tab.
      tabsData={
        fines.total === 0
          ? tabsData.filter(
              (tab) =>
                !tab.label.startsWith(`Fines ($${fines?.total.toFixed(2)})`)
            )
          : tabsData
      }
    />
  )
}

export default ProfileTabs
