import { useContext } from "react"
import { pickupLocations } from "../../../__test__/fixtures/rawSierraAccountData"
import { PatronDataContext } from "../../context/PatronDataContext"
import FeesBanner from "./FeesBanner"
import ProfileHeader from "./ProfileHeader"
import ProfileTabs from "./ProfileTabs"

const ProfileContainer = ({ tabsPath }) => {
  const { updatedAccountData } = useContext(PatronDataContext)
  console.log(updatedAccountData)
  return (
    <>
      {updatedAccountData.fines?.total > 0 && <FeesBanner />}
      <ProfileHeader patron={updatedAccountData.patron} />
      <ProfileTabs
        pickupLocations={pickupLocations}
        accountData={updatedAccountData}
        activePath={tabsPath}
      />
    </>
  )
}

export default ProfileContainer
