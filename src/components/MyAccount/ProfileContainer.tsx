import { useContext } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import FeesBanner from "./FeesBanner"
import ProfileHeader from "./ProfileHeader"
import ProfileTabs from "./ProfileTabs"

const ProfileContainer = ({ tabsPath }) => {
  const { updatedAccountData } = useContext(PatronDataContext)
  return (
    <>
      {updatedAccountData.fines?.total > 0 && <FeesBanner />}
      <ProfileHeader patron={updatedAccountData.patron} />
      <ProfileTabs activePath={tabsPath} />
    </>
  )
}

export default ProfileContainer
