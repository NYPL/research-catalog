import { useContext } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import FeesBanner from "./FeesBanner"
import ProfileHeader from "./ProfileHeader"
import ProfileTabs from "./ProfileTabs"
import UserGuideBanner from "../Banners/UserGuideBanner"
import { Flex } from "@nypl/design-system-react-components"

const ProfileContainer = ({ tabsPath }) => {
  const { updatedAccountData } = useContext(PatronDataContext)
  return (
    <>
      <Flex gap="s" flexDir="column" mb="m">
        {updatedAccountData.fines?.total > 0 && <FeesBanner />}
        <UserGuideBanner />
      </Flex>
      <ProfileHeader patron={updatedAccountData.patron} />
      <ProfileTabs activePath={tabsPath} />
    </>
  )
}

export default ProfileContainer
