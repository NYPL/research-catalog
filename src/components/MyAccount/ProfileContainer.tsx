import { useContext } from "react"
import { PatronDataContext } from "../../context/PatronDataContext"
import FeesBanner from "./FeesBanner"
import ProfileHeader from "./ProfileHeader"
import ProfileTabs from "./ProfileTabs"
import UserGuideBanner from "../Banners/UserGuideBanner"
import { Box, Flex } from "@nypl/design-system-react-components"
import { FeaturePopup } from "../Banners/FeaturePopup"

const ProfileContainer = ({ tabsPath }) => {
  const { updatedAccountData } = useContext(PatronDataContext)
  return (
    <>
      <Flex gap="s" flexDir="column" mb="m">
        {updatedAccountData.fines?.total > 0 && <FeesBanner />}
        <UserGuideBanner />
      </Flex>
      <ProfileHeader patron={updatedAccountData.patron} />
      <Box position="relative" display="inline-block">
        <Box
          position="absolute"
          sx={{
            bottom: "100%",
            left: { base: "200px", md: "300px", xl: "400px" },
            zIndex: "100",
          }}
        >
          <FeaturePopup
            id="listAccountPopup"
            title="Save to lists"
            content="You can now save records to one or more lists. Lists can be found and managed in the 'Lists' tab in your patron account."
          />
        </Box>
      </Box>
      <ProfileTabs activePath={tabsPath} />
    </>
  )
}

export default ProfileContainer
