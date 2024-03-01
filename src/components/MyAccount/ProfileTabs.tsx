import { Tabs } from "@nypl/design-system-react-components"
import type { Patron, Checkout, Fine, Hold } from "../../types/myAccountTypes"
import { useRouter } from "next/router"
import { BASE_URL } from "../../config/constants"
import { useEffect } from "react"

const ProfileTabs = ({
  checkouts,
  holds,
  patron,
  fines,
}: {
  patron: Patron
  checkouts: Checkout[]
  holds: Hold[]
  fines: Fine
}) => {
  //   const router = useRouter()
  const onChange = (value) => {
    console.log(
      `local.nypl.org:8080${BASE_URL}/account/${tabsData[value].label}`
    )
  }
  //   console.log(
  //     `local.nypl.org:8080${BASE_URL}/account/${tabsData[value].label}`
  //   )
  //   router.push(
  //     `local.nypl.org:8080${BASE_URL}/account/${tabsData[value].label}`,
  //     undefined,
  //     {
  //       shallow: true,
  //     }
  //   )
  //   const query = { ...router.query, (tabsData[value].label) }

  //   router.push({ query, pathname: router.pathname }, undefined, {
  //     shallow: true,
  //   })
  //   }

  const tabsData = [
    {
      label: "Checkouts",
      content: "",
    },
    {
      label: "Requests",
      content: "",
    },
    fines.total > 0 && {
      label: `Fines ($${fines.total.toFixed(2)})`,
      content: "",
    },
    {
      label: "Account settings",
      content: "",
    },
  ]

  return (
    <Tabs
      defaultIndex={0}
      id="tabs-id"
      useHash={false}
      onChange={onChange}
      tabsData={tabsData}
    />
  )
}

export default ProfileTabs
